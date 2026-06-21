import React from "react";
import { db, handleFirestoreError, OperationType, auth } from "../firebase";
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Calendar, Users, Info, Clock, CheckCircle, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";
import { TIME_SLOTS, MAX_RESERVATIONS_PER_SLOT, Reservation } from "../types";

export default function ReservationSection() {
  const [selectedDate, setSelectedDate] = React.useState<string>(() => {
    // Default to tomorrow in Taipei time
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  
  const [selectedSlot, setSelectedSlot] = React.useState<string>(TIME_SLOTS[2]); // Default to 18:00
  const [guests, setGuests] = React.useState<number>(2);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");

  // Firestore availability state mapping slot to current counts
  const [slotBookingsCount, setSlotBookingsCount] = React.useState<Record<string, number>>({
    "11:30": 0,
    "13:30": 0,
    "18:00": 0,
    "20:00": 0
  });

  const [loadingAvailability, setLoadingAvailability] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [bookingSuccess, setBookingSuccess] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  const collectionPath = "reservations";

  // Check auth user state to autofill basic credentials
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setEmail(user.email || "");
        if (user.displayName) setName(user.displayName);
      } else {
        setCurrentUser(null);
      }
    });
    return unsub;
  }, []);

  // Sync real-time reservations for the currently selected date to calculate limits
  React.useEffect(() => {
    if (!selectedDate) return;
    setLoadingAvailability(true);

    const q = query(
      collection(db, collectionPath),
      where("date", "==", selectedDate)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Re-initialize counts
      const counts: Record<string, number> = {
        "11:30": 0,
        "13:30": 0,
        "18:00": 0,
        "20:00": 0
      };

      snapshot.forEach((doc) => {
        const item = doc.data();
        const slot = item.timeSlot;
        if (slot && counts[slot] !== undefined) {
          counts[slot] += 1; // Count bookings
        }
      });

      setSlotBookingsCount(counts);
      setLoadingAvailability(false);
    }, (error) => {
      setLoadingAvailability(false);
      handleFirestoreError(error, OperationType.GET, collectionPath);
    });

    return unsubscribe;
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedDate || !selectedSlot || !name || !phone || !email) {
      setErrorMsg("請完整填寫所有姓名、電話、聯絡信箱等訂位必填欄位。");
      return;
    }

    // Verify limit constraint
    const currentSlotCount = slotBookingsCount[selectedSlot] || 0;
    if (currentSlotCount >= MAX_RESERVATIONS_PER_SLOT) {
      setErrorMsg("非常抱歉，該時段的預約席位已額滿，請選擇其他預約時段或更換用餐日期。");
      return;
    }

    setSubmitting(true);

    const submissionData: Reservation = {
      name,
      phone,
      email,
      date: selectedDate,
      timeSlot: selectedSlot,
      guests,
      notes,
      userId: currentUser?.uid || null,
    };

    try {
      await addDoc(collection(db, collectionPath), {
        ...submissionData,
        createdAt: serverTimestamp()
      });

      setBookingSuccess(true);
      // Clean inputs except personal details for smoother multi-bookings
      setNotes("");
    } catch (error) {
      console.error(error);
      setErrorMsg("預約失敗，請向系統管理員聯絡或稍後再試。");
      handleFirestoreError(error, OperationType.WRITE, collectionPath);
    } finally {
      setSubmitting(false);
    }
  };

  const resetBookingForm = () => {
    setBookingSuccess(false);
  };

  // Restrict calendar selection starting from Taipei tomorrow up to 2 months
  const getMinDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDateString = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <section id="reservation" className="py-24 sm:py-32 bg-[#fafaf6] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-[#5A5A40] font-bold mb-3">ONLINE RESERVATION</p>
          <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-[0.2em] text-[#1a1a1a]">
            皇家席位 ‧ <span className="text-[#5A5A40] font-normal italic">尊爵預約</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm tracking-wide mt-4 max-w-xl mx-auto">
            一桌一會，靜謐雅致。每日各時段限制最優待的預約接待限額，保留尊絕體驗。
          </p>
          <div className="h-[2px] w-16 bg-[#5A5A40] mx-auto mt-6" />
        </div>

        {bookingSuccess ? (
          /* Booking Success Screen overlay */
          <div className="bg-white border border-[#5A5A40]/30 p-10 text-center rounded-md max-w-2xl mx-auto animate-zoomIn shadow-md">
            <CheckCircle className="w-16 h-16 text-[#5A5A40] mx-auto mb-6" />
            <h3 className="font-serif text-2xl text-[#1a1a1a] tracking-wider mb-3">貴賓席位確認！</h3>
            <p className="text-gray-700 font-serif text-sm px-4 leading-relaxed mb-8">
              親愛的 <span className="text-[#5A5A40] font-bold">{name}</span> 貴賓，感謝您的預約。我們已為您保留 
              <span className="text-[#5A5A40] font-bold"> {selectedDate} / {selectedSlot} ({guests} 位) </span>的專屬席位。<br />
              一桌一會 한담 誠摯期待您的到來。稍後系統將寄送預約編號與貴賓指南至您的聯絡信箱：<b>{email}</b>。
            </p>
            <div className="bg-[#f5f5f0] p-4 rounded border border-[#1a1a1a0f] text-xs text-gray-500 font-mono mb-8 max-w-md mx-auto">
              預約成功 ‧ 資料已同步寫入雲端 Firestore 庫
            </div>
            <button
              onClick={resetBookingForm}
              className="px-8 py-3 bg-[#5A5A40] text-white hover:bg-[#494933] font-bold text-xs tracking-widest rounded transition-colors cursor-pointer"
            >
              點此建立另一筆預約
            </button>
          </div>
        ) : (
          /* Dual column booking frame */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Date selection and session remaining availability */}
            <div className="md:col-span-5 bg-white border border-[#1a1a1a11] rounded shadow-sm p-6 sm:p-8 space-y-6">
              
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-[#5A5A40] font-bold mb-3">
                  步驟 1. 選擇用餐日期 (Calendar)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 pointer-events-none" />
                  <input
                    type="date"
                    value={selectedDate}
                    min={getMinDateString()}
                    max={getMaxDateString()}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setErrorMsg(null);
                    }}
                    className="w-full bg-[#f5f5f0] border border-[#1a1a1a1a] focus:border-[#5A5A40] rounded text-[#1a1a1a] text-sm pl-12 pr-4 py-3 outline-none"
                    required
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                  * 僅開放明起 60 天內之席位預訂
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-[#5A5A40] font-bold mb-3">
                  步驟 2. 選擇用餐時段 
                </label>
                
                {/* Available Sessions grid with Real-time Count limits */}
                <div className="grid grid-cols-1 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const bookings = slotBookingsCount[slot] || 0;
                    const spotsRemaining = Math.max(0, MAX_RESERVATIONS_PER_SLOT - bookings);
                    const isFull = spotsRemaining <= 0;
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => !isFull && setSelectedSlot(slot)}
                        disabled={isFull}
                        className={`w-full flex items-center justify-between p-4 border rounded text-left transition-all ${
                          isFull 
                            ? "bg-stone-50 border-stone-100 text-[#1a1a1a]/30 cursor-not-allowed"
                            : isSelected
                            ? "bg-[#5A5A40]/10 border-[#5A5A40] text-[#5A5A40] glow-gold font-bold"
                            : "bg-white border-[#1a1a1a11] hover:border-[#5A5A40]/50 text-[#1a1a1a]"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className={`w-4 h-4 ${isSelected ? "text-[#5A5A40]" : "text-stone-400"}`} />
                          <span className="font-serif text-sm tracking-widest font-semibold">{slot}</span>
                        </div>
                        
                        {/* Interactive Availability Indicator */}
                        <div className="text-right">
                          {loadingAvailability ? (
                            <span className="text-[10px] text-gray-400 italic block font-mono">同步中...</span>
                          ) : isFull ? (
                            <span className="text-xs bg-stone-100 border border-stone-200 text-stone-400 px-2 py-0.5 rounded-full font-serif">已席滿</span>
                          ) : (
                            <span className={`text-[10px] sm:text-xs font-serif ${spotsRemaining <= 2 ? 'text-amber-700 font-bold' : 'text-gray-500'}`}>
                              剩餘 {spotsRemaining} 組奢華席位
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Contact forms and requirements fields */}
            <div className="md:col-span-7 bg-white border border-[#1a1a1a11] rounded shadow-sm p-6 sm:p-8 space-y-6">
              
              <p className="text-xs uppercase tracking-[0.25em] text-[#5A5A40] font-bold border-b border-[#1a1a1a0f] pb-3">
                步驟 3. 填寫聯絡貴賓資料
              </p>

              {currentUser && (
                <div className="p-3 bg-[#5A5A40]/10 border border-[#5A5A40]/25 text-[#5A5A40] text-xs rounded-sm mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-serif font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    已連動會所帳號，訂位將記錄在您的專屬檔案中
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-[#5A5A40]/60">VIP GOLD</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 flex items-center gap-2.5 text-xs rounded mb-4">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Guest Count */}
                <div className="sm:col-span-2">
                  <label htmlFor="bookingGuests" className="block text-[11px] tracking-wider text-gray-500 uppercase font-serif mb-2 font-semibold">
                    用餐貴賓人數
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <select
                      id="bookingGuests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#f5f5f0] border border-[#1a1a1a1a] text-[#1a1a1a] text-xs sm:text-sm pl-10 pr-4 py-2.5 outline-none rounded cursor-pointer focus:border-[#5A5A40] transition-colors font-medium"
                    >
                      <option value={1}>1 尊位</option>
                      <option value={2}>2 爵位 (推薦一桌會談)</option>
                      <option value={3}>3 尊位</option>
                      <option value={4}>4 客位 (雅間標準)</option>
                      <option value={5}>5 客位</option>
                      <option value={6}>6 極致包廂尊宴 (需來電溝通)</option>
                    </select>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="bookingName" className="block text-[11px] tracking-wider text-gray-500 uppercase font-serif mb-2 font-semibold">
                    貴賓姓名 (必填)
                  </label>
                  <input
                    id="bookingName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例如：王小明"
                    className="w-full bg-[#f5f5f0] border border-[#1a1a1a1a] rounded text-[#1a1a1a] text-sm px-4 py-2.5 outline-none focus:border-[#5A5A40] transition-colors font-medium"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="bookingPhone" className="block text-[11px] tracking-wider text-gray-500 uppercase font-serif mb-2 font-semibold">
                    聯絡手提電話 (必填)
                  </label>
                  <input
                    id="bookingPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="例如：0912345678"
                    className="w-full bg-[#f5f5f0] border border-[#1a1a1a1a] rounded text-[#1a1a1a] text-sm px-4 py-2.5 outline-none focus:border-[#5A5A40] transition-colors font-medium"
                    required
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label htmlFor="bookingEmail" className="block text-[11px] tracking-wider text-gray-500 uppercase font-serif mb-2 font-semibold">
                    電子郵件信箱 (接預約通知及連動用)
                  </label>
                  <input
                    id="bookingEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="例如：guest@example.com"
                    className="w-full bg-[#f5f5f0] border border-[#1a1a1a1a] rounded text-[#1a1a1a] text-sm px-4 py-2.5 outline-none focus:border-[#5A5A40] transition-colors font-medium"
                    required
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor="bookingNotes" className="block text-[11px] tracking-wider text-gray-500 uppercase font-serif mb-2 font-semibold">
                    特殊飲食禁忌、紀念餐飲等特別備註
                  </label>
                  <textarea
                    id="bookingNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="請告知是否有對任何海鮮、芝麻、松子過敏，或本次為結婚紀念日、生日壽宴等..."
                    rows={3}
                    className="w-full bg-[#f5f5f0] border border-[#1a1a1a1a] rounded text-[#1a1a1a] text-sm px-4 py-2.5 outline-none focus:border-[#5A5A40] transition-colors resize-none font-medium"
                  />
                </div>

              </div>

              {/* Submit CTA button block */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || loadingAvailability}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#5A5A40] hover:bg-[#494933] text-white font-bold rounded text-xs tracking-[0.3em] uppercase transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <span>呈交預約席位 ‧ 한담 待候</span>
                  )}
                </button>
              </div>

              <div className="flex gap-2 items-start mt-4 bg-[#f5f5f0]/55 p-4 rounded border border-[#1a1a1a08]">
                <Info className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 leading-normal">
                  <b>【預約須知】</b><br />
                  本會所設有低消限制 (NT$ 1,500/人)，最低用餐年齡為 12 歲。預約送出成功後，系統將直接在您的 Firestore 中建立預定，若需取消或更改時段請提前 3 天透過電子郵件或來電與客服取得連繫。
                </p>
              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  );
}

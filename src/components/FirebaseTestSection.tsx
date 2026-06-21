import React from "react";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { Database, Send, RotateCcw, CheckCircle, Table, RefreshCw } from "lucide-react";

interface SavedMessage {
  id: string;
  message: string;
  createdAt?: any;
}

export default function FirebaseTestSection() {
  const [inputText, setInputText] = React.useState("");
  const [messages, setMessages] = React.useState<SavedMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);

  const collectionPath = "test_messages";

  // Real-time synchronization to verify reading works perfectly!
  React.useEffect(() => {
    setLoading(true);
    const q = query(collection(db, collectionPath), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: SavedMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          message: data.message || "",
          createdAt: data.createdAt
        });
      });
      setMessages(items);
      setLoading(false);
    }, (error) => {
      setLoading(false);
      handleFirestoreError(error, OperationType.GET, collectionPath);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setStatusMsg({ type: 'error', text: '請輸入內容再送出。' });
      return;
    }

    setSubmitting(true);
    setStatusMsg(null);

    try {
      // Add data to Firestore collection
      await addDoc(collection(db, collectionPath), {
        message: inputText,
        createdAt: serverTimestamp()
      });

      setStatusMsg({ type: 'success', text: '資料已成功儲存至 Firestore！' });
      setInputText(""); // Clear text
    } catch (error) {
      console.error(error);
      setStatusMsg({ type: 'error', text: '儲存失敗，請檢查規則或主控台配置。' });
      // Throw formatted error to satisfy system standard requirements
      handleFirestoreError(error, OperationType.WRITE, collectionPath);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setStatusMsg(null);
  };

  return (
    <section id="firebase-test" className="py-24 sm:py-32 bg-stone-950 text-stone-100 border-t border-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title describing Firestore Test Page */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-400/10 border border-gold-300/30 text-gold-300 text-xs font-mono uppercase rounded-full mb-4">
            <Database className="w-3.5 h-3.5" />
            <span>Firestore 實時寫入與讀取測試網頁</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-stone-100">
            顧客心聲 ‧ <span className="text-gradient-gold font-normal">許願留言板</span>
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            此頁面已連接您的 Firestore 資料庫 (<span className="text-gold-200">homework-5b2a7</span>)。請在下方文字欄位中輸入內容並點擊「送出」，資料便會儲存至雲端，並在底部即時同步顯示。
          </p>
        </div>

        {/* Test UI Form Grid container */}
        <div className="bg-stone-900/40 border border-stone-800/80 p-8 sm:p-10 rounded-sm">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="testMessageInput" className="block text-xs uppercase tracking-[0.25em] text-gold-300 font-serif font-semibold mb-3">
                請輸入欲儲存至 Firestore 的文字內容
              </label>
              
              {/* Request Field: Input Text Field */}
              <textarea
                id="testMessageInput"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="在此輸入您對一桌一會 한담 的期許或任何測試字詞..."
                rows={4}
                className="w-full bg-stone-950 border border-stone-800 focus:border-gold-300 focus:ring-1 focus:ring-gold-300 rounded-sm text-stone-100 text-sm px-4 py-3 placeholder-stone-600 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Action buttons with high responsiveness */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              
              {/* Send Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-stone-950 font-semibold rounded-sm text-xs tracking-widest uppercase transition-all shadow-md hover:shadow-gold-400/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>送出資料至 Firestore</span>
              </button>

              {/* Clear/Reset Button */}
              <button
                type="button"
                onClick={handleClear}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-stone-800 hover:border-stone-600 hover:bg-stone-900/50 text-stone-300 rounded-sm text-xs tracking-widest uppercase transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>清除重填</span>
              </button>
            </div>
          </form>

          {/* Success / Error notification */}
          {statusMsg && (
            <div className={`mt-6 p-4 rounded-sm flex items-center gap-3 text-xs tracking-wider border ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
                : 'bg-red-950/20 border-red-500/30 text-red-300'
            }`}>
              {statusMsg.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Real-time sync feedback list */}
          <div className="mt-12 pt-8 border-t border-stone-800/60">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-sm tracking-wider text-gold-300 flex items-center gap-2">
                <Table className="w-4 h-4 text-gold-400" />
                <span>雲端資料庫即時同步項目 (Collection: test_messages)</span>
              </h3>
              {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-stone-500" />}
            </div>

            {loading && messages.length === 0 ? (
              <p className="text-xs text-stone-500 font-serif leading-relaxed text-center py-6">正在自 Firestore 同步雲端資料...</p>
            ) : messages.length === 0 ? (
              <p className="text-xs text-stone-500 font-serif leading-relaxed text-center py-6 border border-dashed border-stone-800/40 rounded bg-stone-950/30">
                目前尚無留言資料。請在上方輸入您對餐廳的願望，點擊送出即可同步寫入。
              </p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-stone-950 p-4 border border-stone-900 rounded-sm hover:border-gold-300/10 transition-colors">
                    <p className="text-sm text-stone-200 font-serif break-words select-all">{msg.message}</p>
                    <div className="flex justify-between items-center mt-2.5 text-[10px] text-stone-500 font-mono">
                      <span>DOC ID: {msg.id}</span>
                      <span>
                        {msg.createdAt 
                          ? new Date(msg.createdAt.seconds * 1000).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }) 
                          : "剛剛"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface MemberAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAuth({ isOpen, onClose }: MemberAuthProps) {
  const [isRegister, setIsRegister] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setEmail("");
      setPassword("");
      setFullName("");
    }
  }, [isOpen, isRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg("請完整填寫電子信箱與密碼。");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("為了安全，密碼必須至少為 6 個字元。");
      return;
    }

    setSubmitting(true);

    try {
      if (isRegister) {
        // Create user in firebase
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMsg("尊貴會員註冊成功！系統已自動為您登入。");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        // Sign in user
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg("歡迎重返一桌一會 한담，登入成功！");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      let translatedErr = "認證失敗，請再試一次。";
      if (err.code === "auth/email-already-in-use") {
        translatedErr = "此電子信箱已被註冊為會員，請直接登入。";
      } else if (err.code === "auth/invalid-email") {
        translatedErr = "請填寫正確格式的電子信箱。";
      } else if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
        translatedErr = "電子信箱或密碼錯誤，請重新確認。";
      } else if (err.code === "auth/weak-password") {
        translatedErr = "密碼強度不足，請設定更複雜的密碼。";
      }
      setErrorMsg(translatedErr);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-sm shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
          >
            {/* Visual Gold Deco Top edge */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />

            {/* Close trigger button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:text-gold-300 text-stone-500 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Logos & Signposts */}
            <div className="text-center mb-8">
              <span className="font-serif tracking-[0.25em] text-gradient-gold text-2xl font-bold">한담</span>
              <h3 className="font-serif text-lg tracking-wider text-stone-100 mt-2 font-light">
                {isRegister ? "註冊席位 ‧ 探索尊爵禮遇" : "會員登入 ‧ 重拾極緻旬味"}
              </h3>
              <p className="text-stone-500 text-[10px] tracking-widest font-mono uppercase mt-1">
                HANDAM EXQUISITE CLUB MEMBER
              </p>
            </div>

            {/* Error notifications */}
            {errorMsg && (
              <div className="mb-6 p-3 bg-red-950/20 border border-red-500/20 text-red-400 flex items-center gap-2.5 text-xs rounded-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success notifications */}
            {successMsg && (
              <div className="mb-6 p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 flex items-center gap-2.5 text-xs rounded-sm">
                <Sparkles className="w-4 h-4 shrink-0 text-gold-300" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {isRegister && (
                <div>
                  <label className="block text-[11px] tracking-widest text-stone-400 uppercase font-serif mb-2 font-semibold">
                    真實姓名
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="例如：王小明"
                      className="w-full bg-stone-950 border border-stone-850/80 focus:border-gold-300 focus:ring-1 focus:ring-gold-300 rounded-sm text-stone-100 text-sm pl-10 pr-4 py-2.5 placeholder-stone-700 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] tracking-widest text-stone-400 uppercase font-serif mb-2 font-semibold">
                  電子信箱 (Email)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="member@example.com"
                    className="w-full bg-stone-950 border border-stone-850/80 focus:border-gold-300 focus:ring-1 focus:ring-gold-300 rounded-sm text-stone-100 text-sm pl-10 pr-4 py-2.5 placeholder-stone-700 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-widest text-stone-400 uppercase font-serif mb-2 font-semibold">
                  會員登入密碼 (至少 6 碼)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="請輸入 6 位以上密碼"
                    className="w-full bg-stone-950 border border-stone-850/80 focus:border-gold-300 focus:ring-1 focus:ring-gold-300 rounded-sm text-stone-100 text-sm pl-10 pr-4 py-2.5 placeholder-stone-700 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-stone-950 font-bold rounded-sm text-xs tracking-[0.25em] uppercase transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  ) : (
                    <span>儲存並進入一桌一會</span>
                  )}
                </button>
              </div>
            </form>

            {/* Toggle switch between log/reg formats */}
            <div className="mt-6 text-center text-xs text-stone-500 border-t border-stone-800/60 pt-4">
              <span>
                {isRegister ? "已經是一桌一會會員？" : "還不是一桌一會的貴賓成員？"}
              </span>
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="ml-1.5 text-gold-300 hover:text-gold-200 transition-colors font-semibold underline cursor-pointer"
              >
                {isRegister ? "點此登入尊爵會所" : "點此註冊專屬會員"}
              </button>
            </div>

            {/* Note stating rules are open */}
            <p className="text-[10px] text-stone-600 font-serif leading-relaxed text-center mt-6">
              * 註冊帳號後，您即可將線上皇家訂位與您的實時信箱帳號進行綁定，方便隨時查詢。
            </p>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

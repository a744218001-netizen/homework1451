import React from "react";
import { User, LogOut, Loader2, Menu, X, Database } from "lucide-react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenTestSection: () => void;
}

export default function Navbar({ onOpenAuth, onOpenTestSection }: NavbarProps) {
  const [currentUser, setCurrentUser] = React.useState<FirebaseUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f5f5f0]/80 backdrop-blur-md border-b border-[#1a1a1a1a] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
            <span className="text-xl sm:text-2xl font-serif tracking-[0.25em] text-[#1a1a1a] font-bold">한담</span>
            <span className="ml-2 font-serif text-sm tracking-[0.1em] text-[#5A5A40] border-l border-[#1a1a1a22] pl-2">HANDAM</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-sans text-[#1a1a1a]">
            <button onClick={() => scrollToSection("about")} className="hover:text-[#5A5A40] transition-colors cursor-pointer font-medium">品牌理念</button>
            <button onClick={() => scrollToSection("menu")} className="hover:text-[#5A5A40] transition-colors cursor-pointer font-medium">臻選菜單</button>
            <button onClick={() => scrollToSection("reservation")} className="hover:text-[#5A5A40] transition-colors cursor-pointer font-medium">皇家席位</button>
            <button 
              onClick={onOpenTestSection} 
              className="flex items-center gap-1.5 px-3 py-1 bg-[#5A5A40]/10 border border-[#5A5A40]/30 text-[#5A5A40] hover:bg-[#5A5A40]/20 rounded-full transition-all cursor-pointer text-xs font-semibold"
            >
              <Database className="w-3.5 h-3.5" />
              Firestore 測試專區
            </button>
          </div>

          {/* Authentication Status */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#5A5A40]" />
            ) : currentUser ? (
              <div className="flex items-center space-x-3 bg-white/60 border border-[#1a1a1a11] px-3 py-1.5 rounded-full">
                <div className="w-7 h-7 rounded-full bg-[#5A5A40]/20 border border-[#5A5A40]/30 flex items-center justify-center text-xs font-bold text-[#5A5A40]">
                  {currentUser.email ? currentUser.email[0].toUpperCase() : <User className="w-3 h-3" />}
                </div>
                <div className="text-xs text-[#1a1a1a] max-w-[120px] truncate">
                  {currentUser.email || "尊貴會員"}
                </div>
                <button
                  onClick={handleLogout}
                  title="登出系統"
                  className="p-1 hover:text-red-600 text-stone-500 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-5 py-2 border border-[#5A5A40] rounded-sm text-xs tracking-widest uppercase hover:bg-[#5A5A40] hover:text-white transition-all duration-300 text-[#5A5A40] font-semibold cursor-pointer"
              >
                <User className="w-4 h-4" />
                會員登入 / 註冊
              </button>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center space-x-3">
            <button 
              onClick={onOpenTestSection} 
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-[#5A5A40]/30 text-[#5A5A40] hover:bg-[#5A5A40]/10 rounded-full text-[10px] uppercase cursor-pointer"
            >
              <Database className="w-3 h-3" />
              測試
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[#1a1a1a] hover:text-[#5A5A40] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f5f5f0] border-b border-[#1a1a1a11] px-4 py-6 space-y-4 animate-fadeIn">
          <button onClick={() => scrollToSection("about")} className="block w-full text-left py-2 text-[#1a1a1a] hover:text-[#5A5A40] text-sm tracking-wider">品牌理念</button>
          <button onClick={() => scrollToSection("menu")} className="block w-full text-left py-2 text-[#1a1a1a] hover:text-[#5A5A40] text-sm tracking-wider">臻選菜單</button>
          <button onClick={() => scrollToSection("reservation")} className="block w-full text-left py-2 text-[#1a1a1a] hover:text-[#5A5A40] text-sm tracking-wider">皇家席位</button>
          
          <div className="pt-4 border-t border-[#1a1a1a11] flex flex-col gap-3">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto text-[#5A5A40]" />
            ) : currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-md border border-[#1a1a1a0a]">
                  <div className="w-7 h-7 rounded-full bg-[#5A5A40]/20 border border-[#5A5A40]/30 flex items-center justify-center text-xs font-bold text-[#5A5A40]">
                    {currentUser.email ? currentUser.email[0].toUpperCase() : "M"}
                  </div>
                  <span className="text-xs text-[#1a1a1a] truncate font-medium">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-stone-100 hover:bg-red-50 border border-[#1a1a1a0f] text-[#1a1a1a] hover:text-red-600 text-xs rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  登出尊貴會員
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#5A5A40] rounded text-xs tracking-widest text-[#5A5A40] font-semibold hover:bg-[#5A5A40] hover:text-white transition-all duration-300"
              >
                <User className="w-4 h-4" />
                會員登入 / 註冊
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

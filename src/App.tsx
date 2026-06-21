import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuShowcase from "./components/MenuShowcase";
import ReservationSection from "./components/ReservationSection";
import FirebaseTestSection from "./components/FirebaseTestSection";
import MemberAuth from "./components/MemberAuth";
import Footer from "./components/Footer";
import { Sparkles, ArrowUp, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Monitor screen positions for Back to Top or indicators
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenAuth = () => {
    setIsAuthOpen(true);
  };

  const handleOpenTestSection = () => {
    const el = document.getElementById("firebase-test");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-stone-950 text-stone-100 font-sans min-h-screen selection:bg-gold-400 selection:text-stone-900 overflow-x-hidden antialiased">
      
      {/* Elegantly styled Nav Bar */}
      <Navbar onOpenAuth={handleOpenAuth} onOpenTestSection={handleOpenTestSection} />

      {/* Main Sections Stack */}
      <main className="relative">
        
        {/* Hero Banner Area */}
        <Hero />

        {/* Dynamic Warm Ambient Light Separator */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent z-10" />

        {/* Brand Concept & Team Presentation */}
        <About />

        {/* Translucent Horizontal Separator */}
        <div className="h-[1px] bg-stone-900 w-[80%] mx-auto" />

        {/* Interlocking Dish Menus Showcase */}
        <MenuShowcase />

        {/* Interactive Multi-Session Slots Reservation Board */}
        <ReservationSection />

        {/* Standalone Firestore Database Input-Output Chinese Testing Panel */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-gold-300/20 to-transparent z-10" />
        <FirebaseTestSection />

      </main>

      {/* Footer Details with Google Map integration */}
      <Footer />

      {/* Dynamic Pop-up Authentication Portal */}
      <MemberAuth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Interactive Helper Utilities */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
          >
            {/* Quick jump to firestore test */}
            <button
              onClick={handleOpenTestSection}
              title="前往 Firestore 測試"
              className="p-3 bg-stone-900 hover:bg-gold-500 border border-gold-300/30 text-gold-300 hover:text-stone-950 rounded-full shadow-2xl transition-all duration-300 text-xs font-semibold cursor-pointer"
            >
              <Database className="w-4 h-4" />
            </button>

            {/* Scroll back to top */}
            <button
              onClick={scrollToTop}
              title="回到頁首"
              className="p-3 bg-stone-900 hover:bg-gold-500 border border-stone-800 hover:border-gold-400 text-stone-200 hover:text-stone-950 rounded-full shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

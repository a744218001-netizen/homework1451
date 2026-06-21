import React from "react";
import { motion } from "motion/react";
import { ChevronDown, Calendar } from "lucide-react";

export default function Hero() {
  const handleScrollToBooking = () => {
    const el = document.getElementById("reservation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f5f5f0]">
      {/* Immersive Atmospheric Backdrop with motion slow-zoom */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("/src/assets/images/hero_dining_room_1782056790965.jpg")`,
        }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />

      {/* Luxury Radial/Vignette Overlay for Warm lighting atmosphere - transitions down to warm page-bg */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#f5f5f0] via-black/40 to-black/85" />

      {/* Decorative vertical lines representing hanok minimalist screens */}
      <div className="absolute inset-y-0 left-10 w-[1px] bg-[#1a1a1a]/10 z-10 hidden lg:block" />
      <div className="absolute inset-y-0 right-10 w-[1px] bg-[#1a1a1a]/10 z-10 hidden lg:block" />

      {/* Content wrapper */}
      <div className="relative z-20 text-center max-w-4xl px-4 mx-auto flex flex-col items-center">
        {/* Subtle top sub-header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex items-center space-x-2 mb-6"
        >
          <span className="h-[1px] w-8 bg-[#5A5A40]" />
          <p className="text-xs sm:text-sm tracking-[0.4em] text-[#cbd1b6] uppercase font-serif">KOREAN CLASSIC FINE DINING</p>
          <span className="h-[1px] w-8 bg-[#5A5A40]" />
        </motion.div>

        {/* Brand Slogans and Slogan Typography */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.2em] font-light text-white mb-8 leading-tight"
        >
          靜謐中的 <span className="text-[#cbd1b6] font-normal italic">韓式至臻</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-sm sm:text-lg tracking-[0.25em] text-[#f5f5f0] font-serif max-w-2xl mb-12 leading-relaxed"
        >
          「 한담 — 琴瑟之和，安然閒談 」<br />
          融合宮廷禮學與現代烹調，於靜謐庭院中呈獻四季極致旬味。
        </motion.p>

        {/* Booking Trigger Button styled elegantly */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={handleScrollToBooking}
            className="group relative flex items-center space-x-3 px-8 py-4 bg-[#5A5A40] border border-[#5A5A40] hover:border-[#494933] text-white hover:bg-[#494933] rounded-sm text-xs tracking-[0.3em] font-medium uppercase overflow-hidden transition-all duration-300 shadow-lg cursor-pointer"
          >
            <Calendar className="w-4 h-4 z-10" />
            <span className="relative z-10 font-serif">立即預約訂位</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Warm Spot light element in the bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#5A5A40]/10 blur-[80px] rounded-full z-10" />

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.p 
          className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/60 uppercase font-sans mb-1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          滾動探索
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#5A5A40]" />
        </motion.div>
      </div>
    </section>
  );
}

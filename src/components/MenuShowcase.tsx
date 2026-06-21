import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MENU_ITEMS } from "../data";
import { MenuCategory, MenuItem } from "../types";
import { Sparkles } from "lucide-react";

export default function MenuShowcase() {
  const [activeCategory, setActiveCategory] = React.useState<MenuCategory>("appetizers");

  const categoriesObj = [
    { key: "appetizers" as const, label: "御品前菜" },
    { key: "mains" as const, label: "旬味主餐" },
    { key: "desserts" as const, label: "手作甜點" },
    { key: "drinks" as const, label: "宮廷佳釀" }
  ];

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#f5f5f0] relative border-y border-[#1a1a1a11]">
      
      {/* Background graphic elements */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-[#5A5A40]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#5A5A40]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-[#5A5A40] font-bold mb-3">GASTRONOMY MENU</p>
          <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-[0.2em] text-[#1a1a1a]">
            皇家 <span className="text-[#5A5A40] font-normal italic">臻選菜單</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm tracking-[0.15em] font-serif mt-4 max-w-xl mx-auto">
            體驗流淌在二十四節氣脈絡中的韓式宮廷極致筵席。
          </p>
          <div className="h-[2px] w-12 bg-[#5A5A40] mx-auto mt-6" />
        </div>

        {/* Tab Selectors mapped beautifully */}
        <div className="flex justify-center border-b border-[#1a1a1a1a] mb-12 sm:mb-16">
          <div className="flex space-x-2 sm:space-x-8">
            {categoriesObj.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative py-4 px-3 sm:px-6 font-serif text-sm sm:text-base tracking-widest transition-colors cursor-pointer font-medium ${
                    isActive ? "text-[#5A5A40] font-bold" : "text-gray-500 hover:text-[#1a1a1a]"
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5A5A40] to-[#494933]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Grid with animated entrance */}
        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {MENU_ITEMS[activeCategory].map((item: MenuItem, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group bg-white border border-[#1a1a1a0f] rounded shadow-sm overflow-hidden p-4 hover:border-[#5A5A40]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image with hover expansion */}
                    <div className="relative aspect-square overflow-hidden mb-6 bg-stone-100 rounded">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                        referrerPolicy="no-referrer"
                      />
                      {item.isPopular && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#5A5A40] text-white text-[10px] tracking-wider font-sans uppercase px-2.5 py-1 rounded shadow-sm">
                          <Sparkles className="w-3 h-3 text-white fill-white" />
                          <span>主廚推介</span>
                        </div>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="font-serif text-lg tracking-wider text-[#1a1a1a] font-semibold group-hover:text-[#5A5A40] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-[#5A5A40] text-base tracking-wider font-bold whitespace-nowrap">
                        NT$ {item.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative subtle action button to elevate UX */}
                  <div className="pt-4 border-t border-[#1a1a1a0a] flex items-center justify-between text-[11px] text-gray-400 uppercase tracking-widest font-mono">
                    <span>高級韓式手作旬食</span>
                    <span className="h-[2px] w-8 bg-stone-100 group-hover:bg-[#5A5A40]/40 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic visual box summing up fine dining menu concept */}
        <div className="mt-16 bg-[#fafaf6] border border-[#1a1a1a0f] p-6 sm:p-8 rounded shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-[#5A5A40] text-base tracking-wider font-semibold">備註與配酒諮詢</h4>
            <p className="text-gray-500 text-xs leading-relaxed max-w-lg">
              以上皆為極致單點菜品。現場亦提供「宮廷大膳套餐」 (NT$ 3,880/人) 與「四季探索套餐」 (NT$ 4,880/人)，本餐廳侍酒師可為您客製化搭配傳統野生覆盆子酒或人蔘極膳酒。
            </p>
          </div>
          <button 
            onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 border border-[#5A5A40] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-all duration-300 rounded text-xs tracking-widest font-serif whitespace-nowrap cursor-pointer"
          >
            享用皇家筵席 ‧ 立即訂位
          </button>
        </div>

      </div>
    </section>
  );
}

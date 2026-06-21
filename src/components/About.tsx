import React from "react";
import { motion } from "motion/react";
import { Sparkles, Award, Heart } from "lucide-react";

export default function About() {
  const philosophies = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#5A5A40]" />,
      title: "四時旬味",
      description: "秉持儒家時序之禮，僅選取二十四節氣當季最豐盈、品質卓越的在地與濟州島空運食材。"
    },
    {
      icon: <Award className="w-5 h-5 text-[#5A5A40]" />,
      title: "宮廷古法",
      description: "傳承李氏朝鮮八道宮廷菜譜，經歷慢火細熬、陶罐瓮釀，重現尊貴的宮廷皇家風味。"
    },
    {
      icon: <Heart className="w-5 h-5 text-[#5A5A40]" />,
      title: "至誠款待",
      description: "一席餐、一席談。我們提供極度隱密且體貼入微的桌邊管家式服務，彰顯頂級尊榮。"
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#fafaf6] text-[#1a1a1a] relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#5A5A40]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#5A5A40]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.4em] text-[#5A5A40] font-bold mb-3">BRAND STORY & 理念</p>
          <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-[0.15em] text-[#1a1a1a]">
            琴瑟之和，安然 <span className="text-[#5A5A40] italic font-normal">閒談</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#5A5A40] mt-6 hidden md:block" />
        </div>

        {/* Brand Story + Chef Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Brand Story Text Card */}
          <div className="md:col-span-7 space-y-8">
            <div className="bg-white border border-[#1a1a1a11] p-8 sm:p-10 rounded shadow-sm hover:border-[#5A5A40]/30 transition-all duration-300">
              <h3 className="text-xl font-serif text-[#5A5A40] mb-6 tracking-wider font-semibold">한담 的由來</h3>
              <p className="text-[#3b3b33] leading-relaxed font-serif text-base mb-4">
                「HanDam 한담」意指安然舒適地坐在一起，進行深度且溫暖的對話。
                在快節奏的當代生活裡，我們期盼在這個以古典韓屋（Hanok）
                美學打造的私密空間，用至臻美味牽引您與珍視之人的美好時光。
              </p>
              <p className="text-[#3b3b33] leading-relaxed font-serif text-base">
                我們摒棄一切譁眾取寵的調味，由主廚手工釀造泡菜與醬料，並選用專屬特製陶罐發酵，
                將大自然的時間魔法完美封入每一道精緻餐點。
              </p>
            </div>

            {/* Philosophy Bento Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {philosophies.map((philo, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-[#1a1a1a0d] p-6 rounded shadow-sm hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="mb-4 p-2 bg-[#5A5A40]/10 w-fit rounded-full group-hover:bg-[#5A5A40]/25 transition-colors">
                    {philo.icon}
                  </div>
                  <h4 className="font-serif text-[#1a1a1a] text-sm tracking-wide font-semibold mb-2">{philo.title}</h4>
                  <p className="text-xs text-[#52524a] leading-relaxed">{philo.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Master Chef Presentation Card */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group p-4 bg-white border border-[#1a1a1a11] rounded shadow-md overflow-hidden w-full max-w-sm">
              
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] overflow-hidden rounded bg-stone-100">
                <img 
                  src="/src/assets/images/chef_portrait_1782056809131.jpg" 
                  alt="韓式星級料理總監 Chef Kim Ji-hoon" 
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay gradient in bottom corner */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/95 to-transparent p-6 flex flex-col justify-end" />
              </div>

              {/* Chef credentials */}
              <div className="mt-6 text-center">
                <p className="text-xs tracking-widest text-[#5A5A40] font-sans font-semibold mb-1">EXECUTIVE CHEF & DIRECTOR</p>
                <h4 className="font-serif text-lg tracking-wider text-[#1a1a1a] font-bold">金智勛 Chef Kim Ji-hoon</h4>
                <div className="w-10 h-[1px] bg-[#5A5A40]/40 mx-auto my-3" />
                <p className="text-xs text-[#52524a] italic leading-relaxed px-4">
                  「料理是時間與誠意的藝術，每一道宮廷菜餚都是對歷史與季節的一首頌歌。」
                </p>
                <p className="text-[10px] text-gray-500 mt-3 font-semibold tracking-wider">
                  前首爾米其林三星韓食餐廳【羅宴】研發副總監
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

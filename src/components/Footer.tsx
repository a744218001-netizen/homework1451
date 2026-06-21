import React from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Compass } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 border-t border-stone-900 pt-20 pb-8 text-stone-400 relative overflow-hidden">
      
      {/* Decorative vertical lines */}
      <div className="absolute right-12 top-0 h-40 w-px bg-stone-900" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Column 1: Brand Info & Social Hooks */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-2xl font-serif tracking-[0.25em] text-gradient-gold font-bold">한담</span>
              <p className="text-xs uppercase tracking-[0.15em] text-stone-500 font-serif mt-1">HANDAM KOREAN FINE DINING</p>
            </div>
            
            <p className="text-xs sm:text-sm font-serif leading-relaxed text-stone-500 max-w-sm">
              在靜謐的古雅空間中，我們透過食物譜寫四季的流轉。一桌一會，與尊貴的您進行一場優雅從容的韓食談話。
            </p>

            <div className="flex space-x-4 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="追蹤一桌一會 Instagram"
                className="p-2.5 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 rounded-full text-stone-300 transition-all duration-300 cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="造訪一桌一會 Facebook 專頁"
                className="p-2.5 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 rounded-full text-stone-300 transition-all duration-300 cursor-pointer"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Hour of operation & contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-serif text-sm tracking-[0.2em] text-gold-300 font-semibold uppercase border-b border-stone-900 pb-2">
              會所聯絡與時段 (HOURS & SERVICES)
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm font-serif text-stone-400">
              
              {/* Address */}
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-gold-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">皇家會所地址</p>
                  <p className="leading-relaxed mt-1 text-stone-400">台北市大安區光復南路280巷40號 (捷運國父紀念館站 2 號出口旁 / 備尊榮泊車服務)</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-gold-300 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-200">尊榮席次預約專線</p>
                  <p className="leading-normal mt-0.5 text-stone-300 font-mono">(02) 2771-5800</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-gold-300 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-200">商務活動 / 包場服務聯絡信箱</p>
                  <p className="leading-normal mt-0.5 text-stone-400 font-mono">concierge@handam-dining.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-gold-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">營業時間 (每週一例休)</p>
                  <div className="leading-relaxed text-stone-400 mt-1 space-y-0.5 font-sans">
                    <p>午宴：11:30 – 15:00 (最後點膳 13:30)</p>
                    <p>晚宴：18:00 – 22:30 (最後點膳 20:30)</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Column 3: Beautiful Google Maps integration */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-sm tracking-[0.2em] text-gold-300 font-semibold uppercase border-b border-stone-900 pb-2">
              地理位置 (GOOGLE MAP)
            </h3>
            
            {/* Embedded map iframe frame */}
            <div className="relative border border-stone-850 p-1.5 rounded-sm bg-stone-950 overflow-hidden shadow-2xl h-56 group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.90827255152!2d121.55461157608826!3d25.037190338159677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb4e542ccab%3A0xbcfbc84af6fa8dc9!2zMTEw5Y-w5YyX5biC5L-h6義5Y2A6I-v6Z-z6LevNeeZnw!5e0!3m2!1szh-TW!2stw!4v1716942482312!5m2!1szh-TW!2stw" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(70%) invert(90%) contrast(100%) brightness(95%)" }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer"
                title="한담 HanDam 所在地理位置 Google Map"
                className="rounded-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute top-3 left-3 bg-stone-950/90 text-[10px] text-gold-200 tracking-wider font-mono border border-gold-300/30 px-2.5 py-1 rounded">
                國父紀念館商圈 (光復南路)
              </div>
            </div>
          </div>

        </div>

        {/* Separator row */}
        <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 gap-4">
          <p className="font-mono text-center md:text-left">
            &copy; {currentYear} 한담 HANDAM Korean Fine Dining. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <span className="hover:text-gold-300/60 transition-colors">隱私權保護政策</span>
            <span className="hover:text-gold-300/60 transition-colors">貴賓條款與禮儀指引</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

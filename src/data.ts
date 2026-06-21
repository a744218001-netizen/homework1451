import { MenuItem } from "./types";

// Dynamic generated paths from our workspace
export const IMAGES = {
  hero: "/src/assets/images/hero_dining_room_1782056790965.jpg",
  chef: "/src/assets/images/chef_portrait_1782056809131.jpg",
  mains: "/src/assets/images/premium_beef_dish_1782056826803.jpg",
  appetizer: "/src/assets/images/korean_appetizer_1782056843096.jpg",
  dessert: "/src/assets/images/korean_dessert_1782056861097.jpg",
  // High quality CDN fallbacks for secondary items
  abalone: "https://images.unsplash.com/photo-1534080391025-a87e49940027?auto=format&fit=crop&q=80&w=600",
  gujeolpan: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=600",
  stoneRice: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
  shortRibs: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
  yuzuMousse: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
  tea: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
  riceWine: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=600",
  conceptRoom: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600"
};

export const MENU_ITEMS: Record<string, MenuItem[]> = {
  appetizers: [
    {
      id: "app-1",
      name: "金箔海鮮御水餃",
      price: 580,
      description: "嚴選濟州島新鮮章魚與現剝野生明蝦入餡，綴以純金金箔與主廚特調韓味柑橘沾醬。",
      image: IMAGES.appetizer,
      isPopular: true
    },
    {
      id: "app-2",
      name: "御膳九折坂 (Traditional Gujeolpan)",
      price: 880,
      description: "韓國宮廷經典代表作。九格漆木盒精緻呈現，以手作全小麥春餅包覆蕈菇、鮮筍及特選黃牛絲。",
      image: IMAGES.gujeolpan
    },
    {
      id: "app-3",
      name: "宮廷人蔘御膳鮑魚",
      price: 720,
      description: "精選深海九孔活鮑魚，以六年根高麗參精燉熟成，切片後點綴新鮮山野生薑與白松露油。",
      image: IMAGES.abalone
    }
  ],
  mains: [
    {
      id: "main-1",
      name: "熟成韓牛佐松露醬 (Signature Hanwoo)",
      price: 2880,
      description: "選用最高評級熟成韓牛沙朗，爐火慢烤至完美熟度，焦香脆外皮與柔嫩肉質，佐野生黑松露醬汁。",
      image: IMAGES.mains,
      isPopular: true
    },
    {
      id: "main-2",
      name: "石膳海珍御皇拌飯",
      price: 1480,
      description: "高溫黑角閃石釜飯，拌入新鮮海膽、鮭魚卵與帝王蟹肉，搭配低溫淬煉手作芝麻油與特製甘口辣椒醬。",
      image: IMAGES.stoneRice
    },
    {
      id: "main-3",
      name: "主廚宮廷秘製烤牛小排 (Royal Galbi)",
      price: 1880,
      description: "祖傳秘製水果梨汁醃醬低溫浸漬72小時，高溫炭火炙烤頂級帶骨牛小排，香甜入味軟嫩多汁。",
      image: IMAGES.shortRibs
    }
  ],
  desserts: [
    {
      id: "des-1",
      name: "曜黑芝麻冰淇淋佐手工松子脆片",
      price: 380,
      description: "濃郁手炒黑芝麻製成義式冰淇淋，搭配低溫烘烤松子脆片、黑糖蜜澆淋與黃金松葉點綴。",
      image: IMAGES.dessert,
      isPopular: true
    },
    {
      id: "des-2",
      name: "柚香紅豆御慕斯球",
      price: 360,
      description: "全開羅香草慕斯巧妙揉合大邱有機紅豆蜜，外層淋上高興郡黃金柚子果凍鏡面，酸甜解膩。",
      image: IMAGES.yuzuMousse
    }
  ],
  drinks: [
    {
      id: "dr-1",
      name: "有機蓮花雪梨花茶",
      price: 280,
      description: "整朵有機白蓮於壺中優雅綻放，融匯慢燉雪梨汁與洋槐蜂蜜，溫潤清香，潤喉解燥。",
      image: IMAGES.tea
    },
    {
      id: "dr-2",
      name: "手作低溫發酵覆盆子米酒 (Bokbunjajoo)",
      price: 450,
      description: "主廚家鄉古法低温甕發酵，精選高山野覆盆子與有機糯米釀造，酒質渾厚、果香四溢、極致醇香。",
      image: IMAGES.riceWine,
      isPopular: true
    }
  ]
};

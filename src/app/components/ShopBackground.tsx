import React from 'react';

export function ShopBackground() {
  return (
    <>
      {/* Background com elementos vetoriais sutis */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradiente base com iluminação central */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1a1a1a] via-[#0f0f0f] to-[#000000]" />

        {/* Bordas com folhas em arbusto - mais escuras e numerosas */}
        <svg
          className="absolute inset-0 w-full h-full opacity-50 blur-sm"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Folhas na borda esquerda - mais escuras */}
          <path d="M0,200 Q50,180 80,220 Q60,260 40,240 Q20,280 0,260" fill="#000000" opacity="0.8" />
          <path d="M0,400 Q40,380 70,420 Q50,460 30,440 Q10,480 0,460" fill="#000000" opacity="0.7" />
          <path d="M0,600 Q50,580 80,620 Q60,660 40,640 Q20,680 0,660" fill="#000000" opacity="0.6" />
          <path d="M0,800 Q40,780 70,820 Q50,860 30,840 Q10,880 0,860" fill="#000000" opacity="0.7" />
          <path d="M0,100 Q60,80 90,120 Q70,160 50,140 Q30,180 0,160" fill="#000000" opacity="0.6" />
          <path d="M0,300 Q45,280 75,320 Q55,360 35,340 Q15,380 0,360" fill="#000000" opacity="0.8" />
          <path d="M0,500 Q55,480 85,520 Q65,560 45,540 Q25,580 0,560" fill="#000000" opacity="0.7" />
          <path d="M0,700 Q50,680 80,720 Q60,760 40,740 Q20,780 0,760" fill="#000000" opacity="0.6" />
          <path d="M0,900 Q45,880 75,920 Q55,960 35,940 Q15,980 0,960" fill="#000000" opacity="0.8" />

          {/* Folhas na borda direita - mais escuras */}
          <path d="M1920,150 Q1870,130 1840,170 Q1860,210 1880,190 Q1900,230 1920,210" fill="#000000" opacity="0.8" />
          <path d="M1920,350 Q1880,330 1850,370 Q1870,410 1890,390 Q1910,430 1920,410" fill="#000000" opacity="0.7" />
          <path d="M1920,550 Q1870,530 1840,570 Q1860,610 1880,590 Q1900,630 1920,610" fill="#000000" opacity="0.6" />
          <path d="M1920,750 Q1880,730 1850,770 Q1870,810 1890,790 Q1910,830 1920,810" fill="#000000" opacity="0.7" />
          <path d="M1920,50 Q1860,30 1830,70 Q1850,110 1870,90 Q1890,130 1920,110" fill="#000000" opacity="0.6" />
          <path d="M1920,250 Q1875,230 1845,270 Q1865,310 1885,290 Q1905,330 1920,310" fill="#000000" opacity="0.8" />
          <path d="M1920,450 Q1865,430 1835,470 Q1855,510 1875,490 Q1895,530 1920,510" fill="#000000" opacity="0.7" />
          <path d="M1920,650 Q1870,630 1840,670 Q1860,710 1880,690 Q1900,730 1920,710" fill="#000000" opacity="0.6" />
          <path d="M1920,850 Q1875,830 1845,870 Q1865,910 1885,890 Q1905,930 1920,910" fill="#000000" opacity="0.8" />

          {/* Folhas na borda superior - mais escuras */}
          <path d="M300,0 Q320,30 280,50 Q260,20 300,0" fill="#000000" opacity="0.7" />
          <path d="M600,0 Q620,30 580,50 Q560,20 600,0" fill="#000000" opacity="0.8" />
          <path d="M900,0 Q920,30 880,50 Q860,20 900,0" fill="#000000" opacity="0.7" />
          <path d="M1200,0 Q1220,30 1180,50 Q1160,20 1200,0" fill="#000000" opacity="0.8" />
          <path d="M1500,0 Q1520,30 1480,50 Q1460,20 1500,0" fill="#000000" opacity="0.7" />
          <path d="M100,0 Q120,30 80,50 Q60,20 100,0" fill="#000000" opacity="0.6" />
          <path d="M400,0 Q420,30 380,50 Q360,20 400,0" fill="#000000" opacity="0.8" />
          <path d="M700,0 Q720,30 680,50 Q660,20 700,0" fill="#000000" opacity="0.7" />
          <path d="M1000,0 Q1020,30 980,50 Q960,20 1000,0" fill="#000000" opacity="0.8" />
          <path d="M1300,0 Q1320,30 1280,50 Q1260,20 1300,0" fill="#000000" opacity="0.7" />
          <path d="M1600,0 Q1620,30 1580,50 Q1560,20 1600,0" fill="#000000" opacity="0.6" />
          <path d="M1800,0 Q1820,30 1780,50 Q1760,20 1800,0" fill="#000000" opacity="0.8" />

          {/* Folhas na borda inferior - mais escuras */}
          <path d="M200,1080 Q220,1050 180,1030 Q160,1060 200,1080" fill="#000000" opacity="0.7" />
          <path d="M500,1080 Q520,1050 480,1030 Q460,1060 500,1080" fill="#000000" opacity="0.8" />
          <path d="M800,1080 Q820,1050 780,1030 Q760,1060 800,1080" fill="#000000" opacity="0.7" />
          <path d="M1100,1080 Q1120,1050 1080,1030 Q1060,1060 1100,1080" fill="#000000" opacity="0.8" />
          <path d="M1400,1080 Q1420,1050 1380,1030 Q1360,1060 1400,1080" fill="#000000" opacity="0.7" />
          <path d="M1700,1080 Q1720,1050 1680,1030 Q1660,1060 1700,1080" fill="#000000" opacity="0.8" />
          <path d="M50,1080 Q70,1050 30,1030 Q10,1060 50,1080" fill="#000000" opacity="0.6" />
          <path d="M350,1080 Q370,1050 330,1030 Q310,1060 350,1080" fill="#000000" opacity="0.7" />
          <path d="M650,1080 Q670,1050 630,1030 Q610,1060 650,1080" fill="#000000" opacity="0.8" />
          <path d="M950,1080 Q970,1050 930,1030 Q910,1060 950,1080" fill="#000000" opacity="0.7" />
          <path d="M1250,1080 Q1270,1050 1230,1030 Q1210,1060 1250,1080" fill="#000000" opacity="0.8" />
          <path d="M1550,1080 Q1570,1050 1530,1030 Q1510,1060 1550,1080" fill="#000000" opacity="0.7" />

          {/* Arbusto central com mais folhas - mais escuras */}
          <path d="M800,900 Q820,870 780,850 Q760,880 800,900" fill="#000000" opacity="0.9" />
          <path d="M850,920 Q870,890 830,870 Q810,900 850,920" fill="#000000" opacity="0.8" />
          <path d="M900,880 Q920,850 880,830 Q860,860 900,880" fill="#000000" opacity="0.7" />
          <path d="M950,950 Q970,920 930,900 Q910,930 950,950" fill="#000000" opacity="0.8" />
          <path d="M1000,890 Q1020,860 980,840 Q960,870 1000,890" fill="#000000" opacity="0.9" />
          <path d="M750,950 Q770,920 730,900 Q710,930 750,950" fill="#000000" opacity="0.7" />
          <path d="M1050,920 Q1070,890 1030,870 Q1010,900 1050,920" fill="#000000" opacity="0.8" />
          <path d="M800,1000 Q820,970 780,950 Q760,980 800,1000" fill="#000000" opacity="0.6" />
          <path d="M900,980 Q920,950 880,930 Q860,960 900,980" fill="#000000" opacity="0.8" />
        </svg>

        {/* Elementos vetoriais - Galhos e folhas sutis */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Galhos principais */}
          <path
            d="M200,400 Q300,350 400,380 Q500,360 600,400"
            stroke="#2a2a2a"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M1400,300 Q1500,280 1600,320 Q1700,300 1800,340"
            stroke="#2a2a2a"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />

          {/* Folhas sutis */}
          <ellipse cx="350" cy="370" rx="8" ry="12" fill="#1a1a1a" opacity="0.4" transform="rotate(-20 350 370)" />
          <ellipse cx="480" cy="355" rx="6" ry="10" fill="#1a1a1a" opacity="0.4" transform="rotate(15 480 355)" />
          <ellipse cx="550" cy="385" rx="7" ry="11" fill="#1a1a1a" opacity="0.4" transform="rotate(-10 550 385)" />

          <ellipse cx="1450" cy="295" rx="9" ry="13" fill="#1a1a1a" opacity="0.4" transform="rotate(25 1450 295)" />
          <ellipse cx="1580" cy="310" rx="6" ry="9" fill="#1a1a1a" opacity="0.4" transform="rotate(-15 1580 310)" />
          <ellipse cx="1720" cy="325" rx="8" ry="12" fill="#1a1a1a" opacity="0.4" transform="rotate(10 1720 325)" />

          {/* Ramos secundários */}
          <path
            d="M320,420 Q380,440 420,430"
            stroke="#1a1a1a"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M1520,360 Q1580,380 1620,370"
            stroke="#1a1a1a"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
          />

          {/* Folhas menores */}
          <ellipse cx="390" cy="435" rx="4" ry="6" fill="#1a1a1a" opacity="0.3" transform="rotate(30 390 435)" />
          <ellipse cx="410" cy="425" rx="3" ry="5" fill="#1a1a1a" opacity="0.3" transform="rotate(-20 410 425)" />

          <ellipse cx="1590" cy="375" rx="5" ry="7" fill="#1a1a1a" opacity="0.3" transform="rotate(20 1590 375)" />
          <ellipse cx="1610" cy="365" rx="4" ry="6" fill="#1a1a1a" opacity="0.3" transform="rotate(-25 1610 365)" />
        </svg>

        {/* Partículas animadas */}
        <div className="absolute inset-0">
          {/* Partícula 1 */}
          <div className="absolute w-1 h-1 bg-[#b8964f] rounded-full opacity-30 animate-shop-float-1"></div>

          {/* Partícula 2 */}
          <div className="absolute w-1 h-1 bg-[#a89677] rounded-full opacity-25 animate-shop-float-2"></div>

          {/* Partícula 3 */}
          <div className="absolute w-1 h-1 bg-[#8b7355] rounded-full opacity-20 animate-shop-float-3"></div>

          {/* Partícula 4 */}
          <div className="absolute w-1 h-1 bg-[#b8964f] rounded-full opacity-35 animate-shop-float-4"></div>

          {/* Partícula 5 */}
          <div className="absolute w-1 h-1 bg-[#a89677] rounded-full opacity-30 animate-shop-float-5"></div>

          {/* Partícula 6 */}
          <div className="absolute w-1 h-1 bg-[#8b7355] rounded-full opacity-25 animate-shop-float-6"></div>
        </div>
      </div>

    </>
  );
}
import React from 'react';

export function ShopBackground() {
  return (
    <>
      {/* Background com elementos vetoriais sutis */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradiente base com iluminação central */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1a1a1a] via-[#0f0f0f] to-[#000000]" />

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
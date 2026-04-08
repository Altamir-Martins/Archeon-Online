import React from 'react';

const Particles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Particle 1 */}
      <div className="absolute left-1/4 top-1/4 w-1 h-1 bg-[#b8964f]/30 rounded-full animate-float-1"></div>
      {/* Particle 2 */}
      <div className="absolute left-3/4 top-1/3 w-1 h-1 bg-[#b8964f]/20 rounded-full animate-float-2"></div>
      {/* Particle 3 */}
      <div className="absolute left-1/2 top-2/3 w-1 h-1 bg-[#b8964f]/25 rounded-full animate-float-3"></div>
      {/* Particle 4 */}
      <div className="absolute left-1/6 top-1/2 w-1 h-1 bg-[#b8964f]/35 rounded-full animate-float-4"></div>
      {/* Particle 5 */}
      <div className="absolute left-5/6 top-3/4 w-1 h-1 bg-[#b8964f]/15 rounded-full animate-float-5"></div>
      {/* Particle 6 */}
      <div className="absolute left-2/3 top-1/6 w-1 h-1 bg-[#b8964f]/40 rounded-full animate-float-6"></div>
      {/* Particle 7 */}
      <div className="absolute left-1/3 top-1/5 w-1 h-1 bg-[#b8964f]/28 rounded-full animate-float-7"></div>
      {/* Particle 8 */}
      <div className="absolute left-4/5 top-2/5 w-1 h-1 bg-[#b8964f]/22 rounded-full animate-float-8"></div>
      {/* Particle 9 */}
      <div className="absolute left-3/5 top-4/5 w-1 h-1 bg-[#b8964f]/32 rounded-full animate-float-9"></div>
      {/* Particle 10 */}
      <div className="absolute left-1/5 top-3/5 w-1 h-1 bg-[#b8964f]/18 rounded-full animate-float-10"></div>
      {/* Particle 11 */}
      <div className="absolute left-4/6 top-1/4 w-1 h-1 bg-[#b8964f]/26 rounded-full animate-float-11"></div>
      {/* Particle 12 */}
      <div className="absolute left-2/5 top-5/6 w-1 h-1 bg-[#b8964f]/24 rounded-full animate-float-12"></div>
    </div>
  );
};

export default Particles;
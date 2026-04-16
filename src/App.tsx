import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { PortfolioPlayer } from './components/PortfolioPlayer';
import { QuoteCalculator } from './components/QuoteCalculator';
import { Booking } from './components/Booking';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Simple scroll to section logic
  useEffect(() => {
    if (activeSection) {
      const element = document.getElementById(activeSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['home', 'services', 'works', 'calculator', 'booking'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary md:grid md:grid-cols-[80px_1fr_300px] md:grid-rows-[70px_1fr_90px] md:h-screen md:overflow-hidden">
      
      {/* Sidebar */}
      <aside className="hidden md:flex md:row-span-3 bg-matte-black border-r border-deep-gray flex-col items-center pt-5 gap-10 z-50">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} isSidebar={true} />
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} isSidebar={false} />
      </div>

      {/* Header */}
      <header className="hidden md:flex col-start-2 col-end-3 items-center justify-between px-10 border-b border-deep-gray bg-background z-40">
        <div className="text-[11px] font-mono uppercase tracking-[2px] text-text-secondary">완벽을 위한 엔지니어링 // 스튜디오 상태: 온라인</div>
        <div className="text-[12px] font-mono opacity-80">엔지니어_01 // 서울</div>
      </header>

      {/* Main Stage */}
      <main className="md:col-start-2 md:col-end-3 md:relative md:bg-[radial-gradient(circle_at_50%_50%,#1a2a2e_0%,var(--color-background)_70%)] md:overflow-y-auto pb-24 md:pb-0 scroll-smooth hide-scrollbar">
        <div id="home">
          <Hero setActiveSection={setActiveSection} />
        </div>
        <div id="services">
          <Services />
        </div>
      </main>

      {/* Right Panel */}
      <aside className="md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-3 bg-matte-black border-l border-deep-gray p-8 flex flex-col gap-8 md:overflow-y-auto z-40 hide-scrollbar">
        <div id="calculator">
          <QuoteCalculator />
        </div>
        <div id="booking">
          <Booking />
        </div>
      </aside>

      {/* Player Bar */}
      <footer className="md:col-start-2 md:col-end-4 bg-matte-black border-t border-deep-gray z-50">
        <div id="works">
          <PortfolioPlayer />
        </div>
      </footer>

      {/* Global CTA Float (Desktop) */}
      <div className="hidden md:block fixed bottom-32 right-8 z-50">
        <button 
          onClick={() => setActiveSection('booking')}
          className="px-6 py-3 bg-primary text-background font-bold rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-background"></span>
          </span>
          무료 컨설팅
        </button>
      </div>
    </div>
  );
}

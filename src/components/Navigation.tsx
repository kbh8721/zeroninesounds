import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Layers, Headphones, Calculator, Calendar, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'works', label: 'Works', icon: Headphones },
  { id: 'calculator', label: 'Quote', icon: Calculator },
  { id: 'booking', label: 'Booking', icon: Calendar },
];

export function Navigation({ activeSection, setActiveSection, isSidebar = false }: { activeSection: string, setActiveSection: (id: string) => void, isSidebar?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      {isSidebar ? (
        <motion.nav
          className="hidden md:flex flex-col items-center pt-5 gap-10 h-full w-full"
        >
          <div 
            className="text-2xl font-bold tracking-tighter cursor-pointer text-primary"
            onClick={() => setActiveSection('home')}
          >
            09
          </div>
          
          <div className="flex flex-col items-center gap-8 opacity-60 mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'w-8 h-8 border-2 rounded flex items-center justify-center transition-all',
                  activeSection === item.id ? 'border-primary shadow-[0_0_10px_var(--color-primary)] text-primary' : 'border-text-secondary text-text-secondary hover:border-white hover:text-white'
                )}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            )})}
          </div>
        </motion.nav>
      ) : (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block',
            isScrolled ? 'glass-panel py-4' : 'bg-transparent py-6'
          )}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div 
              className="text-2xl font-bold tracking-tighter cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              zeronine<span className="text-primary">.</span>
            </div>
            
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary relative',
                    activeSection === item.id ? 'text-white' : 'text-text-secondary'
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <button 
                onClick={() => setActiveSection('booking')}
                className="px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-background transition-all duration-300 text-sm font-semibold"
              >
                Consulting
              </button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Mobile Bottom Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel pb-safe pt-2 px-4 flex justify-between items-center rounded-t-2xl border-b-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'flex flex-col items-center justify-center w-16 h-14 relative',
                isActive ? 'text-primary' : 'text-gray-500'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 mb-1 relative z-10" />
              <span className="text-[10px] font-medium relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

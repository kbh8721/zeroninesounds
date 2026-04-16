import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const serviceOptions = [
  { id: 'mixing', label: 'Stem Mixing', basePrice: 300 },
  { id: 'mastering', label: 'Stereo Mastering', basePrice: 100 },
  { id: 'stem-mastering', label: 'Stem Mastering', basePrice: 150 },
  { id: 'sound-design', label: 'Sound Design', basePrice: 500 },
];

export function QuoteCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [trackCount, setTrackCount] = useState(1);
  const [isRush, setIsRush] = useState(false);
  const [total, setTotal] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('zeronine_quote');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedServices(parsed.selectedServices || []);
      setTrackCount(parsed.trackCount || 1);
      setIsRush(parsed.isRush || false);
    }
  }, []);

  // Calculate and save
  useEffect(() => {
    let newTotal = 0;
    selectedServices.forEach(id => {
      const service = serviceOptions.find(s => s.id === id);
      if (service) newTotal += service.basePrice * trackCount;
    });
    
    if (isRush) newTotal *= 1.5; // 50% rush fee
    
    setTotal(newTotal);

    localStorage.setItem('zeronine_quote', JSON.stringify({
      selectedServices, trackCount, isRush
    }));
  }, [selectedServices, trackCount, isRush]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 md:py-0 px-6 md:px-0">
      <div className="md:widget">
        <div className="md:widget-title hidden md:block">Smart Estimate</div>
        
        <div className="md:hidden mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Smart Quote</h2>
          <p className="text-text-secondary font-light text-sm">Select services for an instant estimate.</p>
        </div>

        <div className="space-y-6 md:space-y-4">
          {/* Services Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-white/80 md:hidden">1. Select Services</h3>
            <div className="grid grid-cols-1 gap-2">
              {serviceOptions.map(service => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all duration-300 text-left text-sm",
                    selectedServices.includes(service.id)
                      ? "bg-primary/10 border-primary shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                      : "bg-surface border-white/5 hover:border-white/20"
                  )}
                >
                  <span className={cn("font-medium", selectedServices.includes(service.id) ? "text-primary" : "text-white")}>
                    {service.label}
                  </span>
                  <div className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                    selectedServices.includes(service.id) ? "bg-primary border-primary" : "border-gray-500"
                  )}>
                    {selectedServices.includes(service.id) && <Check className="w-2.5 h-2.5 text-background" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Track Count */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-white/80 md:hidden">2. Number of Tracks</h3>
            <div className="flex items-center justify-between text-sm text-text-secondary mb-2 hidden md:flex">
              <span>Tracks</span>
              <span className="text-white">{trackCount} Stem</span>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={trackCount}
                onChange={(e) => setTrackCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="w-12 text-center font-mono text-sm text-primary bg-surface py-1 rounded border border-white/5 md:hidden">
                {trackCount}
              </div>
            </div>
          </div>

          {/* Rush Delivery */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-white/80 md:hidden">3. Timeline</h3>
            <div className="flex items-center justify-between text-sm text-text-secondary mb-2 hidden md:flex">
              <span>Turnaround</span>
              <span className="text-white">{isRush ? '48 Hours' : 'Standard'}</span>
            </div>
            <button
              onClick={() => setIsRush(!isRush)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-300",
                isRush ? "bg-primary/10 border-primary/50" : "bg-surface border-white/5 hover:border-white/20"
              )}
            >
              <div>
                <span className={cn("font-medium block text-left text-sm", isRush ? "text-primary" : "text-white")}>Rush Delivery</span>
              </div>
              <div className={cn(
                "w-8 h-4 rounded-full transition-colors relative",
                isRush ? "bg-primary" : "bg-gray-600"
              )}>
                <motion.div 
                  className="w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm"
                  animate={{ left: isRush ? "18px" : "2px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Total Display */}
        <div className="mt-6 pt-4 border-t border-deep-gray flex justify-between items-baseline">
          <span className="text-sm text-text-secondary">Total Estimate</span>
          <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, UploadCloud, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Booking() {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      setTimeout(() => setStep(2), 1000);
    }, 2000);
  };

  return (
    <section className="py-12 md:py-0 px-6 md:px-0 flex flex-col gap-8 h-full">
      {/* Active Sessions Widget (Desktop Only) */}
      <div className="hidden md:block widget">
        <div className="widget-title">Active Sessions</div>
        <div className="relative pl-6 mb-5 border-l-2 border-primary">
          <div className="text-xs font-semibold text-white">Final Mix Review</div>
          <div className="text-[10px] text-text-secondary font-mono mt-1">PROJECT_ID: ALPHA-09</div>
        </div>
        <div className="relative pl-6 mb-5 border-l-2 border-deep-gray">
          <div className="text-xs font-semibold text-text-secondary">Analog Summing</div>
          <div className="text-[10px] text-text-secondary font-mono mt-1">PROJECT_ID: BETA-22</div>
        </div>
        <div className="relative pl-6 border-l-2 border-deep-gray">
          <div className="text-xs font-semibold text-text-secondary">Project Inbound</div>
          <div className="text-[10px] text-text-secondary font-mono mt-1">PROJECT_ID: GAMMA-12</div>
        </div>
      </div>

      <div className="md:widget md:flex-1 md:flex md:flex-col md:justify-center md:items-center md:border-dashed md:opacity-80 md:hover:opacity-100 transition-opacity">
        {step === 1 ? (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-center w-full"
          >
            <h3 className="text-2xl font-semibold mb-8 md:hidden">1. Upload Project Files</h3>
            
            <div 
              onClick={!isUploading && !uploadComplete ? handleUpload : undefined}
              className={cn(
                "w-full max-w-md border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer md:border-none md:p-0",
                uploadComplete ? "border-green-500 bg-green-500/5 md:bg-transparent" :
                isUploading ? "border-primary bg-primary/5 md:bg-transparent" : "border-white/20 hover:border-primary/50 hover:bg-white/5 md:hover:bg-transparent"
              )}
            >
              {uploadComplete ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500 flex flex-col items-center">
                  <CheckCircle2 className="w-12 h-12 md:w-8 md:h-8 mb-4 md:mb-2" />
                  <span className="font-medium text-sm md:text-xs">Upload Complete</span>
                </motion.div>
              ) : isUploading ? (
                <div className="flex flex-col items-center text-primary">
                  <div className="w-12 h-12 md:w-8 md:h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 md:mb-2" />
                  <span className="font-medium text-sm md:text-xs animate-pulse">Processing files...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-text-secondary hover:text-white transition-colors">
                  <div className="hidden md:block text-3xl font-light mb-2">+</div>
                  <UploadCloud className="w-12 h-12 mb-4 text-white/50 md:hidden" />
                  <span className="font-medium text-white mb-2 md:hidden">Click or drag files here</span>
                  <span className="text-sm md:text-[10px] md:font-mono md:tracking-[1px]">UPLOAD FILES</span>
                </div>
              )}
            </div>
            
            {/* Project Tracker Preview (Mobile Only) */}
            <div className="w-full max-w-md mt-12 md:hidden">
              <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-wider">Project Status Preview</h4>
              <div className="space-y-4">
                {['Files Received', 'Reviewing', 'In Progress', 'Feedback', 'Final Delivery'].map((status, i) => (
                  <div key={status} className="flex items-center gap-4 opacity-50 grayscale">
                    <div className="w-6 h-6 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[10px]">
                      {i + 1}
                    </div>
                    <span className="text-sm">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col w-full"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center md:text-sm md:mb-4">2. Schedule Consultation</h3>
            
            <div className="grid grid-cols-1 gap-8 md:gap-4">
              {/* Time Slots */}
              <div className="space-y-4 md:space-y-2">
                <h4 className="font-medium flex items-center gap-2 mb-6 md:mb-2 md:text-xs"><Clock className="w-4 h-4 text-primary" /> Available Times</h4>
                {['10:00 AM', '01:30 PM', '04:00 PM'].map(time => (
                  <button key={time} className="w-full p-4 md:p-2 rounded-xl md:rounded-lg border border-white/10 bg-surface hover:border-primary/50 hover:text-primary transition-colors text-left text-sm">
                    {time} PST
                  </button>
                ))}
                
                <button 
                  onClick={() => alert('Booking confirmed! (Prototype)')}
                  className="w-full py-4 md:py-2 bg-primary text-background font-bold rounded-xl md:rounded-lg mt-8 md:mt-4 hover:bg-primary/90 transition-colors text-sm"
                >
                  Confirm Booking
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-text-secondary text-sm md:text-xs hover:text-white transition-colors"
                >
                  Back to Upload
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

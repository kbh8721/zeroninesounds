import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const tracks = [
  { id: 1, title: 'Midnight City', artist: 'Synthwave Project', genre: 'Electronic / Mixing' },
  { id: 2, title: 'Ocean Echoes', artist: 'Acoustic Sessions', genre: 'Acoustic / Mastering' },
  { id: 3, title: 'Cybernetic Pulse', artist: 'Game OST', genre: 'Sound Design' },
];

export function PortfolioPlayer() {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTrackList, setShowTrackList] = useState(false);
  
  // Simulated playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <section className="py-12 md:py-0 px-6 md:px-10 md:h-[90px] flex flex-col md:flex-row md:items-center w-full relative">
      <div className="mb-8 md:hidden">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Selected Works</h2>
        <p className="text-text-secondary font-light text-sm">
          High-fidelity audio streaming directly from our studio masters.
        </p>
      </div>

      {/* Track List (Absolute on Desktop) */}
      <div className={cn(
        "lg:col-span-1 space-y-2 md:absolute md:bottom-[100px] md:left-10 md:w-[300px] md:bg-matte-black md:border md:border-deep-gray md:p-4 md:rounded-xl md:shadow-2xl md:z-50 transition-all",
        "md:hidden", // Hide by default on desktop unless toggled (we'll add a toggle button)
        showTrackList ? "md:block" : ""
      )}>
        <div className="hidden md:flex justify-between items-center mb-4">
          <h3 className="font-semibold">Tracks</h3>
          <button onClick={() => setShowTrackList(false)} className="text-text-secondary hover:text-white">✕</button>
        </div>
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => {
              setActiveTrack(track);
              setProgress(0);
              setIsPlaying(true);
            }}
            className={cn(
              "w-full text-left p-3 rounded-lg transition-all duration-300 border text-sm",
              activeTrack.id === track.id 
                ? "bg-surface border-primary/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]" 
                : "bg-transparent border-transparent hover:bg-surface/50"
            )}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className={cn("font-medium", activeTrack.id === track.id ? "text-primary" : "text-white")}>
                  {track.title}
                </h4>
                <p className="text-xs text-text-secondary mt-1">{track.artist}</p>
              </div>
              {activeTrack.id === track.id && isPlaying && (
                <div className="flex gap-0.5 h-3 items-end">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary rounded-t-sm"
                      animate={{ height: ["20%", "100%", "20%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Player Interface */}
      <div className="glass-panel rounded-3xl p-6 md:p-0 md:bg-transparent md:border-none md:shadow-none md:backdrop-blur-none flex flex-col md:flex-row md:items-center md:justify-between w-full relative overflow-hidden md:overflow-visible gap-6 md:gap-10">
        
        {/* Player Info */}
        <div className="relative z-10 md:w-[200px] flex items-center gap-4">
          <button 
            onClick={() => setShowTrackList(!showTrackList)}
            className="hidden md:flex w-8 h-8 rounded bg-surface border border-deep-gray items-center justify-center hover:border-primary/50 transition-colors"
            title="Toggle Track List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
          </button>
          <div>
            <h3 className="text-xl md:text-sm font-semibold md:font-bold mb-1 md:mb-0">{activeTrack.title}</h3>
            <p className="text-text-secondary text-sm md:text-xs">{activeTrack.artist}</p>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          {/* Controls */}
          <div className="flex items-center justify-center md:justify-start gap-4 text-white">
            <button className="hover:text-primary transition-colors md:hidden">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-12 h-12 md:w-8 md:h-8 rounded-full border-2 border-white text-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 md:w-4 md:h-4 fill-current" /> : <Play className="w-5 h-5 md:w-4 md:h-4 fill-current ml-0.5" />}
            </button>
            <button className="hover:text-primary transition-colors md:hidden">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Progress Track */}
          <div className="flex-1 flex items-center gap-4">
            <div className="h-1.5 md:h-1 w-full bg-deep-gray rounded-full cursor-pointer relative overflow-hidden" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setProgress((x / rect.width) * 100);
            }}>
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-mono text-xs text-text-secondary hidden md:block w-[100px]">
              02:14 / 04:52
            </div>
          </div>
        </div>

        {/* Volume / Gain Knob (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-deep-gray relative">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-primary" />
          </div>
          <div className="font-mono text-[10px] text-text-secondary">GAIN 100%</div>
        </div>

        {/* Mobile Volume */}
        <div className="flex items-center gap-3 text-text-secondary md:hidden">
          <Volume2 className="w-4 h-4" />
          <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-white rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
}

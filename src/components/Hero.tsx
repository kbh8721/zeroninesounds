import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero({ setActiveSection }: { setActiveSection: (id: string) => void }) {
  return (
    <section className="relative min-h-screen md:min-h-[calc(100vh-160px)] flex items-center justify-start overflow-hidden pt-20 md:pt-0 px-6 md:px-10">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,rgba(18,18,18,1)_70%)] md:hidden" />
        {/* Simulated Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-gray-300 tracking-wider">하이엔드 오디오 엔지니어링</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-[64px] font-black tracking-tighter mb-4 leading-[1.1]"
        >
          <span className="text-primary drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">옹구뽈</span><br />
          <span className="text-4xl md:text-[48px] text-white">압도적인 사운드</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm md:text-[14px] text-text-secondary max-w-[400px] mb-12 font-normal leading-[1.6]"
        >
          타의 추종을 불허하는 오디오 선명도와 깊이를 원하는 아티스트를 위한 하이엔드 믹싱, 마스터링 및 사운드 디자인.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => setActiveSection('works')}
            className="group relative px-8 py-4 bg-primary text-background font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center justify-center gap-2">
              포트폴리오 듣기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Waveform at bottom */}
      <div className="absolute bottom-10 left-10 right-10 h-[180px] opacity-80 pointer-events-none flex items-center gap-1 overflow-hidden">
        {[40, 80, 120, 100, 150, 180, 130, 160, 140, 100, 60, 120, 170, 110, 80, 40, 30, 90, 120, 60, 100].map((h, i) => (
          <motion.div
            key={i}
            className="w-[6px] bg-primary rounded-full opacity-80"
            animate={{
              height: [h * 0.5, h, h * 0.5],
            }}
            transition={{
              duration: Math.random() * 1.5 + 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}

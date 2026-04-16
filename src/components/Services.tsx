import { motion } from 'framer-motion';
import { Sliders, Disc3, Mic2, Activity } from 'lucide-react';

const services = [
  {
    id: 'mixing',
    title: '믹싱 (Mixing)',
    description: '완벽한 밸런스, 깊이, 선명도를 달성하세요. 각 트랙이 사운드스케이프에 완벽하게 자리잡도록 조각합니다.',
    icon: Sliders,
  },
  {
    id: 'mastering',
    title: '마스터링 (Mastering)',
    description: '최종 완성 단계. 경쟁력 있는 음압으로 모든 재생 시스템에서 트랙이 완벽하게 재생되도록 보장합니다.',
    icon: Disc3,
  },
  {
    id: 'sound-design',
    title: '사운드 디자인 (Sound Design)',
    description: '영화, 게임 및 전자 음악 프로덕션을 위해 처음부터 독특하고 맞춤화된 사운드를 창조합니다.',
    icon: Activity,
  },
  {
    id: 'vocal-tuning',
    title: '보컬 프로덕션 (Vocal Production)',
    description: '리드 보컬이 빛나고 전면에 나서도록 하는 정밀한 튜닝, 타이밍 보정 및 프로세싱.',
    icon: Mic2,
  }
];

export function Services() {
  return (
    <section className="py-12 md:py-20 px-6 md:px-10 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">전문 분야</h2>
        <p className="text-text-secondary max-w-2xl font-light text-sm md:text-base">
          아날로그의 따뜻함과 디지털의 정밀함을 결합하여 당신의 사운드 비전을 현실로 만듭니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-colors duration-500 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none blur-xl" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-text-secondary group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

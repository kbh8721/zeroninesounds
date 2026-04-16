import { motion } from 'framer-motion';
import { Sliders, Disc3, Mic2, Activity } from 'lucide-react';

const services = [
  {
    id: 'mixing',
    title: 'Mixing',
    description: 'Achieve perfect balance, depth, and clarity. We sculpt each track to sit perfectly in the sonic landscape.',
    icon: Sliders,
  },
  {
    id: 'mastering',
    title: 'Mastering',
    description: 'The final polish. Ensuring your track translates flawlessly across all playback systems with competitive loudness.',
    icon: Disc3,
  },
  {
    id: 'sound-design',
    title: 'Sound Design',
    description: 'Creating unique, bespoke sounds from scratch for film, games, and electronic music production.',
    icon: Activity,
  },
  {
    id: 'vocal-tuning',
    title: 'Vocal Production',
    description: 'Precise tuning, timing correction, and processing to make your lead vocals shine and sit upfront.',
    icon: Mic2,
  }
];

export function Services() {
  return (
    <section className="py-12 md:py-20 px-6 md:px-10 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Expertise</h2>
        <p className="text-text-secondary max-w-2xl font-light text-sm md:text-base">
          We combine analog warmth with digital precision to bring your sonic vision to life.
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

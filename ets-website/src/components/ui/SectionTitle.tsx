import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = false,
  light = false 
}: SectionTitleProps) {
  const textColor = light ? 'text-ets-cream' : 'text-ets-navy';
  const subtitleColor = light ? 'text-ets-cream/70' : 'text-ets-charcoal/70';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${centered ? 'text-center' : ''}`}
    >
      <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-4 gold-underline`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg ${subtitleColor} max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
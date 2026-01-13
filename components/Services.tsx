import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'media',
    title: 'Media Campaigns',
    tagline: 'We make ads that don’t feel like ads.',
    explainer: 'Campaign ideas + execution that grab attention.',
  },
  {
    id: 'posting',
    title: 'Content Posting',
    tagline: 'Because ghost accounts don’t grow.',
    explainer: 'Regular posting with actual strategy.',
  },
  {
    id: 'scheduling',
    title: 'Scheduling',
    tagline: 'So your content doesn’t nap when it should sprint.',
    explainer: 'Automated + timed posting, zero stress.',
  },
  {
    id: 'design',
    title: 'Designing',
    tagline: 'Scroll-stopping art for thumb-scrollers.',
    explainer: 'Carousels, reels, graphics, brand creatives.',
  },
  {
    id: 'calendars',
    title: 'Content Calendars',
    tagline: 'Your content, but with a Netflix release plan.',
    explainer: 'Organized calendars → never run out of ideas.',
  },
  {
    id: 'ads',
    title: 'Paid Ads',
    tagline: 'Money well spent = reach well earned.',
    explainer: 'If you want to throw cash at Meta/Google, we’ll make it count.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-aurore-dark px-6">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end"
        >
          <div>
            <span className="text-yellow-500 font-mono mb-2 block">02. SERVICES</span>
            <h2 className="font-serif text-5xl md:text-6xl">What We Actually Do</h2>
          </div>
          <p className="text-neutral-400 mt-4 md:mt-0 max-w-md text-right">
            Instead of boring service names, we serve catchy titles + sarcastic punchlines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-aurore-gray h-[300px] p-8 flex flex-col justify-between overflow-hidden border border-white/5 hover:border-yellow-500/50 transition-colors"
            >
              <div className="z-10 relative">
                <h3 className="font-serif text-3xl mb-4 group-hover:text-yellow-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-neutral-400 font-light italic text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                  "{service.tagline}"
                </p>
              </div>

              <div className="z-10 relative transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="h-[1px] w-full bg-white/20 mb-4"></div>
                <p className="text-sm font-sans tracking-wide text-white">
                  {service.explainer}
                </p>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-neutral-900 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out -z-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
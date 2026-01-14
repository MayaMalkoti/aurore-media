
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Target, PenTool, Layout, Calendar, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onNavigate: (path: string) => void;
}

const problems = [
  { id: 'reach', title: '“I post, but nothing happens.”', reveal: 'Your content is missing 3 things: hook, clarity, and consistency. We fix that with a strategy + editing system built around your audience.', link: '/insights/growth-instagram-not-growing' },
  { id: 'ideas', title: '“I don’t know what to post.”', reveal: 'You don’t need more motivation. You need a repeatable content plan. We build your pillars, topics, and a calendar you can maintain.', link: '/insights/productivity-content-calendar-template' },
  { id: 'cheap', title: '“My content looks cheap.”', reveal: 'The internet is unfair: people judge quality in 2 seconds. We upgrade your editing style, captions, and overall brand vibe.', link: '/insights/design-carousel-swipe-tips' },
  { id: 'busy', title: '“I’m busy. I need someone to handle it.”', reveal: 'Perfect. You send raw clips. We turn them into clean, ready-to-post content with a simple weekly workflow.', link: '/insights/productivity-content-calendar-template' },
];

const mainServices = [
  {
    icon: <PenTool size={18} />,
    title: 'Short-Form Editing',
    features: ['Tight cuts', 'Modern captions', 'Clean pacing', 'IG / YT Formatting'],
    deliverable: 'Ready-to-post videos',
    insight: { text: 'Read Carousel Tips', path: '/insights/design-carousel-swipe-tips' }
  },
  {
    icon: <Target size={18} />,
    title: 'Content Strategy',
    features: ['Core pillars', 'Hook bank', 'Topic lists', 'Simple rhythm'],
    deliverable: 'Reusable Notion system',
    insight: { text: 'Growth Secrets', path: '/insights/growth-instagram-not-growing' }
  },
  {
    icon: <Layout size={18} />,
    title: 'Brand Upgrade',
    features: ['Bio rewrite', 'Layout fix', 'Visual plan', 'Checklist'],
    deliverable: 'Premium look instantly',
    insight: { text: 'Visual Hierarchy', path: '/insights/design-carousel-swipe-tips' }
  },
  {
    icon: <Calendar size={18} />,
    title: 'System + Calendar',
    features: ['Monthly calendar', 'Idea engine', 'Low-energy list', 'Prompt bank'],
    deliverable: 'Consistency engine',
    insight: { text: 'View Calendar Template', path: '/insights/productivity-content-calendar-template' }
  }
];

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [activeProblem, setActiveProblem] = useState(problems[0].id);

  return (
    <section id="services" className="py-24 md:py-32 px-4 md:px-0 bg-black">
      <div className="container">
        
        <div className="mb-24 md:mb-40">
          <div className="max-w-4xl mb-12 md:mb-24">
            <span className="label-mini text-neon-gold mb-4 md:mb-6 block">01. CHALLENGES</span>
            <h2 className="h-large uppercase tracking-ultra text-white">
              What’s actually <br/><span className="text-neon-purple">holding you back?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
            <div className="lg:col-span-5 bg-black">
              {problems.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActiveProblem(p.id)}
                  className={`w-full text-left p-6 md:p-8 lg:p-10 transition-all duration-300 group border-b border-white/5 last:border-0 ${
                    activeProblem === p.id ? 'bg-neon-purple/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span className={`text-[11px] md:text-sm font-black uppercase tracking-widest transition-opacity ${activeProblem === p.id ? 'text-white' : 'text-neutral-500'}`}>
                    {p.title}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="lg:col-span-7 bg-aurore-gray p-8 md:p-16 lg:p-20 flex flex-col justify-center min-h-[350px] md:min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProblem}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6 md:space-y-8"
                >
                  <Zap className="text-neon-purple" size={24} />
                  <p className="text-xl md:text-2xl lg:text-3xl font-sans font-bold leading-tight md:leading-relaxed text-white">
                    {problems.find(p => p.id === activeProblem)?.reveal}
                  </p>
                  <button 
                    onClick={() => onNavigate(problems.find(p => p.id === activeProblem)!.link)}
                    className="flex items-center gap-2 label-mini text-neon-gold hover:translate-x-2 transition-transform active:translate-x-0"
                  >
                    Read this insight <ArrowRight size={12} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mb-24 md:mb-40">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {mainServices.map((s, i) => (
              <div key={i} className="bg-black p-8 md:p-10 lg:p-12 flex flex-col group hover:bg-white/[0.02] transition-colors relative min-h-[400px]">
                <div className="text-neon-purple mb-8 md:mb-10 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="font-sans font-black text-xl uppercase mb-6 md:mb-8 tracking-tighter text-white">{s.title}</h3>
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12 flex-grow">
                  {s.features.map((f, j) => (
                    <li key={j} className="text-[10px] md:text-[11px] font-black tracking-widest uppercase opacity-60 flex items-center gap-3 text-neutral-200">
                      <div className="w-1.5 h-1.5 bg-neon-purple rounded-full shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 md:gap-4 mt-auto">
                    <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-neon-gold border-t border-white/10 pt-6 md:pt-8">
                        {s.deliverable}
                    </p>
                    <button 
                        onClick={() => onNavigate(s.insight.path)}
                        className="text-[9px] font-black uppercase text-white/30 hover:text-neon-purple text-left transition-colors active:scale-95 origin-left"
                    >
                        {s.insight.text}
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;

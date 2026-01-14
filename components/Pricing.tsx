
import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    sub: 'Consistency',
    feats: ['8 high-end edits/mo', 'Basic strategy', 'Caption framework', 'Weekly delivery']
  },
  {
    name: 'Growth',
    sub: 'Strong Presence',
    popular: true,
    feats: ['12–16 edits/mo', 'Content pillars', 'Content calendar', 'Creative direction']
  },
  {
    name: 'Performance',
    sub: 'Full Engine',
    feats: ['20+ edits/mo', 'Optimization plan', 'Repurposing engine', 'Monthly reviews']
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 px-6 bg-black border-t border-white/5">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-24">
           <span className="label-mini text-neon-gold mb-6 block">05. INVESTMENT</span>
           <h2 className="h-large uppercase tracking-ultra text-white">PACKAGES<span className="text-neon-purple">.</span></h2>
           <p className="text-white/40 font-medium mt-6">Pricing shared after audit to ensure perfect scope.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 max-w-7xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`bg-black p-12 md:p-16 flex flex-col relative group transition-all duration-700 ${p.popular ? 'bg-neon-purple/[0.03]' : ''}`}>
              {p.popular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.5)]" />
              )}
              <span className="label-mini opacity-40 mb-3">{p.sub}</span>
              <h3 className="font-sans font-black text-3xl uppercase tracking-tighter mb-12">{p.name}</h3>
              
              <ul className="space-y-6 mb-16 flex-grow">
                {p.feats.map((f, j) => (
                  <li key={j} className="label-mini opacity-40 flex items-center gap-4 group-hover:opacity-100 transition-opacity">
                    <Check size={14} className="text-neon-purple" /> {f}
                  </li>
                ))}
              </ul>

              <a 
                href="mailto:auroreltd234@gmail.com" 
                className="w-full h-14 md:h-16 border border-white/10 flex items-center justify-center label-mini transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-neon-purple hover:text-white hover:border-neon-purple"
              >
                Inquire Pricing
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

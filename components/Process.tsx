
import React from 'react';

const steps = [
  { 
    id: '01', 
    title: 'Audit', 
    desc: 'An unforgiving review of your current output.' 
  },
  { 
    id: '02', 
    title: 'Selection', 
    desc: 'Designing a custom workflow for your specific scale.' 
  },
  { 
    id: '03', 
    title: 'Deployment', 
    desc: 'Rigorous weekly content drops with zero friction.' 
  },
  { 
    id: '04', 
    title: 'Optimization', 
    desc: 'Aggressive analysis and doubling down on winners.' 
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-40 bg-black px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-32">
          <div className="lg:col-span-8">
            <span className="label-mini text-neon-gold mb-12 block">04 // METHOD</span>
            <h2 className="h-large uppercase tracking-ultra text-white leading-none">
              Modernist <br/><span className="text-neon-purple">Efficiency.</span>
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10">
          {steps.map((step) => (
            <div key={step.id} className="p-12 border-b md:border-b-0 md:border-r border-white/10 last:border-0 group hover:bg-white/[0.02] transition-colors">
              <div className="text-sm font-black text-neon-purple mb-16 tracking-widest">
                STAGE_{step.id}
              </div>
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6 text-white">{step.title}</h3>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed text-white/40">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

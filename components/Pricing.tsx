
import React, { useState } from 'react';
import { Check, Settings2, Sparkles, Send, MessageCircle, ArrowRight } from 'lucide-react';

interface PricingProps {
  onOpenInquiry: () => void;
}

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

const WHATSAPP_NUMBER = '17789285234';

const Pricing: React.FC<PricingProps> = ({ onOpenInquiry }) => {
  const [customVideos, setCustomVideos] = useState(30);

  const handleWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('aurore_cta_click'));
    const text = "Hi Aurore Media, I'm interested in your services and would like to know more about pricing.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="pricing" className="section-py bg-black border-t border-white/5">
      <div className="container">
        <div className="max-w-4xl mb-16 md:mb-24">
           <span className="label-mini text-neon-gold mb-4 md:mb-6 block">05. INVESTMENT</span>
           <h2 className="h-large uppercase tracking-ultra text-white">PACKAGES<span className="text-neon-purple">.</span></h2>
           <p className="text-white/40 font-medium mt-4 md:mt-6 text-sm md:text-base">Pricing shared after audit to ensure perfect scope for your goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/5 border border-white/5 max-w-screen-2xl mx-auto mb-32">
          {plans.map((p, i) => (
            <div key={i} className={`bg-black p-8 md:p-10 lg:p-12 flex flex-col relative group transition-all duration-700 ${p.popular ? 'bg-neon-purple/[0.03]' : ''} border-white/5`}>
              {p.popular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.5)]" />
              )}
              <span className="label-mini opacity-40 mb-2 md:mb-3">{p.sub}</span>
              <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tighter mb-8 md:mb-12 text-white">{p.name}</h3>
              
              <ul className="space-y-4 md:space-y-6 mb-12 md:mb-16 flex-grow">
                {p.feats.map((f, j) => (
                  <li key={j} className="text-[10px] md:text-[11px] font-black uppercase tracking-widest opacity-40 flex items-center gap-3 md:gap-4 group-hover:opacity-100 transition-opacity">
                    <Check size={14} className="text-neon-purple shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenInquiry}
                className="w-full h-12 md:h-16 border border-white/10 flex items-center justify-center label-mini transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-neon-purple hover:text-white hover:border-neon-purple"
              >
                Inquire Pricing
              </button>
            </div>
          ))}

          {/* Customized Adjustable Section */}
          <div className="bg-aurore-gray p-8 md:p-10 lg:p-12 flex flex-col relative group transition-all duration-700 border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-gold shadow-[0_0_15px_rgba(233,166,97,0.3)] opacity-50" />
            
            <div className="flex justify-between items-start mb-2 md:mb-3">
              <span className="label-mini text-neon-gold">Adjustable</span>
              <Settings2 size={14} className="text-neon-gold opacity-50" />
            </div>
            
            <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tighter mb-8 text-white">Bespoke<span className="text-neon-gold">.</span></h3>
            
            <div className="mb-10 p-6 bg-black/40 border border-white/5 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Volume</span>
                <span className="text-xl font-black text-neon-gold">{customVideos} <span className="text-[10px] tracking-widest">Videos</span></span>
              </div>
              
              <input 
                type="range" 
                min="5" 
                max="100" 
                step="5"
                value={customVideos}
                onChange={(e) => setCustomVideos(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-gold"
              />
              
              <div className="flex justify-between mt-3 text-[8px] font-black uppercase tracking-[0.2em] text-white/20">
                <span>5 Min</span>
                <span>100 Max</span>
              </div>
            </div>

            <div className="space-y-6 mb-12 flex-grow">
               <div className="flex items-start gap-4">
                  <Sparkles size={16} className="text-neon-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Scale Strategy</p>
                    <p className="text-[11px] text-white/40 font-bold uppercase leading-relaxed">
                      {customVideos > 50 ? 'Enterprise-level multi-channel deployment.' : 'Precision focused high-growth workflow.'}
                    </p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <Check size={16} className="text-neon-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Creative Assets</p>
                    <p className="text-[11px] text-white/40 font-bold uppercase leading-relaxed">
                      Includes full custom visual identity and motion kit.
                    </p>
                  </div>
               </div>
            </div>

            <button 
              onClick={onOpenInquiry}
              className="w-full h-12 md:h-16 bg-white text-black label-mini flex items-center justify-center transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-neon-gold hover:text-white"
            >
              Custom Quote
            </button>
          </div>
        </div>

        {/* Improved Inquire Pricing CTA Block */}
        <div className="max-w-6xl mx-auto bg-aurore-gray border border-white/10 p-8 md:p-16 lg:p-24 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
            <Send size={240} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center text-left">
            <div>
              <span className="label-mini text-neon-purple mb-6 block tracking-[0.5em]">Direct Inquiry</span>
              <h2 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tighter text-white leading-[0.9] mb-8">
                Inquire <br/><span className="text-neon-gold">Pricing.</span>
              </h2>
              <p className="text-xl md:text-2xl font-bold text-white/50 leading-tight mb-4">
                Pricing depends on what you need and how many edits per month. Answer a few quick questions and we’ll send the best plan + pricing.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                <Sparkles size={12} className="text-neon-gold" />
                New studio, high attention. No pressure — just clarity.
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={onOpenInquiry}
                className="w-full h-16 md:h-20 bg-white text-black label-mini flex items-center justify-center gap-4 hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
              >
                <Send size={20} /> Get Pricing (60-sec Form)
              </button>
              <button 
                onClick={handleWhatsApp}
                className="w-full h-16 md:h-20 border border-white/10 text-white label-mini flex items-center justify-center gap-4 hover:bg-[#25D366]/10 hover:border-[#25D366] hover:text-[#25D366] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle size={20} /> WhatsApp for Pricing
              </button>
              <div className="text-center">
                 <button 
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors mt-2"
                >
                  Or view success results <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

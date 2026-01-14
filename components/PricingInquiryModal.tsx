
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Calendar, CheckCircle2, ArrowRight, Loader2, ChevronDown, Globe } from 'lucide-react';

interface PricingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL = 'auroreltd234@gmail.com';
const WHATSAPP_NUMBER = '17789285234';
const GOOGLE_BOOKING_LINK = 'https://calendar.app.google/ezjxjxCqoBbqaghx8';

type Market = 'INR' | 'CAD' | 'USD';

const BUDGET_RANGES: Record<Market, string[]> = {
  INR: [
    'Not sure yet (recommendation needed)',
    'Under ₹10,000',
    '₹10,000 – ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,00,000',
    '₹2,00,000+'
  ],
  CAD: [
    'Not sure yet (recommendation needed)',
    'Under $250',
    '$250 – $500',
    '$500 – $1,000',
    '$1,000 – $2,000',
    '$2,00,0 – $5,000',
    '$5,000+'
  ],
  USD: [
    'Not sure yet (recommendation needed)',
    'Under $250',
    '$250 – $500',
    '$500 – $1,000',
    '$1,000 – $2,000',
    '$2,000 – $5,000',
    '$5,000+'
  ]
};

const PricingInquiryModal: React.FC<PricingInquiryModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    handle: '',
    role: '',
    services: [] as string[],
    volume: '',
    timeline: '',
    market: 'INR' as Market,
    budget: '',
    notes: ''
  });

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call/Email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Inquiry Data:', formData);
    setIsSubmitting(false);
    setStep('success');
    window.dispatchEvent(new CustomEvent('aurore_cta_click'));
  };

  const openWhatsApp = () => {
    const text = `Hi Aurore Media, I want pricing.\n\nMarket: ${formData.market}\nBudget: ${formData.budget || 'Not specified'}\nIG/website: ${formData.handle || '___'}\nI need: ${formData.services.join(', ') || '___'}\nMonthly edits: ${formData.volume || '___'}\nTimeline: ${formData.timeline || '___'}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 md:p-6 lg:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-aurore-gray border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide rounded-[2rem] flex flex-col"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-30 p-2"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12 lg:p-16">
              <AnimatePresence mode="wait">
                {step === 'form' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-12">
                      <span className="label-mini text-neon-gold mb-3 block">Pricing Request</span>
                      <h2 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tighter text-white leading-none">
                        Get Pricing<span className="text-neon-purple">.</span>
                      </h2>
                      <p className="text-white/40 font-bold uppercase tracking-widest text-[11px] mt-4 max-w-xl">
                        Tell us what you need. We’ll reply with the right plan + pricing within 24–48 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      {/* Market Selector */}
                      <div className="bg-black/40 border border-white/10 p-1 rounded-2xl flex">
                        {[
                          { id: 'INR', label: '🇮🇳 India (INR)' },
                          { id: 'CAD', label: '🇨🇦 Canada (CAD)' },
                          { id: 'USD', label: '🇺🇸 USA (USD)' }
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, market: m.id as Market, budget: '' })}
                            className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                              formData.market === m.id 
                                ? 'bg-white text-black shadow-lg' 
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {/* Basic Info */}
                        <div className="space-y-8">
                          <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Full Name *</label>
                            <input 
                              required 
                              type="text" 
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              placeholder="John Doe"
                              className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:opacity-20"
                            />
                          </div>
                          <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Email *</label>
                            <input 
                              required 
                              type="email" 
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              placeholder="john@example.com"
                              className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:opacity-20"
                            />
                          </div>
                          <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">WhatsApp / Phone *</label>
                            <input 
                              required 
                              type="tel" 
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              placeholder="+1 234 567 890"
                              className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:opacity-20"
                            />
                          </div>
                          <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">IG Handle / Website *</label>
                            <input 
                              required 
                              type="text" 
                              value={formData.handle}
                              onChange={e => setFormData({...formData, handle: e.target.value})}
                              placeholder="@username"
                              className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:opacity-20"
                            />
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="space-y-8">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-4">You are a: *</label>
                            <div className="flex flex-wrap gap-2">
                              {['Creator', 'Local Business', 'Brand', 'Other'].map(role => (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => setFormData({...formData, role})}
                                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                                    formData.role === role ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/30'
                                  }`}
                                >
                                  {role}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-4">What do you need help with? *</label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                'Short-form editing', 
                                'Content strategy', 
                                'Content calendar', 
                                'Profile upgrade', 
                                'Other'
                              ].map(service => (
                                <label key={service} className="flex items-center gap-3 cursor-pointer group">
                                  <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={formData.services.includes(service)}
                                    onChange={() => handleServiceToggle(service)}
                                  />
                                  <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                                    formData.services.includes(service) ? 'bg-neon-purple border-neon-purple' : 'border-white/20 group-hover:border-white/40'
                                  }`}>
                                    {formData.services.includes(service) && <Send size={8} className="text-white" />}
                                  </div>
                                  <span className={`text-[11px] font-bold uppercase tracking-tight ${formData.services.includes(service) ? 'text-white' : 'text-white/40'}`}>
                                    {service}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors relative">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Monthly Videos *</label>
                              <select 
                                required
                                value={formData.volume}
                                onChange={e => setFormData({...formData, volume: e.target.value})}
                                className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-aurore-gray text-white/50">Select</option>
                                {['4', '8', '12', '16', '20+'].map(v => (
                                  <option key={v} value={v} className="bg-aurore-gray">{v} Videos</option>
                                ))}
                              </select>
                              <ChevronDown size={12} className="absolute right-0 bottom-4 opacity-30 pointer-events-none" />
                            </div>
                            <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors relative">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Timeline *</label>
                              <select 
                                required
                                value={formData.timeline}
                                onChange={e => setFormData({...formData, timeline: e.target.value})}
                                className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-aurore-gray text-white/50">Select</option>
                                {['ASAP', 'This week', 'This month', 'Just exploring'].map(t => (
                                  <option key={t} value={t} className="bg-aurore-gray">{t}</option>
                                ))}
                              </select>
                              <ChevronDown size={12} className="absolute right-0 bottom-4 opacity-30 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Budget Range Selector */}
                      <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">
                          Budget range (monthly) — optional
                        </label>
                        <select 
                          value={formData.budget}
                          onChange={e => setFormData({...formData, budget: e.target.value})}
                          className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-aurore-gray text-white/50">Select Budget Range</option>
                          {BUDGET_RANGES[formData.market].map(b => (
                            <option key={b} value={b} className="bg-aurore-gray">{b}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-0 bottom-4 opacity-30 pointer-events-none" />
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/20 mt-2">
                          This helps us recommend the right scope. No pressure.
                        </p>
                      </div>

                      <div className="group border-b border-white/10 pb-2 focus-within:border-neon-purple transition-colors">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Notes (Optional)</label>
                        <textarea 
                          rows={2}
                          value={formData.notes}
                          onChange={e => setFormData({...formData, notes: e.target.value})}
                          placeholder="Tell us a bit more about your project..."
                          className="w-full bg-transparent text-white font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:opacity-20 resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                          disabled={isSubmitting}
                          type="submit"
                          className="flex-1 h-16 bg-white text-black label-mini flex items-center justify-center gap-3 hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                        >
                          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Send & Get Pricing</>}
                        </button>
                        <button 
                          type="button"
                          onClick={openWhatsApp}
                          className="h-16 px-8 border border-white/10 text-white label-mini flex items-center justify-center gap-3 hover:bg-[#25D366]/10 hover:border-[#25D366] hover:text-[#25D366] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <MessageCircle size={18} /> WhatsApp for Pricing
                        </button>
                      </div>
                    </form>

                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10 text-center mt-12">
                      New studio, high attention. No pressure — just clarity.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 md:py-20"
                  >
                    <div className="flex justify-center mb-10">
                      <div className="w-24 h-24 rounded-full border-4 border-neon-purple flex items-center justify-center text-neon-purple shadow-[0_0_30px_rgba(176,38,255,0.4)]">
                        <CheckCircle2 size={48} />
                      </div>
                    </div>
                    <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-ultra mb-6 leading-none text-white">RECEIVED<span className="text-neon-purple">.</span></h2>
                    <p className="text-white/50 font-bold text-xl uppercase tracking-tighter mb-16">
                      Got it. We’ll reply in 24–48 hours with the best plan + pricing.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
                      <a 
                        href={GOOGLE_BOOKING_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 h-16 bg-neon-gold text-black label-mini flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:scale-[1.05]"
                      >
                        <Calendar size={18} /> Book a 15-min Call
                      </a>
                      <button 
                        onClick={onClose}
                        className="flex-1 h-16 border border-white/10 text-white label-mini flex items-center justify-center gap-3 hover:bg-white/5 transition-all transform hover:scale-[1.05]"
                      >
                        Back to Site <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PricingInquiryModal;

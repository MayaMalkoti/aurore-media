import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizOption } from '../types';
import { Rocket, CheckCircle } from 'lucide-react';

const LeadMagnet: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setFormSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-aurore-dark to-black px-6 min-h-[80vh] flex items-center">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <span className="text-yellow-500 font-mono mb-2 block">05. GET STARTED</span>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">Let’s make your brand impossible to ignore.</h2>
            {!formSubmitted && !selectedOption && (
                <p className="text-xl text-neutral-400">Pick your biggest struggle:</p>
            )}
        </motion.div>

        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px]"></div>

            <AnimatePresence mode="wait">
                {!selectedOption ? (
                    <motion.div 
                        key="quiz"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {Object.values(QuizOption).map((option) => (
                            <button
                                key={option}
                                onClick={() => setSelectedOption(option)}
                                className="text-left p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 font-medium group"
                            >
                                <span className="inline-block w-4 h-4 rounded-full border border-current mr-3 group-hover:bg-black/20"></span>
                                {option}
                            </button>
                        ))}
                    </motion.div>
                ) : !formSubmitted ? (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-md mx-auto space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="text-center mb-8">
                             <p className="text-yellow-500 text-sm font-mono mb-2">YOU SELECTED:</p>
                             <p className="italic text-neutral-300">"{selectedOption}"</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Name</label>
                                <input required type="text" className="w-full bg-black/50 border-b border-white/20 p-3 focus:outline-none focus:border-yellow-500 transition-colors text-white" placeholder="Jane Doe" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Email</label>
                                <input required type="email" className="w-full bg-black/50 border-b border-white/20 p-3 focus:outline-none focus:border-yellow-500 transition-colors text-white" placeholder="jane@brand.com" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Brand IG</label>
                                <input type="text" className="w-full bg-black/50 border-b border-white/20 p-3 focus:outline-none focus:border-yellow-500 transition-colors text-white" placeholder="@brandname" />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-yellow-500 text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                        >
                            Send Help <Rocket size={18} />
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => setSelectedOption(null)}
                            className="w-full text-center text-xs text-neutral-500 hover:text-white underline mt-4"
                        >
                            Start Over
                        </button>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="text-yellow-500 w-16 h-16" />
                        </div>
                        <h3 className="text-3xl font-serif mb-4">Help is on the way.</h3>
                        <p className="text-neutral-400">We'll review your struggle and slide into your DMs (professionally) soon.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
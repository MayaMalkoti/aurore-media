
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Share2, MessageSquare, CheckCircle2, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import { insights } from '../data/insights';

interface InsightArticleProps {
  post: BlogPost;
  onBack: () => void;
  onNavigate: (slug: string) => void;
  onOpenAudit: () => void;
}

const InsightArticle: React.FC<InsightArticleProps> = ({ post, onBack, onNavigate, onOpenAudit }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeHeading, setActiveHeading] = useState('');

  const related = insights.filter(p => p.id !== post.id).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  return (
    <div className="relative bg-black min-h-screen">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-neon-purple z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* Article Hero */}
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 label-mini text-white/40 hover:text-neon-purple transition-colors mb-12"
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>

          <span className="label-mini text-neon-gold mb-6 block">{post.category} // Insight</span>
          <h1 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-ultra leading-[0.85] text-white mb-10">
            {post.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-y border-white/10">
            <p className="text-xl font-bold text-white/60 max-w-xl">{post.subtitle}</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 label-mini opacity-40"><Clock size={14}/> {post.readTime}</div>
              <button className="p-3 border border-white/10 hover:border-neon-purple text-white transition-all"><Share2 size={16}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Table of Contents (Desktop Sidebar) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-40 h-fit">
            <h4 className="label-mini text-white mb-8 border-b border-white/10 pb-4">On this page</h4>
            <nav className="flex flex-col gap-4">
              <a href="#intro" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-neon-purple transition-colors">Overview</a>
              <a href="#takeaways" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-neon-purple transition-colors">Key Takeaways</a>
              <a href="#content" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-neon-purple transition-colors">Deep Dive</a>
              <a href="#sources" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-neon-purple transition-colors">Sources</a>
            </nav>
          </aside>

          {/* Article Body */}
          <div className="lg:col-span-9 max-w-3xl">
            <div id="intro" className="mb-20">
              <div 
                className="prose prose-invert prose-p:text-xl prose-p:font-medium prose-p:leading-relaxed prose-p:text-white/60 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-16 prose-strong:text-white prose-strong:font-black"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Takeaways Box */}
            <div id="takeaways" className="bg-aurore-gray border border-white/10 p-12 md:p-16 mb-20 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple" />
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-10 text-white">The Bottom Line</h3>
              <div className="space-y-6">
                {post.takeaways.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 size={20} className="text-neon-purple mt-1 flex-shrink-0" />
                    <p className="text-lg font-bold text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion CTA */}
            <div className="mt-32 p-12 md:p-20 bg-neon-purple text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-ultra leading-none mb-8">
                   Stop guessing. <br/>Start growing.
                 </h2>
                 <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      onClick={onOpenAudit}
                      className="h-16 px-10 bg-white text-black label-mini flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl"
                    >
                      Get a Free Audit
                    </button>
                    <button onClick={onBack} className="h-16 px-10 border border-white/20 hover:bg-white/10 label-mini transition-all">
                      More Insights
                    </button>
                 </div>
               </div>
               <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 text-[15rem] font-black opacity-10 pointer-events-none select-none tracking-ultra">GO</div>
            </div>

            {/* Related Posts */}
            <div className="mt-40">
              <h4 className="label-mini text-neon-gold mb-12">Related Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                {related.map(r => (
                  <div 
                    key={r.id}
                    onClick={() => onNavigate(r.slug)}
                    className="bg-black p-10 group cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 block">{r.category}</span>
                    <h5 className="font-sans font-black text-xl uppercase tracking-tighter text-white mb-6 group-hover:text-neon-purple transition-colors">{r.title}</h5>
                    <div className="flex items-center gap-2 label-mini text-white group-hover:translate-x-2 transition-transform">
                      Read <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightArticle;


import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Home, FileText, Scale } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
  onContact: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack, onContact }) => {
  return (
    <div className="bg-black min-h-screen pt-48 pb-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 label-mini text-white/40 hover:text-neon-purple transition-colors mb-12"
          >
            <ArrowLeft size={14} /> Back to Experience
          </button>

          <span className="label-mini text-neon-gold mb-6 block">Legal // Compliance</span>
          <h1 className="h-large uppercase tracking-ultra mb-16 text-white leading-none">
            Terms of <br/><span className="text-neon-purple">Use.</span>
          </h1>

          <div className="space-y-16">
            <section className="bg-aurore-gray p-10 md:p-14 border border-white/10 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Scale size={120} />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white/80 leading-relaxed mb-6 relative z-10">
                Welcome to Aurore Media (“we”, “us”, “our”). By accessing or using our website (the “Site”), you agree to these Terms of Use (“Terms”). 
              </p>
              <p className="text-lg font-black text-neon-gold uppercase tracking-tighter relative z-10">
                If you don’t agree, no hard feelings — just don’t use the Site.
              </p>
            </section>

            <div className="prose prose-invert max-w-none text-white/60 font-medium leading-relaxed space-y-8">
              <div className="border-b border-white/10 pb-8">
                <p className="text-sm font-black uppercase tracking-widest text-white mb-2">Terms of Use — Aurore Media</p>
                <p className="text-[11px] font-black uppercase tracking-widest text-neon-gold">Last updated: January 2025</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">1) What this site is (and isn’t)</h2>
                <p>This Site is a place to learn about Aurore Media, explore our content (like Insights), and contact us.</p>
                <p><strong>Important:</strong> The content on this Site is for general information and educational purposes. It’s not legal, financial, or professional advice for your specific situation.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">2) Using the site like a decent human</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Break the law while using the Site</li>
                  <li>Attempt to hack, disrupt, scrape, or overload the Site</li>
                  <li>Upload or send anything harmful (viruses, malware, spam, etc.)</li>
                  <li>Pretend to be someone you’re not</li>
                  <li>Use our content or brand to mislead people</li>
                </ul>
                <p>Basically: browse, learn, reach out — don’t be chaotic.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">3) Intellectual property (aka: don’t steal the sauce)</h2>
                <p>Unless we say otherwise, all content on this Site (text, design, logos, graphics, and materials) belongs to Aurore Media or is used with permission, and is protected by applicable intellectual property laws.</p>
                <p><strong>You may:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Read and share links to our content</li>
                  <li>Quote small portions with credit and a link back</li>
                </ul>
                <p><strong>You may not:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Copy, reproduce, sell, republish, or redistribute our content/design as your own without written permission</li>
                </ul>
                <p>If you want to use something, just ask. We’re friendly.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">4) Links to other sites</h2>
                <p>Sometimes we may link to third-party websites. We don’t control them and we’re not responsible for their content, policies, or how they operate. Clicking external links is your choice.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">5) Your messages and submissions</h2>
                <p>If you contact us through the Site (forms, email, etc.), you agree that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The information you provide is accurate to the best of your knowledge</li>
                  <li>You won’t send anything illegal, harmful, or abusive</li>
                </ul>
                <p>We may use the information you send to reply to your request and provide services. For more on how we handle data, check our Privacy Policy (if/when published) and Cookie Policy.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">6) Availability (we try, but the internet is the internet)</h2>
                <p>We aim to keep the Site available and running smoothly, but we can’t promise uninterrupted access forever. Sometimes things break, servers act up, or updates happen.</p>
                <p>We can suspend or modify the Site at any time without notice.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">7) Disclaimers (the “just so we’re clear” part)</h2>
                <p>The Site and all content are provided on an “as is” and “as available” basis.</p>
                <p>We don’t guarantee that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>the Site will always be error-free</li>
                  <li>the content will always be up-to-date</li>
                  <li>using the Site will produce specific results for your business</li>
                </ul>
                <p>We will always aim to be helpful — but outcomes depend on many factors outside our control.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">8) Limitation of liability</h2>
                <p>To the maximum extent allowed by law, Aurore Media will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) the Site.</p>
                <p>If liability is found where it can’t be excluded, it will be limited to the amount you paid to access the Site — which is currently ₹0, because it’s free.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">9) Changes to these terms</h2>
                <p>We may update these Terms from time to time. When we do, we’ll update the “Last updated” date at the top. Your continued use of the Site means you accept the updated Terms.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">10) Governing law</h2>
                <p>These Terms are governed by the laws applicable in your jurisdiction of operation. (In this context: India).</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">11) Contact</h2>
                <p>Questions about these Terms?<br/>
                Email us at: auroreltd234@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-16 border-t border-white/10">
               <button 
                 onClick={() => onBack()}
                 className="h-16 px-12 bg-white text-black label-mini flex items-center justify-center gap-3 hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.05]"
               >
                 <Home size={18} /> Back to Home
               </button>
               <button 
                 onClick={onContact}
                 className="h-16 px-12 border border-white/10 text-white label-mini flex items-center justify-center gap-3 hover:bg-white/5 transition-all transform hover:scale-[1.05]"
               >
                 <Mail size={18} /> Contact Us
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;

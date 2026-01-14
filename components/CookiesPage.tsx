
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, ArrowLeft, Settings2, FileText, Globe, Cookie } from 'lucide-react';

interface CookiesPageProps {
  onBack: () => void;
  onOpenPreferences: () => void;
}

const CookiesPage: React.FC<CookiesPageProps> = ({ onBack, onOpenPreferences }) => {
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
            Cookie <br/><span className="text-neon-purple">Policy.</span>
          </h1>

          <div className="space-y-16">
            <section className="bg-aurore-gray p-10 md:p-14 border border-white/10 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cookie size={120} />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white/80 leading-relaxed mb-10 relative z-10">
                At Aurore Media, transparency is a core value. We use cookies to keep our digital environment working smoothly, analyze what content actually resonates, and personalize your journey.
              </p>
              <button 
                onClick={onOpenPreferences}
                className="h-16 px-12 bg-white text-black label-mini flex items-center justify-center gap-3 hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.05] shadow-2xl relative z-10"
              >
                <Settings2 size={18} /> Manage Cookie Settings
              </button>
            </section>

            <div className="prose prose-invert max-w-none text-white/60 font-medium leading-relaxed space-y-8">
              <div className="border-b border-white/10 pb-8">
                <p className="text-sm font-black uppercase tracking-widest text-white mb-2">Cookie Policy — Aurore Media</p>
                <p className="text-[11px] font-black uppercase tracking-widest text-neon-gold">Last updated: January 2025</p>
              </div>

              <p>Aurore Media (“we”, “us”, “our”) uses cookies and similar technologies to help our website work properly, improve performance, and understand how visitors use the site. This Cookie Policy explains what cookies are, how we use them, and how you can control them.</p>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">1) What are cookies?</h2>
                <p>Cookies are small text files placed on your device when you visit a website. They help websites remember information about your visit, such as preferences and usage patterns. Similar technologies may include local storage, pixels, and tags.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">2) Why we use cookies</h2>
                <p>We use cookies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep the website functioning securely and reliably</li>
                  <li>Remember your cookie preferences</li>
                  <li>Understand which pages and content are helpful (analytics)</li>
                  <li>Improve site speed and performance</li>
                  <li>(If enabled) measure marketing campaigns and improve ad relevance</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">3) Types of cookies we may use</h2>
                
                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">A) Essential cookies (Always on)</h3>
                  <p>These cookies are required for the website to function and cannot be switched off in our systems. They are usually set in response to actions you take, like navigating pages or submitting forms.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">B) Analytics cookies (Optional)</h3>
                  <p>These cookies help us understand website traffic and usage, like which pages are visited and how visitors move around the site. This helps us improve content and user experience.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">C) Performance cookies (Optional)</h3>
                  <p>These cookies help us improve website performance and reliability, such as faster loading and smoother interaction.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">D) Personalization cookies (Optional)</h3>
                  <p>These cookies remember choices you make (such as preferences) to provide a more consistent experience.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">E) Marketing cookies (Optional — only if enabled)</h3>
                  <p>Marketing cookies may be used to measure ad performance or show relevant ads on other platforms. If we use these, we will only activate them with your consent where required.</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">4) Your choices and how to manage cookies</h2>
                <p>You can control cookies in two main ways:</p>
                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">A) Cookie banner / preferences</h3>
                  <p>When you first visit our site, you may see a cookie banner. You can accept all cookies, reject non-essential cookies, or customize your preferences. You can also change your preferences anytime via a “Cookie Preferences” link (if available) on the website.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">B) Browser settings</h3>
                  <p>Most browsers allow you to remove or block cookies using your settings. Note that blocking essential cookies may cause parts of the website to stop working properly.</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">5) Third-party cookies</h2>
                <p>Some cookies may be set by third-party services we use (for example, analytics or embedded content). These providers may collect data according to their own privacy policies. Where required, we will ask for your consent before enabling non-essential third-party cookies.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">6) How long cookies stay on your device</h2>
                <p>Some cookies are deleted when you close your browser (session cookies). Others remain for a set period or until you delete them (persistent cookies). The exact duration depends on the cookie and provider.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">7) Updates to this Cookie Policy</h2>
                <p>We may update this policy from time to time to reflect changes in the tools we use or legal requirements. Any updates will be posted on this page with a revised “Last updated” date.</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-white text-xl font-black uppercase tracking-tighter">8) Contact</h2>
                <p>If you have questions about this Cookie Policy, contact us at:<br/>
                Email: auroreltd234@gmail.com<br/>
                Website: theauroremedia.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPage;

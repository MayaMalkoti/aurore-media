
import React from 'react';
import { Mail, Zap } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenAudit: () => void;
}

const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenAudit }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] lg:hidden p-4 pointer-events-none">
      <div className="container mx-auto max-w-md pointer-events-auto">
        <div className="flex gap-2 bg-black/80 backdrop-blur-xl border border-white/10 p-2 shadow-2xl">
          <button 
            onClick={onOpenAudit}
            className="flex-grow h-14 bg-neon-purple text-white label-mini flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Zap size={14} fill="white" /> Free Audit
          </button>
          <a 
            href="mailto:auroreltd234@gmail.com" 
            className="w-14 h-14 border border-white/10 text-white flex items-center justify-center active:scale-95 transition-transform hover:bg-white/5"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyBar;

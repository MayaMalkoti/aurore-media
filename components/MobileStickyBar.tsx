
import React from 'react';
import { Mail } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenAudit: () => void;
}

const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenAudit }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] lg:hidden p-4 pointer-events-none">
      <div className="container mx-auto max-w-md pointer-events-auto">
        <div className="flex justify-end gap-2">
          <a 
            href="mailto:auroreltd234@gmail.com" 
            className="w-16 h-16 bg-black/80 backdrop-blur-xl border border-white/10 text-white rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-2xl"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyBar;

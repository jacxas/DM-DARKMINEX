import React from 'react';
import { Mountain, Github, Twitter, MessageSquare, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-mine-700 bg-mine-950 py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="font-mono font-bold tracking-tighter text-white">DM DARKMINE</span>
          </div>
          <p className="text-xs text-mine-600 leading-relaxed font-serif italic">
            "The darkness does not fear exploration; it rewards the persistent worker with treasures unknown to the surface world."
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-mine-500 mb-6 font-bold">Resouces</h4>
          <ul className="space-y-3 text-xs font-mono">
            <FooterLink label="Whitepaper" />
            <FooterLink label="Protocol Docs" />
            <FooterLink label="Mining Manual" />
            <FooterLink label="Risk Disclosure" />
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-mine-500 mb-6 font-bold">Community</h4>
          <div className="flex gap-4">
            <SocialIcon icon={<Twitter className="w-4 h-4" />} />
            <SocialIcon icon={<MessageSquare className="w-4 h-4" />} />
            <SocialIcon icon={<Github className="w-4 h-4" />} />
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-mine-500 mb-6 font-bold">Infrastructure</h4>
          <div className="p-3 bg-mine-900 border border-mine-800 rounded">
            <div className="flex justify-between items-center mb-2">
               <span className="text-[9px] font-mono text-mine-600 uppercase">Core Status</span>
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="text-[10px] font-mono text-white">BLOCK_HEIGHT: 1,482,903</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-mine-800 flex flex-col md:flex-row justify-between gap-4">
        <span className="text-[9px] font-mono text-mine-700 uppercase">© 2026 DEEP CORE OPS. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6 text-[9px] font-mono text-mine-700 uppercase">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <a href="#" className="text-mine-600 hover:text-white flex items-center gap-2 transition-colors">
        {label} <ExternalLink className="w-3 h-3 opacity-30" />
      </a>
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-10 h-10 bg-mine-900 border border-mine-800 rounded flex items-center justify-center text-mine-500 hover:text-amber-glow hover:border-amber-glow/30 transition-all">
      {icon}
    </a>
  );
}

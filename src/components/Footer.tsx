import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="py-20 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Zeal It Events</h2>
            <p className="text-white/40">Premium Event Management Company</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm text-white/40 mb-4">DOHA, QATAR</h3>
              <p className="text-white">West Bay</p>
              <p className="text-white">Doha, Qatar</p>
            </div>
            <div>
              <h3 className="text-sm text-white/40 mb-4">GET IN TOUCH</h3>
              <a href="mailto:hello@zealit.com" className="text-white hover:text-white/60 block">
                hello@zealit.com
              </a>
              <a href="tel:+97412345678" className="text-white hover:text-white/60 block mt-2">
                +974 1234 5678
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10">
          <div className="flex items-center gap-8">
            {[
              { Icon: Instagram, href: '#' },
              { Icon: Linkedin, href: '#' },
              { Icon: Twitter, href: '#' },
              { Icon: Youtube, href: '#' },
              { Icon: Facebook, href: '#' },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                className="text-white/40 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <p>All rights reserved © Zeal It Events 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
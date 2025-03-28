import React from 'react';
import { ArrowRight } from 'lucide-react';

const Work = () => {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold gradient-text mb-4">FEATURED EVENTS</h2>
          <p className="text-white/40">Our Signature Experiences</p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">
              LUXURY WEDDINGS <span className="text-white/40">(01)</span>
            </h3>
            <p className="text-lg text-white/60 mb-8">
              Creating magical moments and unforgettable celebrations
            </p>
            <button className="group flex items-center gap-2 px-8 py-4 bg-white/5 
              rounded-full border border-white/10 hover:bg-white/10 transition-all">
              <span className="text-white">View events</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Wedding"
              className="rounded-2xl opacity-50 hover:opacity-60 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
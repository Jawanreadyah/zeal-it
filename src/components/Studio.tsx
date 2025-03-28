import React from 'react';
import { ArrowRight } from 'lucide-react';

const ClientCard = ({ name }: { name: string }) => (
  <div className="group relative overflow-hidden bg-white/5 border border-white/10 p-8 rounded-2xl
    hover:bg-white/10 transition-all">
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-white mb-4">{name}</h3>
      <a href="#" className="inline-flex items-center text-white/60 hover:text-white gap-2 group-hover:translate-x-1 transition-all">
        Read More <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
);

const Studio = () => {
  const clients = [
    'GLOBAL TECH SUMMIT',
    'LUXURY WEDDINGS',
    'CHARITY GALAS',
    'CORPORATE RETREATS',
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Zeal It Events creates moments that matter
            </h2>
            <p className="text-lg text-white/60">
              Crafting extraordinary events that combine creativity with
              meticulous planning for unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clients.map((client) => (
              <ClientCard key={client} name={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;
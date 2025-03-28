import React from 'react';
import { Music, Mic2, Speaker, Lightbulb } from 'lucide-react';

const WeddingPlanning = () => {
  const services = [
    {
      icon: <Music className="w-6 h-6" />,
      title: 'Live Music Production',
      description: 'Full-scale concert production and management'
    },
    {
      icon: <Mic2 className="w-6 h-6" />,
      title: 'Artist Management',
      description: 'Comprehensive artist and performer coordination'
    },
    {
      icon: <Speaker className="w-6 h-6" />,
      title: 'Sound Engineering',
      description: 'Professional audio setup and management'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Stage Design',
      description: 'Creative stage and lighting design'
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h1 className="text-5xl font-bold mb-6">Live Concerts</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Creating unforgettable live music experiences. From intimate venues to 
            large-scale concerts, we deliver spectacular shows that resonate with audiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <img 
              src="https://assets-global.website-files.com/6540e2860c14634622958bc7/6540e2860c14634622958c2b_3D-Footer.webp"
              alt="Concert Production 3D Illustration"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Concert Services</h2>
              <p className="text-white/60">
                We handle every aspect of your concert production, ensuring a seamless 
                and spectacular performance that leaves a lasting impression on your audience.
              </p>
            </div>

            <div className="space-y-12">
              {services.map((service, index) => (
                <div key={index} className="group relative pl-12 border-l border-white/10">
                  <div className="absolute left-0 top-0 -translate-x-1/2 bg-black p-2 border border-white/10 rounded-full text-hurricane-red group-hover:-translate-y-1 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                  <p className="text-white/60">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-hurricane-red/20 to-transparent"></div>
          <div className="relative z-10 text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Concert?</h2>
            <p className="text-white/60 mb-8">Let's create an unforgettable show together</p>
            <button className="px-8 py-4 bg-hurricane-red text-white rounded-full hover:bg-hurricane-red/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingPlanning;
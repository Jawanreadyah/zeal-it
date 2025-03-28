import React from 'react';
import { Mic2, Monitor, Speaker, Lightbulb } from 'lucide-react';

const EventProduction = () => {
  const services = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: 'Visual Production',
      description: 'LED walls, projection mapping, and displays'
    },
    {
      icon: <Speaker className="w-6 h-6" />,
      title: 'Audio Systems',
      description: 'Professional sound equipment and engineering'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Lighting Design',
      description: 'Atmospheric and stage lighting solutions'
    },
    {
      icon: <Mic2 className="w-6 h-6" />,
      title: 'Stage Management',
      description: 'Complete stage setup and coordination'
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h1 className="text-5xl font-bold mb-6">Event Production</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            State-of-the-art technical production services for events of any scale. 
            We bring your vision to life with cutting-edge technology and expert execution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 mb-32">
          <div>
            <img 
              src="https://assets-global.website-files.com/6540e2860c14634622958bc7/6540e2860c14634622958c2b_3D-Footer.webp"
              alt="Event Production 3D Illustration"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-12">Technical Excellence</h2>
            <div className="relative space-y-16">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-hurricane-red via-white/10 to-transparent"></div>
              {services.map((service, index) => (
                <div key={index} className="relative pl-12 group">
                  <div className="absolute left-0 top-0 -translate-x-1/2 bg-black p-2 border border-white/10 rounded-full text-hurricane-red group-hover:-translate-y-1 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-white/60">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-hurricane-red/10 to-transparent"></div>
          <div className="relative z-10 py-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Production Process</h2>
              <p className="text-white/60">From concept to execution, we ensure every technical aspect is perfect</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                'Technical Planning',
                'Equipment Setup',
                'Show Operation',
                'Post-Event Support'
              ].map((step, index) => (
                <div key={index} className="group relative text-center">
                  <div className="mb-6 relative">
                    <div className="w-12 h-12 mx-auto relative">
                      <div className="absolute inset-0 bg-hurricane-red/20 rounded-full transform group-hover:scale-110 transition-transform"></div>
                      <span className="absolute inset-0 flex items-center justify-center font-bold">{index + 1}</span>
                    </div>
                    <div className="absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-hurricane-red/20 to-transparent"></div>
                  </div>
                  <h3 className="font-bold text-lg">{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventProduction;
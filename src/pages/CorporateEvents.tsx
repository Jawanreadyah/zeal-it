import React from 'react';
import { Building2, Users, Presentation, Calendar } from 'lucide-react';

const CorporateEvents = () => {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Venue Selection',
      description: 'Access to premium corporate venues and conference centers'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Attendee Management',
      description: 'Comprehensive registration and guest list management'
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      title: 'Technical Production',
      description: 'State-of-the-art AV equipment and technical support'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Event Planning',
      description: 'Detailed timeline and logistics management'
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h1 className="text-5xl font-bold mb-6">Corporate Events</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Elevate your corporate gatherings with our professional event management services. 
            From conferences to product launches, we ensure every detail is executed flawlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 mb-32">
          <div className="space-y-16">
            <h2 className="text-3xl font-bold">Our Expertise</h2>
            <div className="space-y-16">
              {features.map((feature, index) => (
                <div key={index} className="group relative pl-12 border-l border-white/10">
                  <div className="absolute left-0 top-0 -translate-x-1/2 bg-black p-2 border border-white/10 rounded-full text-hurricane-red group-hover:-translate-y-1 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://assets-global.website-files.com/6540e2860c14634622958bc7/6540e2860c14634622958c2b_3D-Footer.webp"
              alt="Corporate Events 3D Illustration"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Plan Your Corporate Event?</h2>
          <button className="px-8 py-4 bg-hurricane-red text-white rounded-full hover:bg-hurricane-red/90 transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default CorporateEvents;
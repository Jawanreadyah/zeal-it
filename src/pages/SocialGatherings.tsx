import React from 'react';
import { PartyPopper, Gift, Cake, Star } from 'lucide-react';

const SocialGatherings = () => {
  const events = [
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: 'Birthday Celebrations',
      description: 'Memorable birthday parties for all ages'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Anniversary Parties',
      description: 'Celebrating years of love and commitment'
    },
    {
      icon: <Cake className="w-6 h-6" />,
      title: 'Private Events',
      description: 'Intimate gatherings and special occasions'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Theme Parties',
      description: 'Custom themed events and celebrations'
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h1 className="text-5xl font-bold mb-6">Social Gatherings</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Create unforgettable moments with our expertly planned social events. 
            From intimate gatherings to grand celebrations, we bring your vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {events.map((event, index) => (
            <div key={index} className="group relative">
              <div className="absolute -left-4 top-0 text-hurricane-red group-hover:-translate-y-1 transition-transform">
                {event.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 pl-8">{event.title}</h3>
              <p className="text-white/60 pl-8">{event.description}</p>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-hurricane-red/20 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
            <div className="space-y-8">
              <p className="text-white/60">
                Our experienced team ensures every detail is perfect, from venue selection 
                to entertainment and catering. We create personalized experiences that 
                reflect your style and exceed expectations.
              </p>
              <div className="space-y-6">
                {['Personalized event planning', 'Professional coordination', 'Attention to detail'].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-px h-8 bg-hurricane-red group-hover:h-12 transition-all"></div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <img 
              src="https://assets-global.website-files.com/6540e2860c14634622958bc7/6540e2860c14634622958c2b_3D-Footer.webp"
              alt="Social Gatherings 3D Illustration"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGatherings;
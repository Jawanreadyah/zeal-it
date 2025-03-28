import React, { useEffect, useState } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Concert = () => {
  const [offset, setOffset] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const performers = [
    {
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000",
      alt: "Concert Performer 1"
    },
    {
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1000",
      alt: "Concert Performer 2"
    }
  ];

  const concertInfo = {
    about: {
      title: "About the Concert",
      content: (
        <div className="space-y-4 bg-gradient-to-b from-black/30 via-black/20 to-black/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
          <div className="relative z-10">
            <p>Join us for an unforgettable evening of music at the Qatar National Convention Center (QNCC).</p>
            <h3 className="text-xl font-bold mt-4">Featured Artists:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Manjari - Acclaimed Playback Singer</li>
              <li>Vipin Balan - Mimicry Artist</li>
              <li>Ashwin Vijayan - Playback Singer</li>
              <li>Anagha Narayanan - Cinema Actress</li>
            </ul>
            <p className="mt-4">Time: 7:00 PM - 11:00 PM</p>
            <p>Venue: Qatar National Convention Center (QNCC)</p>
          </div>
        </div>
      )
    },
    tickets: {
      title: "Tickets",
      content: (
        <div className="space-y-4 bg-gradient-to-b from-black/30 via-black/20 to-black/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
          <div className="relative z-10">
            <p>Tickets are available on Q-Tickets.com</p>
            <a 
              href="https://events.q-tickets.com/qatar/eventdetails/6245633452/raganilav---manjari-live-in-concert?_gl=1*61r091*_gcl_au*MTQ5ODk0Njg5Ny4xNzQzMDk1NDM1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors mt-4"
            >
              Book Now
            </a>
          </div>
        </div>
      )
    }
  };

  return (
    <section className="relative py-32 bg-transparent overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/VbrzhwdDL3ihPkSt/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle Overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>

      {/* More Info Button - Positioned to cover Spline watermark */}
      <div className="absolute bottom-4 right-4 z-50">
        <button className="group flex items-center gap-2 px-8 py-4 bg-black rounded-full border border-white/20 hover:bg-black/80 transition-all">
          <span className="text-sm text-white">More Info</span>
          <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Large Title with Depth Effect */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <h1 className="text-[120px] font-serif leading-none text-white/10 whitespace-nowrap overflow-hidden tracking-tight">
            Manjari Live in Concert
          </h1>
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column - Concert Info */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold mb-8">
                ZEAL IT
                <br />
                EVENTS
                <br />
                PRESENTS
              </h3>
              
              <nav className="space-y-4">
                {Object.entries(concertInfo).map(([key, { title }]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(activeSection === key ? null : key)}
                    className={`block text-left w-full ${
                      activeSection === key ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </nav>

              {/* Info Panel */}
              {activeSection && (
                <div className="mt-8">
                  {concertInfo[activeSection as keyof typeof concertInfo].content}
                </div>
              )}
            </div>

            {/* Right Column - Side by Side Images */}
            <div className="md:col-span-9">
              <div className="grid grid-cols-2 gap-8">
                {performers.map((performer, index) => (
                  <div 
                    key={index} 
                    className="relative overflow-hidden rounded-lg group h-[600px] bg-white/5 border border-white/10 backdrop-blur-[2px]"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img 
                        src={performer.image}
                        alt={performer.alt}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/30 to-transparent"></div>
                    <div className="absolute top-8 right-8 w-20 h-20 border border-white/20 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Concert;
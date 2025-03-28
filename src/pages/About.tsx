import React from 'react';
import { Marquee } from '@/components/ui/marquee';
import Spline from '@splinetool/react-spline';

const artImages = [
  {
    url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800",
    alt: "Modern Art 1"
  },
  {
    url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
    alt: "Modern Art 2"
  },
  {
    url: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800",
    alt: "Modern Art 3"
  },
  {
    url: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800",
    alt: "Modern Art 4"
  }
];

const ArtCard = ({ url, alt }: { url: string; alt: string }) => (
  <div className="w-72 h-96 mx-4 overflow-hidden rounded-2xl">
    <img 
      src={url} 
      alt={alt}
      className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity"
    />
  </div>
);

const About = () => {
  return (
    <section className="relative py-32 bg-black min-h-screen overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/r5fzw1iDgVZ2P7gc/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-20">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-white/60 leading-relaxed">
              Zeal It Events has been at the forefront of event management in Qatar and beyond since 2016. 
              We specialize in creating extraordinary experiences that combine creativity, technical excellence, 
              and meticulous attention to detail. Our team of seasoned professionals brings diverse expertise 
              to every project, ensuring each event exceeds expectations and leaves a lasting impression.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-20 space-y-8 md:space-y-0">
          <div className="flex-1 pr-12">
            <p className="text-5xl font-light">8+</p>
            <p className="text-sm text-white/40 mt-2">Years Experience</p>
          </div>
          <div className="flex-1 pr-12">
            <p className="text-5xl font-light">1200+</p>
            <p className="text-sm text-white/40 mt-2">Events Completed</p>
          </div>
          <div className="flex-1 pr-12">
            <p className="text-5xl font-light">10+</p>
            <p className="text-sm text-white/40 mt-2">Countries</p>
          </div>
          <div className="flex-1">
            <p className="text-5xl font-light">450+</p>
            <p className="text-sm text-white/40 mt-2">Happy Clients</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-white/60 mb-8">
              To transform visions into reality through innovative event solutions that create lasting memories 
              and exceed client expectations. We strive to be the leading force in event management, 
              setting new standards for creativity, professionalism, and execution.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-px h-12 bg-hurricane-red"></div>
                <p className="text-lg">Innovation in Event Design</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-px h-12 bg-hurricane-red"></div>
                <p className="text-lg">Sustainable Event Solutions</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-px h-12 bg-hurricane-red"></div>
                <p className="text-lg">Client-Centric Approach</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm bg-black/20">
            <Marquee className="py-8" pauseOnHover>
              {artImages.map((img, index) => (
                <ArtCard key={index} {...img} />
              ))}
            </Marquee>
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
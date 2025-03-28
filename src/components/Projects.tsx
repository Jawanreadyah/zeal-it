import React, { useRef, useState } from 'react';
import { ArrowUpRight, Play, Pause } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Projects = () => {
  const reels = [
    {
      title: "Corporate Summit 2024",
      date: "March 2024",
      video: "https://player.vimeo.com/external/517090081.sd.mp4?s=f657956f45e0e88e0bef0c40c3a8f8f3d9e8d278&profile_id=164&oauth2_token_id=57447761",
      description: "Highlights from our biggest tech conference"
    },
    {
      title: "Royal Wedding",
      date: "February 2024",
      video: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
      description: "A magical celebration at Windsor Castle"
    },
    {
      title: "Fashion Week",
      date: "January 2024",
      video: "https://player.vimeo.com/external/403270650.sd.mp4?s=c3c0273f66e1a39b753cd0d8b7e9cf05e4f7d9fe&profile_id=164&oauth2_token_id=57447761",
      description: "London's premier fashion event"
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/IYl-4fJ6SKFAXTsm/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      {/* More Info Button - Positioned to cover Spline watermark */}
      <div className="absolute bottom-4 right-4 z-50">
        <button className="group flex items-center gap-2 px-8 py-4 bg-black rounded-full border border-white/20 hover:bg-black/80 transition-all">
          <span className="text-sm text-white">More Info</span>
          <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold">Featured Reels</h2>
              <span className="text-hurricane-red/40">/</span>
              <p className="text-white/40">Event highlights</p>
            </div>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-white/60 hover:text-white">
            View All Reels
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reels.map((reel, index) => (
            <ReelCard key={index} {...reel} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReelCard = ({ title, date, video, description }: {
  title: string;
  date: string;
  video: string;
  description: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }}
    >
      <div className="aspect-[9/16] relative overflow-hidden">
        <video
          ref={videoRef}
          src={video}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
        
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
            transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-white/60 text-sm mb-2">{date}</p>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default Projects;
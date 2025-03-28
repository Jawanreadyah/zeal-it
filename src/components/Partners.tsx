import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Partners = () => {
  const partners = [
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mitsubishi_motors_new_logo.svg/800px-Mitsubishi_motors_new_logo.svg.png',
      category: 'Tech'
    },
    {
      name: 'Hilton',
      logo: 'https://lh3.googleusercontent.com/proxy/ICa17kEcy-43WIOBgPMhKU4aMsAxo67B37H5u1oVelO_e38jGncThnwGnaujmzs1YqH3Bky_xivQKk5IPZXWCuaWdOCx9SduGzpusDqEznh-',
      category: 'Hospitality'
    },
    {
      name: 'Samsung',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
      category: 'Technology'
    },
    {
      name: 'Emirates',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg',
      category: 'Aviation'
    },
    {
      name: 'Marriott',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Marriott_Hotels_Logo.svg',
      category: 'Hospitality'
    },
    {
      name: 'Sony',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg',
      category: 'Entertainment'
    },
    {
      name: 'BMW',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
      category: 'Automotive'
    },
    {
      name: 'Mastercard',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
      category: 'Finance'
    },
    {
      name: 'Adobe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg',
      category: 'Software'
    },
    {
      name: 'Rolex',
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Rolex_logo.svg',
      category: 'Luxury'
    },
  ];

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold">Partners</h2>
              <span className="text-hurricane-red">/</span>
              <p className="text-white/40">Companies we partner with</p>
            </div>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-white/60 hover:text-hurricane-red">
            View all Partners
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group relative flex flex-col items-center justify-center h-24"
            >
              <img 
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-12 w-auto object-contain opacity-40 group-hover:opacity-60 transition-opacity filter grayscale"
              />
              <span className="text-sm text-white/20 mt-4">{partner.category}</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 -z-10 rounded-xl transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
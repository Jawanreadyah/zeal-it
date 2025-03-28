import React, { useState } from 'react';
import { GlowingEffect } from './ui/glowing-effect';
import { ArrowUpRight, ChevronDown, ArrowRight } from 'lucide-react';

const Impact = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer comprehensive event management services including corporate events,Live concerts, social gatherings, and technical production. Our team handles everything from venue selection to day-of coordination."
    },
    {
      question: "How long  have you been operating?",
      answer: "We've been operating in Qatar for over 11 years, successfully managing more than 400+ projects and serving 450+ satisfied clients across various industries."
    },
    {
      question: "What is the cost of your services?",
      answer: "Our pricing varies based on the scope and requirements of each event. We provide customized quotes after understanding your specific needs and vision. Contact us for a detailed consultation."
    },
    {
      question: "Can you manage my booking outside or not?",
      answer: "No, we  do not handle events internationally , However Our team has experience managing events locally and can coordinate all aspects of destination events."
    }
  ];

  return (
    <>
      {/* Background Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Image Container */}
            <div className="md:col-span-8">
              <div 
                className="relative h-[80vh] w-full"
                style={{
                  backgroundImage: "url('https://madeinevolve.com/cdn/shop/files/BMI_Shadow.png?v=1724342631&width=3700')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              />
            </div>

            {/* Poster Card */}
            <div className="md:col-span-4 flex items-center">
              <div className="min-h-[14rem] w-full">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black/50 p-6 shadow-sm">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                      <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 p-2">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.04em]">
                          Guaranteed Profits
                        </h3>
                        <h2 className="text-sm leading-[1.125rem] text-white/60">
                          Our proven strategies and expertise ensure successful events that deliver measurable returns on investment.
                        </h2>
                        <button className="mt-6 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
                          <span>Learn More</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with FAQ */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Find answers to common questions about our services</p>
          </div>

          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#FFB800]/20 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#FFB800] transition-transform ${
                      openQuestion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQuestion === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-4 text-white/60 border-t border-white/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-[32px] overflow-hidden mb-16 bg-gradient-to-r from-[#1a1a1a] to-black">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10 p-16 md:p-24">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold mb-6">Ready to work with us?</h2>
                <p className="text-white/60 mb-8">Let's create something extraordinary together. Get in touch with our team to start planning your next event.</p>
                <button className="flex items-center gap-2 px-8 py-4 bg-[#FFB800] text-black rounded-full hover:bg-[#FFB800]/90 transition-all font-medium">
                  GET CONNECTED
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#FFB800]/20 via-white/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#FFB800]/20 via-white/10 to-transparent"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Impact;
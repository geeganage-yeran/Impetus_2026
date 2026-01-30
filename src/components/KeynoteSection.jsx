import React from 'react';
import { Quote, Linkedin, Twitter, Globe } from 'lucide-react';
// Make sure to add your speaker image
import speakerImg from '../assets/speaker.jpg'; 

export default function KeynoteSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Keynote Speaker</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-colors duration-300">
          
          {/* Speaker Image */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl rotate-6 opacity-50"></div>
              <img 
                src={speakerImg} 
                alt="Keynote Speaker" 
                className="relative w-full h-auto rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 object-cover aspect-[4/5]"
              />
            </div>
          </div>

          {/* Speaker Details */}
          <div className="w-full md:w-2/3 text-left">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Prof. John Doe
                </h3>
                <p className="text-blue-400 text-xl font-medium">
                  Professor of Artificial Intelligence
                </p>
                <p className="text-white/60">Stanford University, USA</p>
              </div>
              <Quote className="w-12 h-12 text-blue-500/20 hidden sm:block" />
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              "The future of computing lies not just in processing power, but in the ethical integration of AI into our daily lives. At IMPETUS 2026, we will explore the boundaries of what is possible when humanity and technology converge."
            </p>

            <div className="space-y-2 mb-8">
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Keynote Topic</p>
              <p className="text-xl text-white">"AI for Humanity: Bridging the Digital Divide"</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-green-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
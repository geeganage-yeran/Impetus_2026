import React from 'react';
import { Building2, Globe, GraduationCap, Users } from 'lucide-react';
// Make sure to add your image to the assets folder
import universityImg from '../assets/uni.jpg'; 

export default function AboutSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div data-aos="fade-right" className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              {/* Image Placeholder - User to ensure file exists in assets */}
              <img 
                src={universityImg} 
                alt="Uva Wellassa University" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002b4b]/80 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Badulla, Sri Lanka
                </p>
              </div>
            </div>
            
            {/* Decorative background blob */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Content Side */}
          <div data-aos="fade-left" className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#005596] rounded-full font-semibold text-sm mb-6">
              <Building2 className="w-4 h-4" />
              About The Organizers
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Fostering Excellence in <span className="text-[#005596]">Science & Technology</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              IMPETUS 2026 is proudly organized by the <span className="font-semibold text-gray-900">Faculty of Applied Sciences, Uva Wellassa University</span> in strategic collaboration with the <span className="font-semibold text-gray-900">IEEE Student Branch Uva Wellassa University</span>.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-[#005596]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Academic Excellence</h3>
                  <p className="text-gray-600 text-sm">Driven by the vision of the Faculty of Applied Sciences to be a center of excellence in value addition to national resources.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-[#005596]">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Global Standards</h3>
                  <p className="text-gray-600 text-sm">Empowered by IEEE's global network to bring international standards and technical innovation to the forefront.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper icon for this file
function MapPin({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
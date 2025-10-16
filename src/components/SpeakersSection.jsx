import React from 'react';
import { Video, Sparkles, Users, Calendar } from 'lucide-react';

const tracks = [
  { 
    name: 'Computing and Software Technologies',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'hover:border-purple-500',
    badgeColor: 'bg-purple-100 text-purple-700'
  },
  { 
    name: 'Data Science and Artificial Intelligence',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'hover:border-blue-500',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  { 
    name: 'Robotics, Mechatronics, and Embedded Systems',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'hover:border-orange-500',
    badgeColor: 'bg-orange-100 text-orange-700'
  },
  { 
    name: 'Industrial Information Systems & Smart Technologies',
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-50',
    borderColor: 'hover:border-green-500',
    badgeColor: 'bg-green-100 text-green-700'
  },
  { 
    name: 'Science and Technology',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'hover:border-indigo-500',
    badgeColor: 'bg-indigo-100 text-indigo-700'
  },
];

export default function SpeakersSection() {
  return (
    <section className="py-10 sm:py-15 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#3377ab] text-white rounded-full mb-6 shadow-lg">
            <Video className="w-4 h-4" />
            <span className="text-sm font-semibold">Hybrid Mode: In-Person & Virtual</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 font-semibold">
            Keynote Speakers & Sessions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join distinguished speakers and experts from around the world in exploring the latest advances in technology and innovation.
          </p>
        </div>

        {/* Keynote Announcement Card */}
        <div  data-aos="fade-up" className="relative overflow-hidden p-8 sm:p-12 bg-gradient-to-br from-[#005596] to-[#3377ab] rounded-2xl mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Keynote Speakers</h3>
            <p className="text-xl sm:text-2xl mb-4 font-semibold text-white/95">
              Announcements Coming Soon
            </p>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              We are honored to host renowned researchers and industry leaders who will share their insights on ethical innovation and technological advancement.
            </p>
          </div>
        </div>

        {/* Technical Sessions */}
        <div data-aos="fade-up">
          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-4xl text-gray-900 font-light mb-3">Technical Sessions</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden p-6 bg-white border-2 border-gray-200 rounded-xl ${track.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block ${track.badgeColor} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide`}>
                      Track {index + 1}
                    </span>
                    <div className={`w-10 h-10 ${track.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Calendar className={`w-5 h-5 ${track.badgeColor.split(' ')[1]}`} />
                    </div>
                  </div>
                  
                  <h4 className="text-gray-900 text-base sm:text-lg font-semibold leading-snug group-hover:text-blue-600 transition-colors duration-300">
                    {track.name}
                  </h4>
                  
                  {/* Decorative element */}
                  <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${track.color} rounded-full transition-all duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Calendar, CheckCircle2, Star } from 'lucide-react';

const dates = [
  { day: '06', month: 'Feb 2026', label: 'Call for Paper', status: 'upcoming' },
  { day: '30', month: 'Mar 2026', label: 'Full Paper Deadline', status: 'upcoming' },
  { day: '05', month: 'Apr 2026', label: 'Early Bird Opens', sub: 'Until May 10', status: 'upcoming' },
  { day: '27', month: 'Apr 2026', label: 'Author Notification', status: 'upcoming' },
  { day: '27', month: 'Apr 2026', label: 'Regular Reg Opens', sub: 'Until May 20', status: 'upcoming' },
  { day: '10', month: 'May 2026', label: 'Camera Ready', status: 'upcoming' },
  { day: '27', month: 'May 2026', label: 'Symposium Date', highlight: true, status: 'upcoming' },
];

export default function ImportantDates() {
  return (
    <section className="py-20 relative bg-[#001e35] overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Important Dates
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-4"></div>
          <p className="text-blue-200 text-lg">
            Don't miss a deadline. Keep track of your submission journey.
          </p>
        </div>

        {/* Timeline Scroll Container */}
        <div className="relative">
          {/* Connecting Line (Absolute) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-8 rounded-full"></div>
          
          <div className="overflow-x-auto pb-12 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing">
            <div className="flex justify-between items-start min-w-[1100px] px-4 md:px-10 gap-4">
              
              {dates.map((item, index) => (
                <div key={index} className="relative group flex flex-col items-center flex-1">
                  
                  {/* Date Card (Top) */}
                  <div className={`
                    relative mb-8 w-32 sm:w-36 p-4 rounded-2xl text-center border transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-2xl
                    ${item.highlight 
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 shadow-lg shadow-amber-500/20' 
                      : 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-blue-400/50 hover:shadow-blue-500/20'
                    }
                  `}>
                    {/* Icon for Highlighted Item */}
                    {item.highlight && (
                      <div className="absolute -top-3 -right-3 bg-white text-orange-500 p-1.5 rounded-full shadow-md animate-bounce">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    )}

                    <span className={`block text-4xl font-extrabold mb-1 ${item.highlight ? 'text-white' : 'text-white'}`}>
                      {item.day}
                    </span>
                    <span className={`block text-sm font-bold uppercase tracking-wider ${item.highlight ? 'text-amber-100' : 'text-blue-300'}`}>
                      {item.month}
                    </span>
                  </div>

                  {/* Connector Dot (Middle) */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 -mt-12 md:-mt-0 mb-6 transition-all duration-300">
                    <div className={`
                      w-4 h-4 rounded-full transition-all duration-500 group-hover:scale-150
                      ${item.highlight 
                        ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)] ring-4 ring-amber-500/20' 
                        : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] ring-4 ring-[#001e35]'
                      }
                    `}></div>
                  </div>

                  {/* Label (Bottom) */}
                  <div className="text-center transition-colors duration-300">
                    <h3 className={`font-bold text-lg leading-tight mb-1 ${item.highlight ? 'text-amber-400' : 'text-white/80 group-hover:text-white'}`}>
                        {item.label}
                    </h3>
                    {item.sub && (
                        <p className="text-xs text-blue-300/80 uppercase tracking-wide">{item.sub}</p>
                    )}
                  </div>
                  
                  {/* Status Text (Optional - can comment out if too cluttered) */}
                  {/* <span className="mt-2 text-xs font-medium px-2 py-0.5 rounded-full border text-gray-500 border-gray-700 bg-gray-800/50">
                    {item.status}
                  </span> */}

                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
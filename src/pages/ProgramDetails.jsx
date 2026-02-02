import React from 'react';
import { Clock, Users, Mic, Coffee, Utensils } from 'lucide-react';

export default function ProgramDetails() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#002b4b] text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Details</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore the comprehensive schedule for IMPETUS 2026.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100 min-h-[400px]">

          {/* Conference Schedule */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-[#005596] pl-4 flex items-center justify-between">
              <span>Conference Agenda</span>
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">May 27, 2026</span>
            </h2>
            
            <div className="space-y-6 relative">
              {/* Vertical Line Connector */}
              <div className="absolute left-[125px] top-4 bottom-4 w-0.5 bg-gray-100 hidden sm:block"></div>

              <ScheduleItem
                time="08:00 AM - 09:00 AM"
                title="Registration"
                icon={Users}
              />
              <ScheduleItem
                time="09:00 AM - 10:30 AM"
                title="Inauguration Ceremony"
                icon={Mic}
                highlight
              />
              <ScheduleItem
                time="10:30 AM - 11:00 AM"
                title="Refreshments"
                icon={Coffee}
              />
              <ScheduleItem
                time="11:00 AM - 01:00 PM"
                title="Panel Discussion"
                icon={Users}
                highlight
              />
              <ScheduleItem
                time="01:00 PM - 02:00 PM"
                title="Lunch"
                icon={Utensils}
              />
              <ScheduleItem
                time="02:00 PM - 05:00 PM"
                title="Technical Sessions"
                icon={Users}
                highlight
              />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Helper Component for Schedule Items
function ScheduleItem({ time, title, icon: Icon, highlight }) {
  return (
    <div className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl transition-all duration-300 ${highlight ? 'bg-blue-50/50 border border-blue-100 shadow-sm' : 'bg-white hover:bg-gray-50 border border-transparent'}`}>
      <div className="min-w-[140px] font-bold text-[#005596] flex items-center gap-2 bg-white/80 px-3 py-1 rounded-md shadow-sm border border-gray-100 sm:bg-transparent sm:shadow-none sm:border-0 sm:p-0">
        <Clock className="w-4 h-4" /> 
        <span className="text-sm sm:text-base">{time}</span>
      </div>
      
      <div className="flex-grow">
        <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
      </div>
      
      {Icon && (
        <div className={`p-2 rounded-lg ${highlight ? 'bg-blue-100 text-[#005596]' : 'bg-gray-100 text-gray-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
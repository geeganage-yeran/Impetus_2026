import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Mic, Coffee, Utensils } from 'lucide-react';
import speakerImg from '../assets/speaker.jpg'; // Replace with actual keynote speaker image

export default function ProgramDetails() {
  const [activeTab, setActiveTab] = useState('Conference');

  const panelists = [
    {
      name: "Dr. Aruna Perera",
      role: "Senior Lecturer - Computer Science",
      org: "Uva Wellassa University",
      image: "https://ui-avatars.com/api/?name=Aruna+Perera&background=0D8ABC&color=fff"
    },
    {
      name: "Ms. Sarah Johnson",
      role: "Lead Sustainability Architect",
      org: "Microsoft Asia Pacific",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=6b21a8&color=fff"
    },
    {
      name: "Mr. David Lee",
      role: "Director of IoT Innovation",
      org: "TechCorp Global",
      image: "https://ui-avatars.com/api/?name=David+Lee&background=c026d3&color=fff"
    },
    {
      name: "Dr. Emily Carter",
      role: "Renewable Energy Researcher",
      org: "IEEE Power & Energy Society",
      image: "https://ui-avatars.com/api/?name=Emily+Carter&background=059669&color=fff"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#002b4b] text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Details</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore the comprehensive schedule for IMPETUS 2026, featuring keynote speeches, expert panel discussions, and technical sessions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Conference', 'keynote', 'panel'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                ? 'bg-[#005596] text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {tab === 'Conference' ? 'Conference Schedule' : tab === 'keynote' ? 'Keynote Speech' : 'Panel Discussion'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100 min-h-[400px]">

          {/* Tab 1: Conference Schedule */}
          {activeTab === 'Conference' && (
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
                  //location="Main Hall Lobby"
                  icon={Users}
                />
                <ScheduleItem
                  time="09:00 AM - 10:30 AM"
                  title="Inauguration Ceremony"
                  //location="Main Auditorium"
                  icon={Mic}
                  highlight
                />
                <ScheduleItem
                  time="10:30 AM - 11:00 AM"
                  title="Refreshments"
                  //location="Cafeteria Area"
                  icon={Coffee}
                />
                <ScheduleItem
                  time="11:00 AM - 01:00 PM"
                  title="Panel Discussion"
                  //location="Main Auditorium"
                  icon={Users}
                  highlight
                />
                <ScheduleItem
                  time="01:00 PM - 02:00 PM"
                  title="Lunch"
                  //location="University Cafeteria"
                  icon={Utensils}
                />
                <ScheduleItem
                  time="02:00 PM - 05:00 PM"
                  title="Technical Sessions"
                  //location="Lecture Halls A, B, C & D"
                  icon={Users}
                  highlight
                />
              </div>
            </div>
          )}

          {/* Tab 2: Keynote Details */}
          {activeTab === 'keynote' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Speaker Image Column */}
                <div className="w-full md:w-1/3">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                    <img
                      src={speakerImg}
                      alt="Keynote Speaker"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Optional: subtle overlay */}
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300"></div>
                  </div>
                </div>

                {/* Speaker Info Column */}
                <div className="w-full md:w-2/3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-[#005596] rounded-full text-xs font-bold mb-4">
                    Keynote Session
                  </span>

                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Prof. John Doe</h2>
                  <p className="text-lg text-[#005596] font-medium mb-1">Professor of AI</p>
                  <p className="text-gray-500 mb-6">Stanford University, USA</p>

                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Topic: AI for Humanity</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    An in-depth look at how artificial intelligence is reshaping healthcare, agriculture, and education in developing nations. This session will cover ethical considerations and future trajectories of generative AI models.
                  </p>
                </div>
              </div>
            </div>
          )}


          {/* Tab 3: Panel Discussion */}
          {activeTab === 'panel' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  11:00 AM - 01:00 PM
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Topic: The Future of Sustainable Tech
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A thought-provoking debate on how AI, IoT, and Cloud Computing can drive global sustainability goals while navigating ethical boundaries.
                </p>
              </div>

              {/* Grid updated to lg:grid-cols-4 for 4 items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {panelists.map((member, index) => (
                  <div
                    key={index}
                    className="group relative bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Area */}
                    <div className="w-24 h-24 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#005596] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {member.role}
                      </p>
                      <div className="inline-flex items-center justify-center px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                        <p className="text-xs font-semibold text-blue-600">
                          {member.org}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
function ScheduleItem({ time, title, location, icon: Icon, highlight }) {
  return (
    <div className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl transition-all duration-300 ${highlight ? 'bg-blue-50/50 border border-blue-100 shadow-sm' : 'bg-white hover:bg-gray-50 border border-transparent'}`}>
      <div className="min-w-[140px] font-bold text-[#005596] flex items-center gap-2 bg-white/80 px-3 py-1 rounded-md shadow-sm border border-gray-100 sm:bg-transparent sm:shadow-none sm:border-0 sm:p-0">
        <Clock className="w-4 h-4" /> 
        <span className="text-sm sm:text-base">{time}</span>
      </div>
      
      <div className="flex-grow">
        <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
          {/* <MapPin className="w-3 h-3" /> {location} */}
        </div>
      </div>
      
      {Icon && (
        <div className={`p-2 rounded-lg ${highlight ? 'bg-blue-100 text-[#005596]' : 'bg-gray-100 text-gray-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
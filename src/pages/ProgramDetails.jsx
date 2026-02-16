import React, { useState } from 'react';
import { Clock, Users, Mic, Coffee, Utensils, MapPin } from 'lucide-react';
import speakerImg from '../assets/speaker.jpg';
import panelm1 from '../../public/panelDis/Picture1.png'

export default function ProgramDetails() {
  const [activeTab, setActiveTab] = useState('Conference');

  // Updated Panelists Data
  const panelists = [
    {
      name: "Snr. Prof. R.A.R.C. Gopura",
      role: "Dean, Faculty of Graduate Studies",
      org: "University of Moratuwa",
      image: "/panelDis/Picture1.png"
    },
    {
      name: "Prof. S. Vasanthapriyan",
      role: "Dean, Faculty of Computing",
      org: "Sabaragamuwa University of Sri Lanka",
      image: "/panelDis/Picture2.png"
    },
    {
      name: "Prof. Prasad M. Jayaweera",
      role: "Dean, Faculty of Computing",
      org: "University of Sri Jayewardenepura",
      image: "/panelDis/Picture3.png"
    },
    {
      name: "Prof. Roshan G. Ragel",
      role: "Professor, Dept. of Computer Engineering",
      org: "University of Peradeniya",
      image: "/panelDis/Picture4.jpg"
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
              {tab === 'Conference' ? 'Conference Schedule' : tab === 'keynote' ? 'Keynote Speaker' : 'Panel Discussion'}
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
                <div className="absolute left-[188px] top-4 bottom-4 w-0.5 bg-gray-100 hidden sm:block"></div>

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
          )}

          {/* Tab 2: Keynote Details */}
          {activeTab === 'keynote' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-10 items-center">

                {/* Speaker Image Column */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group w-full max-w-sm">
                    <img
                      src={speakerImg}
                      alt="Prof. Brian Helenbrook"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Brian+Helenbrook&size=500&background=0D8ABC&color=fff" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white font-medium">Keynote Speaker</span>
                    </div>
                  </div>
                </div>

                {/* Speaker Info Column */}
                <div className="w-full md:w-2/3">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-[#005596] rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
                      Keynote Speaker
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Prof. Brian Helenbrook</h2>
                    <p className="text-lg text-[#005596] font-medium mb-1">Paynter-Krigman Endowed Professor in Engineering Science Simulation</p>
                    <p className="text-gray-500 font-medium">Associate Dean of the Graduate School, Clarkson University, USA</p>
                  </div>

                  <div className="prose max-w-none text-gray-600 leading-relaxed">
                    <p>
                      Prof. Helenbrook’s research in numerical simulation for fluid flows and heat transfer exemplifies responsible innovation, demonstrating how advanced computational methods address real-world engineering challenges. His commitment to mentoring emerging researchers and interdisciplinary approach aligns perfectly with IMPETUS 2026’s mission to cultivate ethical innovation.
                    </p>
                  </div>
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

              {/* Panelists Grid */}
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
                      <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#005596] transition-colors leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2 mt-2">
                        {member.role}
                      </p>
                      <div className="inline-flex items-center justify-center px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                        <p className="text-xs font-medium text-gray-600 text-center">
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
      <div className="min-w-[160px] font-bold text-[#005596] flex items-center gap-2 bg-white/80 px-3 py-1 rounded-md shadow-sm border border-gray-100 sm:bg-transparent sm:shadow-none sm:border-0 sm:p-0">
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
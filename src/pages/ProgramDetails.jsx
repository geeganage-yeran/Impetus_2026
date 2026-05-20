import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Mic, 
  Coffee, 
  Utensils, 
  MapPin, 
  Calendar, 
  Target, 
  Award, 
  CheckCircle2,
  BookOpen,
  Briefcase,
  Sparkles
} from 'lucide-react';
import speakerImg from '../assets/speaker.jpg';

export default function ProgramDetails() {
  // Set the new tab as the default active tab
  const [activeTab, setActiveTab] = useState('pre-conference');

  // Existing Panelists Data
  const panelists = [
    {
      name: "Prof. S. Vasanthapriyan",
      role: "Dean, Faculty of Computing",
      org: "Sabaragamuwa University of Sri Lanka",
      image: "/panelDis/Picture2.png"
    },
    {
      name: "Prof. Roshan G. Ragel",
      role: "Professor, Dept. of Computer Engineering",
      org: "University of Peradeniya",
      image: "/panelDis/Picture4.jpg"
    },
    {
      name: "Prof. Pradeep Abeygunawardhana",
      role: "Dean, Faculty of Computing",
      org: "Sri Lanka Institute of Information Technology",
      image: "/panelDis/Picture1.jpeg"
    },
    {
      name: "Dr. D.R. Welikanna",
      role: "Senior Lecturer, Faculty of Geomatics",
      org: "Sabaragamuwa University of Sri Lanka",
      image: "/panelDis/Picture3.jpeg"
    },
    
  ];

  // Workshop Resource Panel Data
  const resourcePanel = [
    { name: "Prof. Roshan G. Ragel", role: "Professor, Computer Engineering | Consultant CEO, LEARN", org: "University of Peradeniya" },
    { name: "Dr. Asitha Bandaranayake", role: "Head/Senior Lecturer, Computer Engineering | Consultant CTO, LEARN", org: "University of Peradeniya" },
    { name: "Prof. Chalinda Beneragama", role: "Director, Academic Affairs Division", org: "University of Peradeniya" },
    { name: "Dr. Pramila Gamage", role: "Director, Centre for Quality Assurance", org: "University of Peradeniya" },
    { name: "Ms. Andrea Rajiah", role: "Senior Admin Executive cum PA", org: "LEARN" },
    { name: "Ms. Gayani Herath", role: "Financial Accountant", org: "LEARN" }
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="bg-[#002b4b] text-white py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Details</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Explore the comprehensive schedule for IMPETUS 2026, featuring keynote speeches, expert panel discussions, and technical sessions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['pre-conference', 'Conference', 'keynote', 'panel'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                ? 'bg-[#005596] text-white shadow-lg shadow-blue-900/20 transform scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-blue-300'
                }`}
            >
              {tab === 'pre-conference' ? 'Pre-Conference Workshop' : 
               tab === 'Conference' ? 'Conference Schedule' : 
               tab === 'keynote' ? 'Keynote Speaker' : 'Panel Discussion'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-6 sm:p-12 border border-gray-100 min-h-[400px]">

          {/* TAB 1: PRE-CONFERENCE WORKSHOPS (NEW TAB) */}
          {activeTab === 'pre-conference' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-[#005596] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Special Event
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  AI4ALL: AI Fundamentals Workshops
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Conducted by <strong className="text-[#005596]">LEARN</strong> (Lanka Education and Research Network) in collaboration with the <strong className="text-[#005596]">Faculty of Applied Sciences, Uva Wellassa University</strong>.
                </p>
              </div>

              {/* Uniform Workshop Cards Grid (3 Columns, Equal Height) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
                
                {/* Workshop 1: Students (Dynamic Overlapping Flyers) */}
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group relative">
                  {/* Cinematic Flyer Showcase Header */}
                  <div className="h-72 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img src="/workshop1.jpeg" alt="Background Blur" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40"></div>
                    
                    <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-blue-700 shadow-md uppercase tracking-widest border border-white/50">Workshop 1</div>
                    
                    {/* Overlapping Flyer Stack */}
                    <div className="absolute inset-0 flex items-center justify-center pt-8 pb-4">
                        {/* Back Flyer (Group 2) */}
                        <img src="/workshop1.1.jpeg" alt="Group 2 Flyer" className="absolute h-[85%] w-auto object-contain rounded-lg shadow-2xl border-2 border-white/20 transform rotate-6 translate-x-4 group-hover:rotate-12 group-hover:translate-x-12 transition-all duration-500 z-10" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800" }} />
                        {/* Front Flyer (Group 1) */}
                        <img src="/workshop1.jpeg" alt="Group 1 Flyer" className="absolute h-[90%] w-auto object-contain rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-2 border-white/20 transform -rotate-3 -translate-x-2 group-hover:-rotate-6 group-hover:-translate-x-8 transition-all duration-500 z-20" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" }} />
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-[#005596] transition-colors leading-tight">AI4ALL for Students</h3>
                    <p className="text-[11px] font-bold text-blue-600 mb-4 uppercase tracking-wider bg-blue-50 inline-block px-2.5 py-1 rounded-md border border-blue-100 w-fit">Fundamentals & Ethics</p>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-1 flex items-start gap-2">
                      <Target className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Interactive sessions on AI fundamentals, ethical applications, and hands-on learning.</span>
                    </p>
                    
                    <div className="space-y-1.5 mb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-700"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Learn with university lecturers</div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-700"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Certificates awarded</div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 mt-auto">
                      <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Schedule</h4>
                      <p className="text-xs font-bold text-blue-900 mb-1.5">Grp I: <span className="font-medium text-gray-700">May 26 (9:00 am to 12:00 pm) & May 27 (9:00 am to 10:30 am & 01:30 pm to 2:30 pm)</span></p>
                      <p className="text-xs font-bold text-blue-900">Grp II: <span className="font-medium text-gray-700">May 26 (1:00 pm to 4:00 pm) & May 27 (11:00 am to 12:30 pm & 03:00 pm to 4:00 pm)</span></p>
                    </div>
                  </div>
                </div>

                {/* Workshop 2: Admin Staff */}
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group">
                  <div className="h-72 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img src="/workshop2.jpeg" alt="Background Blur" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40"></div>
                    
                    <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-purple-700 shadow-md uppercase tracking-widest border border-white/50">Workshop 2</div>
                    
                    <div className="absolute inset-0 flex items-center justify-center pt-8 pb-4">
                        <img src="/workshop2.jpeg" alt="GenAI for Staff Flyer" className="h-[95%] w-auto object-contain rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-2 border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 z-20" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" }} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-purple-600 transition-colors leading-tight">GenAI for Empowerment</h3>
                    <p className="text-[11px] font-bold text-purple-600 mb-4 uppercase tracking-wider bg-purple-50 inline-block px-2.5 py-1 rounded-md border border-purple-100 w-fit">Admin & Operational Staff</p>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-1 flex items-start gap-2">
                      <Target className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Enable staff to understand AI concepts and use tools to improve office productivity and routine tasks ethically.</span>
                    </p>
                    
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 mt-auto">
                      <h4 className="text-[10px] font-black text-purple-800 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Schedule</h4>
                      <p className="text-xs font-bold text-purple-900 mb-1.5">Date: <span className="font-medium text-gray-700">May 26, 2026</span></p>
                      <p className="text-xs font-bold text-purple-900">Time: <span className="font-medium text-gray-700">9:00 AM - 4:00 PM</span></p>
                    </div>
                  </div>
                </div>

                {/* Workshop 3: Education */}
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group">
                  <div className="h-72 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img src="/workshop3.jpeg" alt="Background Blur" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40"></div>
                    
                    <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-emerald-700 shadow-md uppercase tracking-widest border border-white/50">Workshop 3</div>
                    
                    <div className="absolute inset-0 flex items-center justify-center pt-8 pb-4">
                        <img src="/workshop3.jpeg" alt="GenAI for Education Flyer" className="h-[95%] w-auto object-contain rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-2 border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 z-20" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524169358666-79f22534bc6e?auto=format&fit=crop&q=80&w=800" }} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors leading-tight">GenAI for Education</h3>
                    <p className="text-[11px] font-bold text-emerald-600 mb-4 uppercase tracking-wider bg-emerald-50 inline-block px-2.5 py-1 rounded-md border border-emerald-100 w-fit">Education & Research</p>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-1 flex items-start gap-2">
                      <Target className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Enhance participants’ understanding of Generative AI use cases, integrations, and best practices in modern research.</span>
                    </p>
                    
                    <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 mt-auto">
                      <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Schedule</h4>
                      <p className="text-xs font-bold text-emerald-900 mb-1.5">Date: <span className="font-medium text-gray-700">May 26, 2026</span></p>
                      <p className="text-xs font-bold text-emerald-900">Time: <span className="font-medium text-gray-700">1:30 PM - 4:30 PM</span></p>
                    </div>
                  </div>
                </div>

              </div>

              {/* --- 3. Resource Panel Section --- */}
              <div className="bg-gradient-to-br from-[#002b4b] to-[#00447a] rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-[#005596]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400 opacity-10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                      <BookOpen className="w-8 h-8 text-blue-300" />
                      Resource Panel
                    </h3>
                    <p className="text-blue-200 mt-2 font-medium">Esteemed experts guiding the pre-conference workshops.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                  {resourcePanel.map((member, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 flex flex-col justify-between group">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-400/30 group-hover:scale-110 group-hover:bg-blue-500/40 transition-all">
                          <Users className="w-6 h-6 text-blue-100" />
                        </div>
                        <h4 className="font-bold text-white text-lg mb-1 leading-tight">{member.name}</h4>
                        <p className="text-sm text-blue-200 font-medium mb-4 leading-snug">{member.role}</p>
                      </div>
                      <p className="text-[11px] uppercase tracking-widest text-blue-300 font-bold bg-black/20 inline-block px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                        {member.org}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAIN CONFERENCE SCHEDULE */}
          {activeTab === 'Conference' && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-[#005596] pl-4 flex items-center justify-between">
                  <span>Conference Agenda</span>
                  <span className="text-sm font-bold text-[#005596] bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full shadow-sm">May 27, 2026</span>
                </h2>

                <div className="space-y-6 relative">
                  {/* Vertical Line Connector */}
                  <div className="absolute left-[188px] top-4 bottom-4 w-0.5 bg-blue-100 hidden sm:block"></div>

                  <ScheduleItem time="08:00 AM - 09:00 AM" title="Registration" icon={Users} />
                  <ScheduleItem time="09:00 AM - 10:30 AM" title="Inauguration Ceremony" icon={Mic} highlight />
                  <ScheduleItem time="10:30 AM - 11:00 AM" title="Refreshments" icon={Coffee} />
                  <ScheduleItem time="11:00 AM - 01:00 PM" title="Panel Discussion" icon={Users} highlight />
                  <ScheduleItem time="01:00 PM - 02:00 PM" title="Lunch" icon={Utensils} />
                  <ScheduleItem time="02:00 PM - 05:00 PM" title="Technical Sessions" icon={Users} highlight />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Keynote Details */}
          {activeTab === 'keynote' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-10 items-center">

                {/* Speaker Image Column */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group w-full max-w-sm">
                    <img
                      src={speakerImg}
                      alt="Prof. Brian Helenbrook"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Brian+Helenbrook&size=500&background=0D8ABC&color=fff" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002b4b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white font-bold tracking-wider uppercase text-sm">Keynote Speaker</span>
                    </div>
                  </div>
                </div>

                {/* Speaker Info Column */}
                <div className="w-full md:w-2/3">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 text-[#005596] rounded-full text-xs font-bold mb-4 uppercase tracking-wider shadow-sm">
                      Keynote Speaker
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">Prof. Brian Helenbrook</h2>
                    <p className="text-lg text-[#005596] font-bold mb-1">Paynter-Krigman Endowed Professor in Engineering Science Simulation</p>
                    <p className="text-gray-500 font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" /> Associate Dean of the Graduate School, Clarkson University, USA
                    </p>
                  </div>

                  <div className="prose max-w-none text-gray-600 leading-relaxed text-lg bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner">
                    <p>
                      Prof. Helenbrook’s research in numerical simulation for fluid flows and heat transfer exemplifies responsible innovation, demonstrating how advanced computational methods address real-world engineering challenges. His commitment to mentoring emerging researchers and interdisciplinary approach aligns perfectly with IMPETUS 2026’s mission to cultivate ethical innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Panel Discussion */}
          {activeTab === 'panel' && (
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-[#005596] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                  <Clock className="w-3.5 h-3.5" /> 11:00 AM - 01:00 PM
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                  The Future of Sustainable Tech
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  A thought-provoking debate on how AI, IoT, and Cloud Computing can drive global sustainability goals while navigating ethical boundaries.
                </p>
              </div>

              {/* Panelists Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {panelists.map((member, index) => (
                  <div
                    key={index}
                    className="group relative bg-white p-6 border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center"
                  >
                    {/* Image Area */}
                    <div className="w-32 h-32 mx-auto mb-5 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=f3f4f6&color=002b4b` }}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center flex-1 flex flex-col">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#005596] transition-colors leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3 mt-1 line-clamp-2">
                        {member.role}
                      </p>
                      <div className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 w-full">
                        <p className="text-[11px] font-bold text-gray-500 text-center leading-snug uppercase tracking-wider">
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
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Helper Component for Schedule Items
function ScheduleItem({ time, title, icon: Icon, highlight }) {
  return (
    <div className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${highlight ? 'bg-blue-50/60 border border-blue-100 shadow-sm' : 'bg-white hover:bg-gray-50 border border-gray-100'}`}>
      <div className="min-w-[170px] font-bold text-[#005596] flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 sm:bg-transparent sm:shadow-none sm:border-0 sm:p-0">
        <Clock className="w-4 h-4 text-blue-400 shrink-0" />
        <span className="text-sm sm:text-[15px] tracking-wide whitespace-nowrap">{time}</span>
      </div>

      <div className="flex-grow">
        <h4 className={`font-bold text-lg ${highlight ? 'text-[#002b4b]' : 'text-gray-900'}`}>{title}</h4>
      </div>

      {Icon && (
        <div className={`p-3 rounded-xl shrink-0 ${highlight ? 'bg-[#005596] text-white shadow-md shadow-blue-900/20' : 'bg-gray-100 text-gray-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
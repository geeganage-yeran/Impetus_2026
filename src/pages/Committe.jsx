import React from 'react';
import { User, Award, Users, Star, Layers, Globe, PenTool, DollarSign, Truck, Megaphone, Monitor, Layout, Coffee } from 'lucide-react';

// --- Data Configuration ---

const advisoryCommittee = [
  { name: "Prof. Amila Sandaruwan Ratnayake", role: "Dean, Faculty of Applied Sciences", dept: "Uva Wellassa University", img: "/committee/amila.png" },
  { name: "Assoc. Prof. A. P. Henagamage", role: "Head, Dept. of Science & Technology", dept: "Uva Wellassa University", img: "/committee/henagama.jpg" },
  { name: "Dr. J. T. Cooray", role: "Head, Dept. of Applied Earth Sciences", dept: "Uva Wellassa University", img: "/committee/cooray.jpg" },
  { name: "Ms. S. D. H. S. Wickramarathne", role: "Head, Dept. of Computer Science & Informatics", dept: "Uva Wellassa University", img: "/committee/harshani.jpg" },
  { name: "Prof. K. W. S. N. Kumari", role: "Counselor", dept: "IEEE Uva Wellassa University Student Branch", img: "/committee/kumari.jpeg" },
  { name: "Prof. E. M. U. W. J. B. Ekanayake", role: "Prof, Dept. of Computer Science & Informatics", dept: "Uva Wellassa University", img: "/committee/ekanayake.jpg" },
];

const conferenceCommittee = [
  { role: "Conference Chair", name: "Prof. K. W. S. N. Kumari" },
  { role: "Conference Co-Chair", name: "Dr. A.R.P.C.C.J. Amarasinghe" },
  { role: "Conference Secretary", name: "Ms. R.P. Abeywardhana" },
  { role: "Conference Co-Secretary", name: "Mr. V. Thanujan" },
  { role: "Technical Programme Chair", name: "Prof. E.M.U.W.J.B. Ekanayake" },
  { role: "International Relations Chair", name: "Dr. M. A. R. L. Samaraweera" },
  { role: "Editor-in-Chief", name: "Dr. H.M.S.N. Ariyadasa" },
  { role: "Co-Editor-in-Chief & Publication Chair", name: "Dr. (Eng.) M.N.P. Dushyantha" },
  { role: "Finance Chair", name: "Ms. C.S.D. Ellepola" },
  { role: "Finance Co-Chair", name: "Mr. A.M.P. Chandrasiri" },
  { role: "Logistics Chair", name: "Mr. W.A.P.Weerakoon" },
  { role: "Logistics Co-Chair", name: "Ms. K.A.A. Chathurangi" },
  { role: "Publicity Chair", name: "Mr. H.P.D.P. Pathirana" },
  { role: "Publicity Co-Chair", name: "Mr. K.A.P.A. Rathnathilake" },
  { role: "Registration Chair", name: "Dr. J.A.V.M.K. Jayakody" },
  { role: "Registration Co-Chair", name: "Ms. M.P.A.M. Rathnakumara" },
  { role: "Webmaster Chair", name: "Mr. A.M.B. Ratnayake" },
  { role: "Webmaster Co-Chair", name: "Mr. U.E. Ranasooriya" },
  { role: "Panel Discussion Chair", name: "Dr. T. H. N. G. Amaraweera" },
  { role: "Panel Discussion Co-Chair", name: "Ms. R.M.T. Lakmali" },
  { role: "Designing and Printing Chair", name: "Dr. M.M.S.N. Premetilake" },
  { role: "Designing and Printing Co-Chair", name: "Ms. B.C. Liyanapathirana" },
  { role: "Hall Arrangements Chair", name: "Dr. Dilan Karunathilaka" },
  { role: "Hall Arrangements Co-Chair", name: "Mr. R.D.A.U. Pallegama" },
  { role: "Hospitality Co-Chair", name: "Ms. K.W.H.M.I.M. Hearth" },
  { role: "Hospitality Co-Chair", name: "Ms. Y. Milani" },
];

const technicalTracks = [
  { track: "Computing and Industrial Information Systems", chair: "Dr. S.H.D. Senanayake", coChair: "Dr. P.N.S. Kumara" },
  { track: "Data Science and Artificial Intelligence", chair: "Dr. Dias", coChair: "Dr. K.P.P.S. Pathirana" },
  { track: "Robotics, Mechatronics, and Embedded Systems", chair: "Dr. R.M.T.C.B. Ekanayake", coChair: "Ms. D.P. Jayathunga" },
  { track: "Science and Technology", chair: "Dr. D.J. Kottehewa", coChair: "Mr. Roshan Thilakarathna" },
];

const organizingCommittee = [
  { name: "Mr. W. D. V. A. Weerasinghe", role: "Student Branch Chair" },
  { name: "Mr. C. C. R. Jayawardana", role: "Chair" },
  { name: "Mr. P. N. N. Peiris", role: "Co-Chair" },
  { name: "Ms. W. M. W. N. Weerakon", role: "Secretary" },
  { name: "Mr. R. P. N. S. Randunu", role: "Junior Treasurer" },
  { name: "Mr. G. A. N. L. Gajaweera", role: "Logistics Chair" },
  { name: "Ms. D. L. N. Nawanjana", role: "Publicity Chair" },
  { name: "Mr. H. M. V. N. Kumarasiri", role: "Design Chair" },
  { name: "Ms. R. I. M. Panamaldeniye", role: "Industry Liaison & Sponsorship Chair" },
  { name: "Mr. G. Y. L. M. Nandasiri", role: "Web & IT Chair" },
  { name: "Mr. W. H. G. L. Bimsara", role: "Operational Support Chair" },
];

// --- 1. Advisory Section (Images + Details) ---
const AdvisorySection = ({ title, members }) => (
  <div className="mb-24 last:mb-0">
    <div className="flex items-center justify-center mb-16" data-aos="fade-up">
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#005596] px-6 uppercase tracking-wider">
        {title}
      </h2>
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
    </div>
    
    <div className="flex flex-wrap justify-center gap-10 md:gap-x-12 md:gap-y-16">
      {members.map((m, i) => (
        <div 
          key={i} 
          className="w-full sm:w-[calc(50%-2.5rem)] md:w-[calc(33.33%-3rem)] lg:w-[calc(25%-3rem)] min-w-[260px] max-w-[300px] flex flex-col items-center text-center group"
          data-aos="fade-up"
          data-aos-delay={i * 50}
        >
          <div className="relative mb-6 w-48 h-48">
            <div className="absolute inset-0 bg-blue-50 rounded-full transform scale-90 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-gray-100 group-hover:ring-4 group-hover:ring-blue-100 transform group-hover:-translate-y-2 transition-all duration-300 bg-white">
              <img 
                src={m.img} 
                alt={m.name} 
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {e.target.src = "https://ui-avatars.com/api/?name=" + m.name + "&background=random"}} 
              />
            </div>
          </div>
          <div className="px-2 w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#005596] transition-colors">{m.name}</h3>
            <div className="w-8 h-1 bg-blue-500/30 mx-auto my-3 rounded-full group-hover:w-16 group-hover:bg-blue-500 transition-all duration-300"></div>
            <p className="text-[#005596] font-semibold text-sm uppercase tracking-wide mb-1">{m.role}</p>
            {m.dept && <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1">{m.dept}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- 2. Conference Committee Grid Section (Horizontal Layout - No Icon) ---
const ConferenceCommitteeGrid = ({ title, members }) => (
  <div className="mb-24 last:mb-0">
    <div className="flex items-center justify-center mb-12" data-aos="fade-up">
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#005596] px-6 uppercase tracking-wider">
        {title}
      </h2>
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4">
      {/* Horizontal Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m, i) => (
          <div 
            key={i} 
            data-aos="fade-up"
            data-aos-delay={i * 30}
            className="group flex flex-col p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            {/* Content Container */}
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 group-hover:text-blue-700">
                {m.role}
              </p>
              <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-[#005596] transition-colors">
                {m.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- 3. Technical Tracks Section ---
const TechnicalTracksSection = () => (
  <div className="mb-24">
     <div className="flex items-center justify-center mb-12" data-aos="fade-up">
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#005596] px-6 uppercase tracking-wider">
        Technical Session Chairs
      </h2>
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
    </div>

    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {technicalTracks.map((track, i) => (
          <div 
            key={i} 
            data-aos="fade-up" 
            className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#005596] hover:shadow-xl transition-all duration-300"
          >
            <h3 className="font-bold text-lg text-[#005596] mb-6">
              {track.track}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wide min-w-[80px] text-center">
                  Chair
                </div>
                <p className="text-gray-900 font-medium">{track.chair}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-slate-50 text-slate-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wide min-w-[80px] text-center border border-slate-200">
                  Co-Chair
                </div>
                <p className="text-gray-900 font-medium">{track.coChair}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- 4. Organizing Committee (Simple List) ---
const OrganizingCommitteeSection = ({ title, members }) => (
  <div className="mb-24 last:mb-0">
    <div className="flex items-center justify-center mb-12" data-aos="fade-up">
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#005596] px-6 uppercase tracking-wider">
        {title}
      </h2>
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
    </div>
    
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((m, i) => (
          <div 
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 30}
            className="group p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-2">
              {m.role}
            </p>
            <h3 className="text-gray-900 font-semibold text-base leading-tight group-hover:text-[#005596] transition-colors">
              {m.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);


// --- Main Component ---

export default function Committee() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-20" data-aos="fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            IMPETUS 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the Team
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            The dedicated academic and student leaders working behind the scenes to steer innovation and ensure the success of this Conference.
          </p>
        </div>
        
        {/* Advisory Committee - Kept with Images */}
        <AdvisorySection title="Advisory Committee" members={advisoryCommittee} />

        {/* Conference Committee - Horizontal Grid Layout */}
        <ConferenceCommitteeGrid title="Conference Committee" members={conferenceCommittee} />

        {/* Technical Tracks */}
        <TechnicalTracksSection />
        
        {/* Organizing Committee - Student Committee */}
        <OrganizingCommitteeSection title="Organizing Committee" members={organizingCommittee} />
        
      </div>
    </div>
  );
}
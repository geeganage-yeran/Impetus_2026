import React from 'react';

// --- Data Configuration ---

const advisoryCommittee = [
  { name: "Prof. Amila Sandaruwan Ratnayake", role: "Dean, Faculty of Applied Sciences", dept: "Uva Wellassa University", img: "/committee/amila.png" },
  { name: "Assoc. Prof. A. P. Henagamage", role: "Head, Dept. of Science & Technology", dept: "Uva Wellassa University", img: "/committee/henagama.jpg" },
  { name: "Dr. J. T. Cooray", role: "Head, Dept. of Applied Earth Sciences", dept: "Uva Wellassa University", img: "/committee/cooray.jpg" },
  { name: "Ms. S. D. H. S. Wickramarathne", role: "Head, Dept. of Computer Science & Informatics", dept: "Uva Wellassa University", img: "/committee/harshani.jpg" },
  { name: "Prof. K. W. S. N. Kumari", role: "Counselor", dept: "IEEE Uva Wellassa University Student Branch", img: "/committee/kumari.jpg" },
];

const programCommittee = [
  { name: "Prof. E. M. U. W. J. B. Ekanayake", role: "Program Chair", img: "/committee/ekanayake.jpg" },
  { name: "Dr. H. M. S. N. Ariyadasa", role: "Editor-In-Chief", img: "/committee/Ariyadasa.jpg" },
  { name: "Dr. N. P. Samarasinghe", role: "Co-Editor", img: "/committee/Samarasinghe.jpg" },
  { name: "Ms. Rashmi Abeywardhana", role: "Secretary", img: "/committee/rashmi.jpg" },
  { name: "Ms. D. P. Jayathunga", role: "Academic Treasurer", img: "/committee/poornima.jpg" },
  { name: "Mr. S. J. M. D. P. Samarakoon", role: "Student Activities Chair", img: "/committee/deepal.jpg" },
];

const organizingCommittee = [
  { name: "Mr. W. D. V. A. Weerasinghe", role: "Student Branch Chair", img: "/committee/sbchair.jpeg" },
  { name: "Mr. C. C. R. Jayawardana", role: "Chair", img: "/committee/chandima.jpeg" },
  { name: "Mr. P. N. N. Peiris", role: "Co-Chair", img: "/committee/nimsara.jpeg" },
  { name: "Ms. W. M. W. N. Weerakon", role: "Secretary", img: "/committee/seclead.jpg" },
  { name: "Mr. R. P. N. S. Randunu", role: "Junior Treasurer", img: "/committee/Nisal.jpg" },
  { name: "Mr. G. A. N. L. Gajaweera", role: "Logistics Chair", img: "/committee/lahiru.jpeg" },
  { name: "Ms. D. L. N. Nawanjana", role: "Publicity Chair", img: "/committee/pvlead.jpeg" },
  { name: "Mr. H. M. V. N. Kumarasiri", role: "Design Chair", img: "/committee/speaker.jpg" },
  { name: "Ms. R. I. M. Panamaldeniye", role: "Industry Liaison & Sponsorship Chair", img: "/committee/sponsorship.jpg" },
  { name: "Mr. G. Y. L. M. Nandasiri", role: "Web & IT Chair", img: "/committee/weblead.png" },
  { name: "Mr. W. H. G. L. Bimsara", role: "Operational Support Chair", img: "/committee/programlead.jpeg" },
];

// --- Internal Component for Sections ---

const CommitteeSection = ({ title, members }) => (
  <div className="mb-24 last:mb-0">
    {/* Section Title */}
    <div className="flex items-center justify-center mb-16" data-aos="fade-up">
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#005596] px-6 uppercase tracking-wider">
        {title}
      </h2>
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
    </div>
    
    {/* Flex container for centering items regardless of count */}
    <div className="flex flex-wrap justify-center gap-10 md:gap-x-12 md:gap-y-16">
      {members.map((m, i) => (
        <div 
          key={i} 
          className="w-full sm:w-[calc(50%-2.5rem)] md:w-[calc(33.33%-3rem)] lg:w-[calc(25%-3rem)] min-w-[260px] max-w-[300px] flex flex-col items-center text-center group"
          data-aos="fade-up"
          data-aos-delay={i * 50} // Staggered animation
        >
          {/* Image Container */}
          <div className="relative mb-6 w-48 h-48">
            {/* Background Blob */}
            <div className="absolute inset-0 bg-blue-50 rounded-full transform scale-90 group-hover:scale-110 transition-transform duration-500"></div>
            
            {/* Image Frame */}
            <div className="relative w-full h-full rounded-full overflow-hidden 
                          border-4 border-white shadow-lg 
                          ring-1 ring-gray-100 group-hover:ring-4 group-hover:ring-blue-100 
                          transform group-hover:-translate-y-2 transition-all duration-300 bg-white">
              <img 
                src={m.img} 
                alt={m.name} 
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {e.target.src = "https://ui-avatars.com/api/?name=" + m.name + "&background=random"}} 
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="px-2 w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#005596] transition-colors">
              {m.name}
            </h3>
            
            <div className="w-8 h-1 bg-blue-500/30 mx-auto my-3 rounded-full group-hover:w-16 group-hover:bg-blue-500 transition-all duration-300"></div>
            
            <p className="text-[#005596] font-semibold text-sm uppercase tracking-wide mb-1">
              {m.role}
            </p>
            
            {m.dept && (
              <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1">
                {m.dept}
              </p>
            )}
          </div>
        </div>
      ))}
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
            The dedicated academic and student leaders working behind the scenes to steer innovation and ensure the success of this symposium.
          </p>
        </div>
        
        <CommitteeSection title="Advisory Committee" members={advisoryCommittee} />
        <CommitteeSection title="Program Committee" members={programCommittee} />
        <CommitteeSection title="Organizing Committee" members={organizingCommittee} />
        
      </div>
    </div>
  );
}
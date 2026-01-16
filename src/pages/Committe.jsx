import React from 'react';

// --- Data Configuration ---

const advisoryCommittee = [
  { name: "Prof. Amila Sandaruwan Ratnayake", role: "Dean, Faculty of Applied Sciences", dept: "Uva Wellassa University", img: "/committee/amila.png" },
  { name: "Assoc. Prof. A. P. Henagamage", role: "Head of the Department, Department of Science & Technology", dept: "Uva Wellassa University", img: "/committee/henagama.jpg" },
  { name: "Dr. J. T. Cooray", role: "Head of the Department, Department of Applied Earth Sciences", dept: "Uva Wellassa University", img: "/committee/cooray.jpg" },
  { name: "Ms. S. D. H. S. Wickramarathne", role: "Head of the Department, Department of Computer Science & Informatics", dept: "Uva Wellassa University", img: "/committee/harshani.jpg" },
  { name: "Prof. K. W. S. N. Kumari", role: "Counselor", dept: "IEEE Uva Wellassa University Student Branch", img: "/committee/kumari.jpg" },
];

const programCommittee = [
  { name: "Prof. E. M. U. W. J. B. Ekanayake", role: "Program Chair", img: "/committee/ekanayake.jpg" },
  { name: "Dr. H. M. S. N. Ariyadasa", role: "Editor-In-Chief", img: "/committee/Ariyadasa.jpg" },
  { name: "Dr. N. P. Samarasinghe", role: "Co-Editor", img: "/committee/Samarasinghe.jpg" },
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
  { name: "Mr. H. M. V. N. Kumarasiri", role: "Design Chair", img: "/committee/kumarasiri.jpg" },
  { name: "Ms. R. I. M. Panamaldeniye", role: "Industry Liaison & Sponsorship Chair", img: "/committee/sponsorship.jpg" },
  { name: "Mr. G. Y. L. M. Nandasiri", role: "Web & IT Chair", img: "/committee/weblead.png" },
  { name: "Mr. W. H. G. L. Bimsara", role: "Operational Support Chair", img: "/committee/programlead.jpeg" },

];

// --- Internal Component for Sections ---

const CommitteeSection = ({ title, members }) => (
  <div className="mb-24 last:mb-0">
    <div className="flex items-center justify-center mb-16">
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#005596] px-6 uppercase tracking-wide">
        {title}
      </h2>
      <div className="h-px bg-gray-200 w-16 md:w-32"></div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
      {members.map((m, i) => (
        <div key={i} className="text-center group flex flex-col items-center">
          {/* Image Container */}
          <div className="relative mb-6">
            {/* Decorative background blob for depth */}
            <div className="absolute inset-0 bg-blue-100 rounded-full transform scale-90 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden 
                          border-4 border-white shadow-xl 
                          ring-4 ring-gray-50 group-hover:ring-blue-100 
                          transform group-hover:-translate-y-2 transition-all duration-300">
              <img 
                src={m.img} 
                alt={m.name} 
                className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {e.target.src = "https://i.pravatar.cc/150?u=120"}} 
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="px-2">
            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#005596] transition-colors">
              {m.name}
            </h3>
            <div className="w-12 h-1 bg-blue-500 mx-auto my-3 rounded-full opacity-50 group-hover:w-20 group-hover:opacity-100 transition-all duration-300"></div>
            <p className="text-[#005596] font-semibold text-sm uppercase tracking-wider mb-2">
              {m.role}
            </p>
            {m.dept && (
              <p className="text-gray-500 text-xs font-medium max-w-[200px] mx-auto leading-relaxed">
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
    <div className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">
          Organizing Committee
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-20 leading-relaxed">
          Meet the dedicated academic and student leaders working behind the scenes to make this symposium a success.
        </p>
        
        <CommitteeSection title="Advisory Committee" members={advisoryCommittee} />
        <CommitteeSection title="Program Committee" members={programCommittee} />
        <CommitteeSection title="Organizing Committee" members={organizingCommittee} />
        
      </div>
    </div>
  );
}
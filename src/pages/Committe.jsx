import React from 'react';

const members = [
  { name: "Dr. Name Surname", role: "Symposium Chair", img: "https://i.pravatar.cc/150?u=1" },
  { name: "Dr. Name Surname", role: "Secretary", img: "https://i.pravatar.cc/150?u=2" },
  { name: "Mr. Name Surname", role: "Coordinator", img: "https://i.pravatar.cc/150?u=3" },
  { name: "Ms. Name Surname", role: "Treasurer", img: "https://i.pravatar.cc/150?u=4" },
];

export default function Committee() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-16">Organizing Committee</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <div key={i} className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-50 group-hover:border-blue-200 transition-all">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
              <p className="text-blue-600 font-medium">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
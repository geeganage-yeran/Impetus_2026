import React from 'react';
import ContactSection from '../components/ContactSection'; 
import { Mail } from 'lucide-react'; // Ensure you have lucide-react installed, or use a standard svg

export default function Contact() {
  
  // defined data here for cleaner JSX
  const coordinators = [
    {
      name: "Prof. Sandya Kumari",
      role: "Coordinator",
      email: "sandya@uwu.ac.lk",
      img: "/committee/kumari.jpg" 
    },
    {
      name: "Ms. Rashmi Abeywardhana",
      role: "Secretary",
      email: "rashmi@uwu.ac.lk",
      img: "/committee/rashmi.jpg" 
    }
  ];

  return (
    <div className="pt-20">
      {/* Existing Contact Info Cards */}
      <ContactSection /> 

      {/* Coordinator Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Coordinators
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {coordinators.map((person, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              
              {/* Image Circle */}
              <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-gray-100">
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {e.target.src = "https://i.pravatar.cc/150?u=99"}} 
                />
              </div>

              {/* Text Info */}
              <h3 className="font-bold text-xl text-gray-900 mb-1">
                {person.name}
              </h3>
              <p className="text-[#005596] font-medium uppercase tracking-wide text-sm mb-3">
                {person.role}
              </p>
              
              <a 
                href={`mailto:${person.email}`} 
                className="text-gray-500 hover:text-[#005596] transition-colors font-medium bg-gray-50 px-4 py-2 rounded-full text-sm"
              >
                {person.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Send Message Section (Email Link) */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-[#005596] rounded-full mb-6">
            <Mail className="w-8 h-8" />
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h3>
          
          <p className="text-gray-600 mb-8 text-lg">
            Have questions about submissions, registration, or the venue? <br className="hidden md:block"/>
            Drop us an email and our team will get back to you.
          </p>

          <a 
            href="mailto:impetus@ieee.uwu.ac.lk"
            className="inline-flex items-center gap-3 bg-[#005596] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00447a] transition-all shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-1"
          >
            <Mail className="w-5 h-5" />
            impetus@ieee.uwu.ac.lk
          </a>
        </div>
      </section>
    </div>
  );
}
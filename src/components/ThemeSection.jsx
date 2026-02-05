import React from "react";
import { Code, Database, Cpu, Microscope } from "lucide-react";

const topics = [
  {
    icon: Code,
    title: "Track 1: Computing & Industrial Information Systems",
    subthemes: [
      "Software Engineering & Systems Architecture",
      "Web, Mobile, Enterprise & Educational Technology Systems", // Updated
      "Cloud, Distributed & Networked Computing",
      "Cybersecurity, Privacy & IT Governance",
      "Industrial IoT, Smart Manufacturing & Industry 4.0",
      "Digital Transformation, FinTech & Sustainable IT Systems"
    ],
    gradient: "from-blue-500 to-cyan-500",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    icon: Database,
    title: "Track 2: Data Science & Artificial Intelligence",
    subthemes: [
      "Machine Learning, Deep Learning & Generative AI",
      "Natural Language, Speech & Multimodal Intelligence",
      "Computer Vision & Intelligent Perception",
      "Data Mining, Big Data & Time-Series Analytics",
      "Data Analytics, Visualization & Knowledge Engineering",
      "Intelligent Decision Systems & Responsible AI"
    ],
    gradient: "from-purple-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    icon: Cpu,
    title: "Track 3: Robotics, Mechatronics & Embedded Systems",
    subthemes: [
      "Robotics & Autonomous Systems",
      "Mechatronic Design & Intelligent Control Systems",
      "Embedded, Real-Time & Cyber-Physical Systems",
      "Industrial Automation & Smart Manufacturing Systems",
      "IoT Devices, Sensors & Actuators",
      "Human–Robot Interaction & Collaborative Robotics"
    ],
    gradient: "from-orange-500 to-red-500",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    icon: Microscope,
    title: "Track 4: Science & Technology",
    subthemes: [
      "Interdisciplinary Science & Engineering Research",
      "Emerging Technologies & Innovative Applications",
      "Applied Sciences & Advanced Engineering Solutions",
      "Computational, Experimental & Theoretical Studies",
      "Technology for Sustainability & Societal Impact"
    ],
    gradient: "from-green-500 to-emerald-500",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
  },
];

export default function ThemeSection() {
  return (
    <section
      id="theme"
      className="relative py-10 sm:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-5xl md:text-4xl font-semibold text-[#1a66a1] mb-3 leading-tight">
            Humanity First: Steering Innovation for Ethical Impact
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive conference tracks designed to foster multidisciplinary innovation.
          </p>
        </div>

        {/* Available Tracks Section */}
        <div data-aos="fade-up" className="text-center mb-12">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-[#005596] to-[#3377ab] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
              Conference Tracks & Sub-Themes
            </div>
          </div>
        </div>

        {/* Topics Grid - Using 2 columns for better readability of lists */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                data-aos="fade-up"
                key={index}
                // Width: Full on mobile, 50% on large screens (minus gap) to fit the longer text lists comfortably
                className="w-full lg:w-[calc(50%-1rem)] group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden flex flex-col"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                  ></div>

                  {/* Icon floating on image */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${topic.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
                    {topic.title}
                  </h3>
                  
                  {/* Sub-themes List */}
                  <ul className="space-y-2 mb-4">
                    {topic.subthemes.map((sub, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 leading-relaxed">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${topic.gradient} group-hover:w-full transition-all duration-500`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
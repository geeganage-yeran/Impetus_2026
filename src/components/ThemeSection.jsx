import React from "react";
import { Code, Database, Cpu, Factory, Microscope } from "lucide-react";

const topics = [
  {
    icon: Code,
    title: "Computing and Software Technologies",
    description:
      "Software engineering, cloud computing, web technologies, and emerging programming paradigms",
    gradient: "from-blue-500 to-cyan-500",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    icon: Database,
    title: "Data Science and Artificial Intelligence",
    description:
      "Machine learning, deep learning, big data analytics, and intelligent systems",
    gradient: "from-purple-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    icon: Cpu,
    title: "Robotics, Mechatronics, and Embedded Systems",
    description:
      "Autonomous systems, IoT, robotics engineering, and hardware-software integration",
    gradient: "from-orange-500 to-red-500",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    icon: Factory,
    title: "Industrial Information Systems & Smart Technologies",
    description:
      "Industry 4.0, smart manufacturing, automation, and industrial IoT solutions",
    gradient: "from-green-500 to-emerald-500",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    icon: Microscope,
    title: "Science and Technology",
    description:
      "Applied sciences, biotechnology, materials science, and interdisciplinary research",
    gradient: "from-indigo-500 to-blue-500",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
  },
];

export default function ThemeSection() {
  return (
    <section
      id="theme"
      className="relative py-10 sm:py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-5xl md:text-4xl font-semibold text-[#1a66a1] mb-3 leading-tight">
            Humanity First: Steering Innovation for Ethical Impact
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore how technology can be developed and deployed with human
            values at its core, ensuring positive societal impact.
          </p>
        </div>

        {/* Available Tracks Section */}
        <div data-aos="fade-up" className="text-center mb-12">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-[#005596] to-[#3377ab] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
              Available Conference Tracks
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                data-aos="fade-up"
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
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
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {topic.description}
                  </p>
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

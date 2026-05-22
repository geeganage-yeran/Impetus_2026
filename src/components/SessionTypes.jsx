import React from 'react';
import { Mic2, MonitorPlay, MessageSquare, Download, Presentation, Image as ImageIcon } from 'lucide-react';

const sessions = [
  {
    title: "Oral Presentation",
    desc: "15-minute live presentations followed by 5 minutes of Q&A. Presenters share findings in-person at the university premises.",
    icon: Mic2,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Virtual Presentation",
    desc: "Dedicated sessions for international participants. Live Zoom presentations with interactive tools for remote engagement.",
    icon: MonitorPlay,
    color: "bg-blue-100 text-blue-600",
    downloads: [
      { 
        label: "Virtual Presentation Template", 
        url: "/Docs/IMPETUS.pptx", 
        icon: Presentation 
      },
      { 
        label: "Virtual Background", 
        url: "/Docs/background.jpeg", 
        icon: ImageIcon 
      }
    ]
  },
  // {
  //   title: "Poster Sessions",
  //   desc: "Interactive visual displays allowing deep-dive discussions with attendees during dedicated networking breaks.",
  //   icon: Users2,
  //   color: "bg-green-100 text-green-600"
  // },
  {
    title: "Panel Discussions",
    desc: "Expert-led forums debating emerging trends in technology, featuring industry leaders and senior academics.",
    icon: MessageSquare,
    color: "bg-orange-100 text-orange-600"
  }
];

export default function SessionTypes() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Technical Session Formats
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            IMPETUS 2026 offers diverse ways to present your research and connect with the community.
          </p>
        </div>

        {/* Updated grid to lg:grid-cols-3 for perfect alignment of 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sessions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center group px-4">
                <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-sm`}>
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-1">
                  {item.desc}
                </p>

                {/* Conditional rendering for downloadable assets */}
                {item.downloads && (
                  <div className="mt-6 w-full space-y-3">
                    {item.downloads.map((download, dIndex) => {
                      const DownloadIcon = download.icon;
                      return (
                        <a 
                          key={dIndex}
                          href={download.url}
                          download
                          className="flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-[#005596] text-[#005596] hover:text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors duration-300 border border-blue-100 hover:border-transparent shadow-sm group/btn"
                        >
                          <DownloadIcon className="w-4 h-4" />
                          {download.label}
                          <Download className="w-4 h-4 ml-auto opacity-50 group-hover/btn:opacity-100 group-hover/btn:-translate-y-0.5 transition-all" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
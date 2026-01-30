import React from 'react';
import { FileText, CheckCircle, Users, Award, ExternalLink, ArrowRight } from 'lucide-react';

const guidelines = [
  {
    icon: FileText,
    title: 'Abstract Format',
    description: 'Submit abstracts (300-500 words) or extended abstracts (1000-1500 words)',
  },
  {
    icon: CheckCircle,
    title: 'Peer Review',
    description: 'All submissions undergo rigorous double-blind review by IEEE professionals',
  },
  {
    icon: Users,
    title: 'Presentation',
    description: 'Accepted papers will be presented in hybrid sessions across five technical tracks',
  },
  {
    icon: Award,
    title: 'Publication',
    description: 'Selected papers may be recommended for publication in IEEE proceedings',
  },
];

export default function SubmissionSection() {
  return (
    <section id="submission" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Guidelines Grid
        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {guidelines.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-slate-50 border border-slate-100 rounded-xl text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-[#005596]">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-gray-900 mb-2 font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div> */}

        {/* CTA Section - Redesigned Button */}
        <div data-aos="fade-up" className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#005596] to-[#003b69] p-8 md:p-12 text-center shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
             <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to submit your research?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Submissions are now open via the Microsoft CMT platform. Please ensure you have read the author guidelines before proceeding.
            </p>
            
            <a 
              href="https://cmt3.research.microsoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-white text-[#002b4b] px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
            >
              Submit Paper via CMT
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            
            <p className="mt-4 text-sm text-blue-200/80">
              *Requires a Microsoft CMT account
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
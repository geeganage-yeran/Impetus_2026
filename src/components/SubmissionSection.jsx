import React from 'react';
import { FileText, CheckCircle, Users, Award } from 'lucide-react';

const guidelines = [
  {
    icon: FileText,
    title: 'Abstract Format',
    description: 'Submit abstracts (300-500 words) or extended abstracts (1000-1500 words)',
  },
  {
    icon: CheckCircle,
    title: 'Peer Review',
    description: 'All submissions undergo rigorous review by IEEE professionals and scholars',
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
    <section id="submission" className="py-10 sm:py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 font-semibold">
            Call for Papers
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
            We invite researchers, academics, and industry professionals to submit original research contributions across our five technical tracks.
          </p>
          <button className="bg-gradient-to-br from-[#005596] to-[#3377ab] cursor-pointer hover:bg-[#003b69] text-white rounded-full px-8 py-4 text-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
            Submit via CMT
          </button>
        </div>

        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {guidelines.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#3377ab]" />
                </div>
                <h4 className="text-gray-900 mb-2 font-semibold text-lg">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div data-aos="fade-up" className="p-6 sm:p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3377ab] rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 mb-2 font-semibold text-lg">Quality Assurance</h4>
              <p className="text-sm sm:text-base text-gray-600">
                All papers are reviewed by IEEE professionals and scholars to ensure academic quality and adherence to international standards. Authors will receive detailed feedback to enhance their research contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
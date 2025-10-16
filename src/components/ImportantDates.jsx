import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

const dates = [
  { label: 'Abstract Submission Opens', date: '12th Nov 2025' },
  { label: 'Abstract Submission Deadline', date: '10th Dec 2025' },
  { label: 'Notification of Acceptance', date: '7th Jan 2026' },
  { label: 'Camera-Ready Submission', date: '31st Jan 2026' },
  { label: 'Early Bird Registration', date: '1st–9th Feb 2026' },
  { label: 'Regular Registration', date: '10th–20th Feb 2026' },
  { label: 'Symposium Date', date: '25th Feb 2026', highlight: true },
];

export default function ImportantDates() {
  return (
    <section className="py-10 sm:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl text-gray-900 mb-4">
            Important Dates
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Mark your calendar and stay on track with key deadlines
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

            <div className="space-y-8 sm:space-y-12">
              {dates.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div data-aos="fade-up" className="w-full md:w-5/12">
                    <div
                      className={`p-4 sm:p-6 rounded-lg border ${
                        item.highlight
                          ? 'bg-[#005596] animate-pulse text-white border-[#3377ab] shadow-lg'
                          : 'bg-gray-100 border-gray-200 hover:border-[#3377ab] transition-all duration-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.highlight
                              ? 'bg-white/20'
                              : 'bg-blue-50'
                          }`}
                        >
                          {item.highlight ? (
                            <CheckCircle2
                              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                item.highlight ? 'text-white' : 'text-[#1a66a1]'
                              }`}
                            />
                          ) : (
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#3377ab]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`mb-1 font-semibold ${
                              item.highlight ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.label}
                          </h4>
                          <p
                            className={`text-sm sm:text-base ${
                              item.highlight ? 'text-white/90' : 'text-gray-600'
                            }`}
                          >
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#005596] border-4 border-white shadow-md" />

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
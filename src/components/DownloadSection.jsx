import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

export default function DownloadSection() {
  return (
    <section className="py-16 bg-slate-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Guidelines and Paper Template
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Please ensure your submission adheres to the standard IEEE conference format. 
            You can access the official manuscript templates for conference proceedings directly from the IEEE website.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 text-[#005596] rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl text-gray-900">IEEE Conference Template</h3>
              <p className="text-gray-500">Available in DOCX and LaTeX formats</p>
            </div>
          </div>

          <a 
            href="https://www.ieee.org/conferences/publishing/templates.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-[#005596] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-[#003b69] hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Visit IEEE Website
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
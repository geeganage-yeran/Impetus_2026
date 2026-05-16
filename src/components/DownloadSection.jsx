import React from 'react';
import { FileText, ExternalLink, Download, FileCheck } from 'lucide-react';

export default function DownloadSection() {
  return (
    <section className="py-16 bg-slate-50 border-t border-gray-200 relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Guidelines & Paper Templates
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Please ensure your submission adheres to the standard IEEE conference format and follow the final preparation guidelines before uploading to CMT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: IEEE Templates */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-16 h-16 bg-blue-50 text-[#005596] rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-2">IEEE Paper Template</h3>
              <p className="text-gray-500 font-medium mb-8">Official manuscript templates available in DOCX and LaTeX formats directly from IEEE.</p>
            </div>

            <a 
              href="https://www.ieee.org/conferences/publishing/templates.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-50 text-[#005596] border border-slate-200 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:bg-[#005596] hover:text-white hover:border-[#005596] shadow-sm w-full group/btn"
            >
              Visit IEEE Website
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Card 2: Camera-Ready Guidelines */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            {/* Highlight Accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            
            <div>
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-sm border border-emerald-100">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-2">Camera-Ready Guidelines</h3>
              <p className="text-gray-500 font-medium mb-8">Detailed instructions, mandatory requirements, and formatting rules for your final manuscript submission.</p>
            </div>

            <a 
              href="/Docs/Camera-Ready-Submission-Guidelines_final.docx"
              download
              className="inline-flex items-center justify-center gap-2 bg-[#005596] text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:bg-[#003b69] shadow-lg shadow-blue-900/20 w-full group/btn"
            >
              <Download className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
              Download Document
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
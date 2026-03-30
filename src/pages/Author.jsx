import React from 'react';
import SubmissionSection from '../components/SubmissionSection';
import DownloadSection from '../components/DownloadSection';
import SessionTypes from '../components/SessionTypes';
import { Link } from 'react-router-dom';
import { FileText, Download, Users, AlertCircle } from 'lucide-react';

export default function Author() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-[#002b4b] pt-20 pb-10 text-center relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Author Guidelines</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Everything you need to know about submitting, presenting, and publishing your research at IMPETUS 2026.
          </p>
        </div>
      </div>

      {/* Download Documents - Moved Up */}
      <DownloadSection />

      {/* HIGHLIGHTED SECTION: Downloadable Documents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-4 relative z-10">
        <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-10 rounded-3xl border border-blue-100 shadow-lg">
          
          <div className="flex items-center gap-3 mb-8 border-b border-blue-100 pb-4">
            <div className="bg-[#005596] p-2 rounded-lg text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#005596]">
                Important Documents
              </h2>
              <p className="text-gray-600 text-sm mt-1">Required forms and lists for the submission process</p>
            </div>
          </div>

          {/* Adjusted to md:grid-cols-2 and added max-w-4xl to center the 2 remaining cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Declaration Form */}
            <a href="Docs/IMPETUS2026-DeclarationForm.docx" target="_blank" rel="noreferrer" className="flex flex-col p-6 bg-white border-l-4 border-[#005596] rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-md relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-[#005596] rounded-lg group-hover:bg-[#005596] group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#005596] bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-100 transition-colors">
                  <Download className="w-4 h-4" /> Download
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#005596] transition-colors">Declaration Form</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mandatory document confirming the originality of your submission and the consent of all co-authors.
              </p>
            </a>

            {/* Correction Form */}
            <a href="Docs/IMPETUS2026-CorrectionForm.docx" target="_blank" rel="noreferrer" className="flex flex-col p-6 bg-white border-l-4 border-amber-500 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-md relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full group-hover:bg-amber-100 transition-colors">
                  <Download className="w-4 h-4" /> Download
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-amber-600 transition-colors">Correction Form</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use this form to document any minor post-acceptance corrections requested by the reviewers.
              </p>
            </a>

            {/* Reviewer List - COMMENTED OUT */}
            {/* <a href="Docs/IMPETUS2026-ReviewerList.docx" target="_blank" rel="noreferrer" className="flex flex-col p-6 bg-white border-l-4 border-emerald-500 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-md relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full group-hover:bg-emerald-100 transition-colors">
                  <Download className="w-4 h-4" /> Download
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors">Reviewer List</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                A comprehensive list of our esteemed academic and industry reviewers for IMPETUS 2026.
              </p>
            </a> 
            */}

          </div>
        </div>
      </section>

      {/* 4 Technical Session Details */}
      <SessionTypes />

      {/* Submission Guidelines & CMT CTA */}
      <SubmissionSection />
    
    </div>
  );
}
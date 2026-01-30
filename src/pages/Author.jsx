import React from 'react';
import SubmissionSection from '../components/SubmissionSection';
import ImportantDates from '../components/ImportantDates';
import DownloadSection from '../components/DownloadSection';
import SessionTypes from '../components/SessionTypes';

export default function Author() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header Banner - Updated color to match theme */}
      <div className="bg-[#002b4b] pt-20 pb-10 text-center relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Authors Zone</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Everything you need to know about submitting, presenting, and publishing your research at IMPETUS 2026.
          </p>
        </div>
      </div>
      
      {/* Important Dates */}
      <ImportantDates />

      {/* 4 Technical Session Details */}
      <SessionTypes />

      {/* Download Documents */}
      <DownloadSection />
      
      {/* Submission Guidelines & CMT CTA */}
      <SubmissionSection />
    </div>
  );
}
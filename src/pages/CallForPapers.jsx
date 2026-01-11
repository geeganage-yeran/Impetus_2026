import React from 'react';
import SubmissionSection from '../components/SubmissionSection';
import SpeakersSection from '../components/SpeakersSection'; // Contains Tracks info
import ImportantDates from '../components/ImportantDates';

export default function CallForPapers() {
  return (
    <div className="pt-20">
      <div className="bg-blue-50 py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Call For Papers</h1>
        <p className="mt-4 text-gray-600">Explore our technical tracks and submission guidelines.</p>
      </div>
      
      {/* Tracks & Sessions */}
      <SpeakersSection />
      
      {/* Guidelines */}
      <SubmissionSection />
      
      {/* Timeline */}
      <ImportantDates />
    </div>
  );
}
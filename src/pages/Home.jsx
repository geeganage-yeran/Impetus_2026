import React from 'react';
import HeroSection from '../components/HeroSection';
import ThemeSection from '../components/ThemeSection'; 
import ImportantDates from '../components/ImportantDates';
import CmtAcknowledgment from '../components/CmtAcknowledgment';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />

      {/* Important Dates */}
      <ImportantDates />

      {/* Conference Tracks */}
      <ThemeSection />
      
      {/* Microsoft Acknowledgment */}
      <CmtAcknowledgment />
      
      {/* CMT Message CTA */}
      <section className="py-16 bg-[#002b4b] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Submit Your Research?</h2>
          <p className="text-lg text-white/80 mb-8">
            Submissions are open via the Microsoft CMT platform.
            Ensure your paper follows the IEEE format.
          </p>
          {/* UPDATED LINK */}
          <button
            disabled
            className="inline-flex items-center gap-2 bg-white/20 text-white/50 px-8 py-4 rounded-full font-bold cursor-not-allowed"
          >
            Submission Closed
          </button>
        </div>
      </section>
    </div>
  );
}
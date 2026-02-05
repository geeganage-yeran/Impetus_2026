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
          <a
            href="https://cmt3.research.microsoft.com/IMPETUS2026"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#002b4b] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Submit Full Paper <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
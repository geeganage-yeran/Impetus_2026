import React from 'react';
import { FileText, CheckCircle, Users, Award, ExternalLink, AlertCircle } from 'lucide-react';

export default function SubmissionSection() {
  return (
    <section id="submission" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Notice: Full Paper Submission Highlight */}
        <div data-aos="fade-up" className="mb-12 max-w-4xl mx-auto">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg shadow-sm flex items-start gap-4">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600 flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Important Submission Requirement</h3>
              <p className="text-amber-800 text-lg font-medium leading-relaxed">
                Please note that <span className="font-extrabold underline decoration-amber-500/50 decoration-2 underline-offset-2">FULL PAPER SUBMISSION</span> is mandatory for the initial review process. Abstracts alone will not be accepted. Ensure your manuscript follows the full IEEE conference format guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
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
            
            {/* UPDATED LINK */}
            <a 
              href="https://cmt3.research.microsoft.com/IMPETUS2026"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-white text-[#002b4b] px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
            >
              Submit Full Paper
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
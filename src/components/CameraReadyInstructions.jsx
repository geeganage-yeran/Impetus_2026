import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  FileCode, 
  CreditCard, 
  FileCheck, 
  AlertCircle,
  IdCard,
  FileEdit,
  Info
} from 'lucide-react';

export default function CameraReadyInstructions() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002b4b] to-[#005596] p-8 md:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-400/20 border border-blue-300/30 rounded-full text-blue-100 text-xs font-bold uppercase tracking-wider mb-4">
                <FileCheck className="w-4 h-4" /> Final Step
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Camera-Ready Submission</h2>
              <p className="text-blue-100 text-lg max-w-2xl">
                Please follow these instructions carefully to prepare and submit the final version of your accepted manuscript.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-12">

          {/* Section 1: Preparation */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm">1</span>
              Preparation of the Manuscript
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> What You Must Include
                </h4>
                <ul className="space-y-3">
                  {['Author names & Affiliations', 'Email addresses', 'Acknowledgements', 'Funding or grant information (if applicable)'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" /> Cross-Checked Fields
                </h4>
                <p className="text-xs text-slate-500 mb-3 font-medium">
                  Changes to these fields are permitted <span className="font-bold text-slate-700">only</span> if based on reviewer comments:
                </p>
                <ul className="space-y-3">
                  {['Paper Title', 'Abstract', 'Keywords', 'Main paper content'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Important Rules (Alerts) */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
            <h3 className="text-xl font-black text-amber-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              Strict Guidelines & Important Notes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white/60 p-4 rounded-xl border border-amber-200/60 shadow-sm flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-amber-900">
                  <span className="text-red-600 font-bold block mb-1">No Author Changes:</span>
                  Addition or removal of authors is strictly prohibited at this stage.
                </p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-amber-200/60 shadow-sm flex gap-3 items-start">
                <FileText className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-amber-900">
                  <span className="block mb-1 font-bold">Abstract Consistency:</span>
                  The abstract in the CMT system must be completely identical to the manuscript.
                </p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-amber-200/60 shadow-sm flex gap-3 items-start">
                <FileCode className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-amber-900">
                  <span className="block mb-1 font-bold">Formatting Requirements:</span>
                  Ensure all fonts are embedded in the PDF. Do NOT include page numbers.
                </p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-amber-200/60 shadow-sm flex gap-3 items-start">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-amber-900">
                  <span className="block mb-1 font-bold">Editorial Rights:</span>
                  The editorial team may make minor formatting adjustments for consistency.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Required Uploads */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm">2</span>
              Documents Required for Upload
            </h3>

            <div className="space-y-6">
              {/* Mandatory Documents */}
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Mandatory Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <div className="bg-white border-2 border-emerald-100 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-colors">
                    <FileText className="w-8 h-8 text-emerald-500 mb-3" />
                    <h5 className="font-bold text-slate-900 mb-1">Camera-Ready PDF</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Final PDF version of the paper with all fonts embedded.</p>
                  </div>
                  
                  <div className="bg-white border-2 border-emerald-100 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-colors">
                    <FileCode className="w-8 h-8 text-emerald-500 mb-3" />
                    <h5 className="font-bold text-slate-900 mb-1">Editable Source</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Microsoft Word (.docx) OR complete LaTeX source package (.zip).</p>
                  </div>

                  <div className="bg-white border-2 border-emerald-100 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-colors">
                    <FileCheck className="w-8 h-8 text-emerald-500 mb-3" />
                    <h5 className="font-bold text-slate-900 mb-1">Declaration Form</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Signed Author Declaration Form (downloaded from above).</p>
                  </div>

                  <div className="bg-white border-2 border-emerald-100 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-colors">
                    <CreditCard className="w-8 h-8 text-emerald-500 mb-3" />
                    <h5 className="font-bold text-slate-900 mb-1">Payment Receipt</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Scanned copy or digital receipt of conference registration.</p>
                  </div>

                </div>
              </div>

              {/* Conditional Documents */}
              <div className="pt-4">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Additional Documents (If Applicable)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
                    <FileEdit className="w-6 h-6 text-slate-400 shrink-0" />
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm mb-1">Correction Form</h5>
                      <p className="text-xs text-slate-500 font-medium">Required only if corrections are requested or applicable.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
                    <IdCard className="w-6 h-6 text-slate-400 shrink-0" />
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm mb-1">Student Identification Card</h5>
                      <p className="text-xs text-slate-500 font-medium">Required for all student registrants (image or PDF format).</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Final Verification Box */}
          <div className="bg-[#002b4b] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Final Submission Verification</h4>
              <p className="text-blue-200 text-sm">Before submitting on CMT, ensure your PDF matches your source files exactly and payment is verified.</p>
            </div>
            <a 
              href="https://cmt3.research.microsoft.com/IMPETUS2026"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-white text-[#002b4b] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Go to CMT Portal
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
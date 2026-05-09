import React, { useEffect, useState } from 'react';

const RegistrationSuccess = ({ formData, onReset }) => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Generate a mock reference number and current date on load
  useEffect(() => {
    const randomRef = 'IMP-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setReferenceNumber(randomRef);
    
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    setCurrentDate(date);
  }, []);

  // Triggers the browser's native print/save-to-pdf dialog
  const handleDownloadPDF = () => {
    window.print();
  };

  // Provide fallback text if formData is missing
  const data = formData || {
    fullName: 'John Doe',
    email: 'john@example.com',
    institution: 'Tech University',
    role: 'author',
    paperId: '1024',
    researchTrack: 'Track 2: Data Science & Artificial Intelligence'
  };

  return (
    <div className="min-h-screen py-16 px-4 w-full flex justify-center font-sans text-slate-300 relative overflow-hidden bg-slate-950 print:bg-white print:py-0 print:min-h-0">
      
      {/* Background elements - Hidden during PDF generation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none print:hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)', backgroundSize: '30px 30px', maskImage: 'linear-gradient(180deg, black, transparent)' }}></div>
      </div>

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Success Message - Hidden in PDF */}
        <div className="text-center mb-8 print:hidden animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-900/50 border-2 border-cyan-400 mb-6 shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] text-cyan-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Registration Successful!</h1>
          <p className="text-cyan-300">Your details and payment receipt have been received.</p>
        </div>

        {/* The Printable Receipt Card */}
        {/* WebkitPrintColorAdjust ensures background colors print correctly in PDF */}
        <div 
          className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl relative print:border-slate-300 print:shadow-none print:text-black"
          style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        >
          {/* Receipt Header */}
          <div className="bg-slate-950 px-8 py-6 border-b border-slate-800 flex justify-between items-center print:bg-slate-100 print:border-slate-300">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight print:text-slate-900">IMPETUS 2026</h2>
              <p className="text-cyan-400 text-sm font-medium print:text-slate-600">Official Registration Receipt</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-widest print:text-slate-500">Reference No.</p>
              <p className="text-lg font-mono font-bold text-slate-100 print:text-slate-800">{referenceNumber}</p>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="p-8 space-y-8 print:bg-white">
            
            {/* Attendee Details */}
            <div>
              <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 print:text-slate-500 print:border-slate-200">Attendee Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Full Name</p>
                  <p className="font-semibold text-slate-100 text-lg print:text-slate-800">{data.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email Address</p>
                  <p className="font-semibold text-slate-100 print:text-slate-800">{data.email}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-500 mb-1">Institution / Organization</p>
                  <p className="font-semibold text-slate-100 print:text-slate-800">{data.institution}</p>
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div>
              <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 print:text-slate-500 print:border-slate-200">Registration Details</h3>
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 print:bg-slate-50 print:border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Role</p>
                    <p className="font-semibold text-cyan-300 uppercase print:text-slate-800">
                      {data.role === 'author' ? 'Author / Presenter' : 'Attendee'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Date Submitted</p>
                    <p className="font-semibold text-slate-200 print:text-slate-800">{currentDate}</p>
                  </div>
                  
                  {data.role === 'author' && (
                    <>
                      <div className="md:col-span-2 pt-3 mt-3 border-t border-slate-700 print:border-slate-200">
                        <p className="text-sm text-slate-500 mb-1">Paper ID</p>
                        <p className="font-semibold text-slate-200 print:text-slate-800">{data.paperId}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-slate-500 mb-1">Research Track</p>
                        <p className="font-semibold text-slate-200 print:text-slate-800">{data.researchTrack}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer / Barcode mockup */}
            <div className="pt-6 border-t border-dashed border-slate-700 flex flex-col items-center print:border-slate-300">
              <p className="text-xs text-slate-500 mb-3 text-center">Please keep this receipt for your records. Show this at the registration desk.</p>
              {/* Mock Barcode */}
              <div className="font-mono text-4xl text-slate-600 tracking-[0.2em] opacity-50 print:text-slate-400">
                ||| || ||| || |||| | ||
              </div>
              <p className="text-[10px] font-mono mt-1 text-slate-600">{referenceNumber}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Hidden in PDF */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 py-3 px-8 rounded-xl text-lg font-bold text-black bg-cyan-400 hover:bg-white transition-all shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download PDF Receipt
          </button>
          
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-3 px-8 rounded-xl text-lg font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all"
          >
            Return to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegistrationSuccess;
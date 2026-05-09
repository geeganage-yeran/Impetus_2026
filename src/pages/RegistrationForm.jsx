import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Reference for the PDF generation
  const receiptRef = useRef(null);

  const initialFormState = {
    fullName: '',
    email: '',
    mobile: '',
    institution: '',
    country: 'Sri Lanka',
    role: 'non-author',
    paperId: '',
    paperTitle: '',
    researchTrack: '',
    receipt: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, receipt: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Generate reference and date
    const refNumber = 'IMP-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const submitDate = new Date().toLocaleDateString('en-US');

    // 2. Convert Image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(formData.receipt);
    reader.onload = async () => {
      const base64Image = reader.result;

      const payload = {
        ...formData,
        referenceNumber: refNumber,
        submitDate: submitDate,
        receipt: base64Image // Send the image as text
      };

      // 3. Send to Google Apps Script
      // 3. Send to Google Apps Script
      // 3. Send to Google Apps Script
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxO3tNRwf4x7ymah98ozJIihNeDnEgXd7EgeOVoxMFuH24d4agSgnKeKsY6S3Qf_tielg/exec', {
          method: 'POST',
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload)
        });

        // Actually read the JSON response from our Google Script
        const result = await response.json();

        if (result.status === "success") {
          setReceiptData(payload);
          setIsSubmitted(true); // Only switch to success if Google says success!
        } else {
          // If Google caught an error, show it to us!
          alert("Google Error: " + result.message);
          console.error("Backend Error:", result);
        }

      } catch (error) {
        console.error("Network or parsing error", error);
        alert("Submission failed. Check the console.");
      }
    };
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setReceiptData(null);
    setIsSubmitted(false);
  };

  // Modern PDF Generation Logic
  const handleDownloadPDF = () => {
    const input = receiptRef.current;

    if (!input) return;

    toPng(input, {
      cacheBust: true,
      backgroundColor: '#ffffff', // Ensures a white background
      pixelRatio: 2 // High resolution output
    })
      .then((dataUrl) => {
        // Create a standard A4 portrait PDF
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        // Calculate height to maintain the aspect ratio of your receipt container
        const pdfHeight = (input.offsetHeight * pdfWidth) / input.offsetWidth;

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`IMPETUS_2026_Receipt_${receiptData.referenceNumber}.pdf`);
      })
      .catch((err) => {
        console.error('Oops, something went wrong!', err);
      });
  };

  // ==========================================
  // SUCCESS / PDF RECEIPT VIEW
  // ==========================================
  if (isSubmitted && receiptData) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 w-full min-h-screen flex flex-col items-center justify-start font-sans text-slate-800 bg-slate-100">

        {/* Web Success Banner */}
        <div className="w-full max-w-3xl mb-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-3 shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-extrabold text-emerald-900">Registration Successful!</h2>
          <p className="mt-1 text-emerald-700 text-sm font-medium">Your details have been securely recorded. Please download your receipt below.</p>
        </div>

        {/* The Document to be converted to PDF (This matches A4 aspect ratio nicely) */}
        <div className="w-full max-w-[210mm] bg-white shadow-2xl overflow-hidden" ref={receiptRef}>
          {/* Document Header */}
          <div className="bg-indigo-900 px-10 py-12 text-white flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black tracking-tight">IMPETUS 2026</h1>
              <p className="text-indigo-200 font-semibold tracking-widest text-sm mt-1 uppercase">Official Registration Receipt</p>
            </div>
            <div className="text-right">
              <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 text-center">
                <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-bold mb-1">Receipt Number</p>
                <p className="text-xl font-mono font-bold text-white">{receiptData.referenceNumber}</p>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-8">
            {/* Header Details */}
            <div className="flex justify-between items-end border-b-2 border-slate-100 pb-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Date Issued</p>
                <p className="text-base font-bold text-slate-800">{receiptData.submitDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Payment Status</p>
                <p className="text-base font-bold text-emerald-600 flex items-center justify-end gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Verified
                </p>
              </div>
            </div>

            {/* Attendee Info Section */}
            <div>
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 bg-indigo-50 inline-block px-3 py-1 rounded">Attendee Information</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-slate-800">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Full Name</p>
                  <p className="font-bold text-lg border-b border-slate-100 pb-2">{receiptData.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Email Address</p>
                  <p className="font-medium text-base border-b border-slate-100 pb-2">{receiptData.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Mobile</p>
                  <p className="font-medium text-base border-b border-slate-100 pb-2">{receiptData.mobile}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Institution</p>
                  <p className="font-medium text-base border-b border-slate-100 pb-2">{receiptData.institution}</p>
                </div>
              </div>
            </div>

            {/* Registration Details Section */}
            <div>
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 bg-indigo-50 inline-block px-3 py-1 rounded">Registration Profile</h3>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Role</p>
                    <p className="font-black text-indigo-800 uppercase">
                      {receiptData.role === 'author' ? 'Author / Presenter' : 'Non-Author / Attendee'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Country</p>
                    <p className="font-bold text-slate-800 uppercase">{receiptData.country}</p>
                  </div>

                  {receiptData.role === 'author' && (
                    <>
                      <div className="col-span-2 pt-4 mt-2 border-t border-slate-200">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Paper ID</p>
                        <p className="font-bold text-slate-800 text-lg">{receiptData.paperId}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Research Track</p>
                        <p className="font-bold text-slate-800">{receiptData.researchTrack}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Official Footer */}
            <div className="pt-8 pb-6 flex flex-col items-center justify-center">
              <div className="mb-2">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">Ref: {receiptData.referenceNumber}</p>
              </div>

              <div className="mt-4 text-center border-t border-slate-200 pt-6 w-full">
                <p className="text-xs text-slate-400 font-medium">This is a system-generated document. No signature is required.</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Please present this digital receipt at the registration desk upon arrival.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Web Action Buttons */}
        <div className="w-full max-w-[210mm] mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download High-Quality PDF
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center py-4 px-8 rounded-xl text-lg font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
          >
            Submit Another
          </button>
        </div>

      </div>
    );
  }

  // ==========================================
  // ORIGINAL FORM VIEW
  // ==========================================
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 w-full flex justify-center font-sans text-slate-800 bg-slate-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border border-slate-100">

        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-0 right-10 w-56 h-56 rounded-full bg-white blur-3xl"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white relative z-10">IMPETUS 2026</h1>
          <p className="mt-3 text-blue-100 text-lg font-medium relative z-10">Conference Registration Form</p>
        </div>

        <div className="p-6 md:p-10">

          <div className="mb-12 bg-slate-50/80 rounded-2xl p-6 md:p-8 border border-slate-200">
            <h2 className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Early Bird Registration Fees
            </h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100/50 text-slate-800">
                  <tr>
                    <th className="px-5 py-4 font-semibold border-b border-slate-200">CATEGORY</th>
                    <th className="px-5 py-4 font-semibold border-b border-slate-200">ONLINE PRESENTERS</th>
                    <th className="px-5 py-4 font-semibold border-b border-slate-200">PHYSICAL PRESENTERS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-900">Students **</td>
                    <td className="px-5 py-4">LKR 2,500</td>
                    <td className="px-5 py-4">LKR 3,000</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-900">Local</td>
                    <td className="px-5 py-4">LKR 5,000</td>
                    <td className="px-5 py-4">LKR 6,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">

            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
                <p className="text-sm text-slate-500 mt-1">Please provide your accurate contact details.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-1 sm:col-span-2 group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name with Initials <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="e.g. A.B. Smith" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200" />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="you@institution.edu" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200" />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile (with country code) <span className="text-red-500">*</span></label>
                  <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} placeholder="+94 77 123 4567" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200" />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Institution / Organization <span className="text-red-500">*</span></label>
                  <input type="text" name="institution" required value={formData.institution} onChange={handleInputChange} placeholder="University / Organization" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200" />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" name="country" readOnly value={formData.country} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-100/70 text-slate-500 cursor-not-allowed outline-none select-none" title="Registration currently restricted to Sri Lanka" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-800">Participation Role</h3>
                <p className="text-sm text-slate-500 mt-1">Select your primary role for the conference.</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className={`relative flex cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${formData.role === 'author' ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                  <input type="radio" name="role" value="author" checked={formData.role === 'author'} onChange={handleInputChange} className="sr-only" />
                  <div className="flex w-full items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${formData.role === 'author' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        {formData.role === 'author' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="text-sm">
                        <p className={`font-bold text-base ${formData.role === 'author' ? 'text-indigo-900' : 'text-slate-800'}`}>Author / Presenter</p>
                        <p className={`mt-1 ${formData.role === 'author' ? 'text-indigo-700/80' : 'text-slate-500'}`}>Presenting an accepted paper at IMPETUS 2026</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`relative flex cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${formData.role === 'non-author' ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                  <input type="radio" name="role" value="non-author" checked={formData.role === 'non-author'} onChange={handleInputChange} className="sr-only" />
                  <div className="flex w-full items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${formData.role === 'non-author' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        {formData.role === 'non-author' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="text-sm">
                        <p className={`font-bold text-base ${formData.role === 'non-author' ? 'text-indigo-900' : 'text-slate-800'}`}>Non-Author / Attendee</p>
                        <p className={`mt-1 ${formData.role === 'non-author' ? 'text-indigo-700/80' : 'text-slate-500'}`}>Attending without presenting a paper</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {formData.role === 'author' && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-6 transition-all duration-300 ease-in-out">
                <div className="flex items-center text-amber-800 bg-amber-100/50 p-4 rounded-xl border border-amber-200/50">
                  <svg className="w-6 h-6 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  <p className="text-sm font-semibold">Important: Enter details exactly as submitted to CMT.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Paper ID <span className="text-red-500">*</span></label>
                    <input type="text" name="paperId" required value={formData.paperId} onChange={handleInputChange} placeholder="e.g. 101" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Paper Title <span className="text-red-500">*</span></label>
                    <input type="text" name="paperTitle" required value={formData.paperTitle} onChange={handleInputChange} placeholder="Full title as submitted" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Research Track <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select name="researchTrack" required value={formData.researchTrack} onChange={handleInputChange} className="appearance-none w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm cursor-pointer">
                        <option value="" disabled>Select a track</option>
                        <option value="Track 1: Computing & Industrial Information Systems">Track 1: Computing & Industrial Information Systems</option>
                        <option value="Track 2: Data Science & Artificial Intelligence">Track 2: Data Science & Artificial Intelligence</option>
                        <option value="Track 3: Robotics, Mechatronics & Embedded Systems">Track 3: Robotics, Mechatronics & Embedded Systems</option>
                        <option value="Track 4: Science & Technology">Track 4: Science & Technology</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-800">Payment Details</h3>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:bg-slate-50/50 hover:border-indigo-400 transition-all duration-200">
                  <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4">
                    <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                    </svg>
                  </div>
                  <label className="block text-lg font-bold text-slate-800 mb-2">Upload Bank Payment Receipt <span className="text-red-500">*</span></label>
                  <p className="text-sm text-slate-500 mb-6">Supported formats: PDF, JPG, PNG (Max size: 5MB)</p>
                  <input
                    type="file"
                    name="receipt"
                    accept="image/*,.pdf"
                    required
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer mx-auto max-w-md transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center items-center gap-2 py-4 px-8 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-indigo-900/20">
                Submit Registration
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
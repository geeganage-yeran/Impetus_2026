import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { CreditCard } from 'lucide-react';

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Reference for the PDF generation
  const receiptRef = useRef(null);

  const initialFormState = {
    fullName: '',
    email: '',
    mobile: '',
    institution: '',
    country: 'Sri Lanka',
    role: 'non-author',
    attendanceType: '',
    ieeeMemberId: '',
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
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size exceeds 5MB. Please upload a smaller file.');
        setFormData({ ...formData, receipt: null });
        e.target.value = '';
      } else {
        setFileError('');
        setFormData({ ...formData, receipt: file });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError || !formData.receipt) {
      alert("Please upload a valid payment receipt under 5MB.");
      return;
    }

    setIsProcessing(true);

    // 1. Calculate Base Amount & Discount
    let baseAmount = 0;
    let currency = 'LKR';

    if (formData.attendanceType === 'Student - Online') baseAmount = 2500;
    else if (formData.attendanceType === 'Student - Physical') baseAmount = 3000;
    else if (formData.attendanceType === 'Local - Online') baseAmount = 5000;
    else if (formData.attendanceType === 'Local - Physical') baseAmount = 6000;
    else if (formData.attendanceType === 'International - Online') { baseAmount = 60; currency = 'USD'; }
    else if (formData.attendanceType === 'International - Physical') { baseAmount = 80; currency = 'USD'; }

    // Apply 25% discount if an IEEE Member ID is provided AND it's not International
    let finalAmount = baseAmount;
    if (formData.ieeeMemberId && formData.ieeeMemberId.trim() !== '' && !formData.attendanceType.includes('International')) {
      finalAmount = baseAmount * 0.75;
    }

    const formattedAmount = currency === 'USD'
      ? `$${finalAmount.toFixed(2)} USD`
      : `LKR ${finalAmount.toLocaleString()}`;

    const refNumber = 'IMP-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const submitDate = new Date().toLocaleDateString('en-US');

    const reader = new FileReader();
    reader.readAsDataURL(formData.receipt);

    reader.onerror = () => {
      alert("Error reading file. Please try again.");
      setIsProcessing(false);
    };

    reader.onload = async () => {
      const base64Image = reader.result;

      const payload = {
        ...formData,
        referenceNumber: refNumber,
        submitDate: submitDate,
        amountPaid: formattedAmount, 
        receipt: base64Image
      };

      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxO3tNRwf4x7ymah98ozJIihNeDnEgXd7EgeOVoxMFuH24d4agSgnKeKsY6S3Qf_tielg/exec', {
          method: 'POST',
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.status === "success") {
          setReceiptData(payload);
          setIsSubmitted(true);
        } else {
          alert("Google Error: " + result.message);
          console.error("Backend Error:", result);
        }
      } catch (error) {
        console.error("Network or parsing error", error);
        alert("Submission failed. Check your internet connection and try again.");
      } finally {
        setIsProcessing(false);
      }
    };
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setReceiptData(null);
    setIsSubmitted(false);
    setIsProcessing(false);
    setFileError('');
  };

  const handleDownloadPDF = () => {
    const input = receiptRef.current;
    if (!input) return;

    toPng(input, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      pixelRatio: 2
    })
      .then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (input.offsetHeight * pdfWidth) / input.offsetWidth;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`IMPETUS_2026_Receipt_${receiptData.referenceNumber}.pdf`);
      })
      .catch((err) => {
        console.error('Oops, something went wrong!', err);
      });
  };

  // ==========================================
  // CALCULATE DISPLAY PRICE FOR UI DYNAMICALLY
  // ==========================================
  let displayBaseAmount = 0;
  let displayCurrency = 'LKR';

  if (formData.attendanceType === 'Student - Online') displayBaseAmount = 2500;
  else if (formData.attendanceType === 'Student - Physical') displayBaseAmount = 3000;
  else if (formData.attendanceType === 'Local - Online') displayBaseAmount = 5000;
  else if (formData.attendanceType === 'Local - Physical') displayBaseAmount = 6000;
  else if (formData.attendanceType === 'International - Online') { displayBaseAmount = 60; displayCurrency = 'USD'; }
  else if (formData.attendanceType === 'International - Physical') { displayBaseAmount = 80; displayCurrency = 'USD'; }

  let displayFinalAmount = displayBaseAmount;
  let hasDiscount = false;
  // Make sure International participants don't get the discount in the UI
  if (formData.ieeeMemberId && formData.ieeeMemberId.trim() !== '' && !formData.attendanceType.includes('International')) {
    displayFinalAmount = displayBaseAmount * 0.75;
    hasDiscount = true;
  }

  const formattedDisplayAmount = displayCurrency === 'USD'
    ? `$${displayFinalAmount.toFixed(2)} USD`
    : `LKR ${displayFinalAmount.toLocaleString()}`;
    
  const formattedBaseAmount = displayCurrency === 'USD'
    ? `$${displayBaseAmount.toFixed(2)} USD`
    : `LKR ${displayBaseAmount.toLocaleString()}`;


  if (isSubmitted && receiptData) {
    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 w-full min-h-screen flex flex-col items-center justify-start font-sans text-slate-800 bg-gray-50/50">
        <div className="w-full max-w-3xl mb-12 bg-white border border-emerald-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-5 border border-emerald-100 shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Registration Successful!</h2>
          <p className="text-slate-500 text-base max-w-md">Your details have been securely recorded. Please download your official receipt below and keep it for your records.</p>
        </div>

        <div className="w-full max-w-[210mm] bg-white shadow-2xl ring-1 ring-slate-900/5 mx-auto" ref={receiptRef}>
          <div className="bg-[#002b4b] px-12 py-14 text-white flex justify-between items-center border-b-[6px] border-[#005596]">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">IMPETUS <span className="text-blue-300">2026</span></h1>
              <p className="text-blue-100 font-medium tracking-widest text-xs uppercase">Official Registration Receipt</p>
            </div>
            <div className="text-right">
              <div className="bg-white/10 px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold mb-1">Receipt No.</p>
                <p className="text-xl font-mono font-bold text-white tracking-wider">{receiptData.referenceNumber}</p>
              </div>
            </div>
          </div>

          <div className="p-12 space-y-10">
            <div className="flex justify-between items-end border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1.5">Date Issued</p>
                <p className="text-base font-bold text-slate-800">{receiptData.submitDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1.5">Payment Status</p>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  <p className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Verified</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005596] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 className="text-base font-bold text-[#002b4b] uppercase tracking-widest">Attendee Information</h3>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12 text-slate-800 bg-slate-50/50 p-8 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Full Name</p>
                  <p className="font-bold text-lg text-slate-900">{receiptData.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Email Address</p>
                  <p className="font-medium text-base text-slate-700">{receiptData.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Mobile</p>
                  <p className="font-medium text-base text-slate-700">{receiptData.mobile}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Institution</p>
                  <p className="font-medium text-base text-slate-700">{receiptData.institution}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h3 className="text-base font-bold text-[#002b4b] uppercase tracking-widest">Registration Profile</h3>
              </div>

              <div className="bg-white border-2 border-slate-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Role</p>
                    <p className="font-black text-indigo-700 uppercase tracking-wide">
                      {receiptData.role === 'author' ? 'Author / Presenter' : 'Non-Author / Attendee'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Country</p>
                    <p className="font-bold text-slate-800 uppercase">{receiptData.country}</p>
                  </div>

                  <div className="col-span-2 pt-6 mt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Category / Attendance</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-800 text-lg">{receiptData.attendanceType}</p>
                      <p className="font-bold text-emerald-600 text-lg bg-emerald-50 px-4 py-1.5 rounded-lg border border-emerald-100">
                        Paid: {receiptData.amountPaid}
                      </p>
                    </div>
                  </div>

                  {/* Hide IEEE Member ID on receipt if it's international (or if they didn't fill it) */}
                  {receiptData.ieeeMemberId && !receiptData.attendanceType?.includes('International') && (
                    <div className="col-span-2">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">IEEE Membership ID</p>
                      <p className="font-bold text-slate-800 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-200">{receiptData.ieeeMemberId}</p>
                    </div>
                  )}

                  {receiptData.role === 'author' && (
                    <>
                      <div className="col-span-2 pt-6 mt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Paper Title & ID</p>
                        <p className="font-bold text-slate-900 text-lg mb-1">{receiptData.paperTitle}</p>
                        <p className="font-mono text-sm text-indigo-600 font-bold">ID: {receiptData.paperId}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Research Track</p>
                        <p className="font-medium text-slate-700 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-200">{receiptData.researchTrack}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-10 flex flex-col items-center justify-center">
              <div className="w-full text-center border-t border-slate-200 pt-8">
                <p className="text-[11px] text-slate-400 font-medium tracking-wide">This is a system-generated document. No signature is required.</p>
                <p className="text-[11px] text-slate-400 font-medium tracking-wide mt-1">Please present this digital receipt at the registration desk upon arrival.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[210mm] mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-lg font-bold text-white bg-[#005596] hover:bg-[#003b69] transition-all shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download Official PDF
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center py-4 px-8 rounded-2xl text-lg font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
          >
            Submit Another
          </button>
        </div>

      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 w-full min-h-screen flex flex-col items-center justify-center font-sans text-slate-800 bg-slate-50">
        <div className="flex flex-col items-center justify-center bg-white p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 max-w-md w-full text-center transform transition-all animate-fade-in-up">

          <div className="relative w-28 h-28 mb-8">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-indigo-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
          </div>

          <h3 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Processing...</h3>
          <p className="text-slate-500 text-base leading-relaxed">
            Please wait while we securely upload your registration details and payment receipt to IMPETUS servers. <br /><br />
            <span className="font-semibold text-indigo-500">Do not refresh or close this page.</span>
          </p>
        </div>
      </div>
    );
  }

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

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#005596] flex items-center gap-2">
                <CreditCard className="w-6 h-6" /> Registration Fees
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 text-sm uppercase tracking-wider">
                    <th rowSpan="2" className="py-4 px-6 text-left border-r border-gray-200">Category</th>
                    <th colSpan="2" className="py-2 px-6 text-center border-r border-gray-200 bg-blue-50/50 text-[#005596]">Early Bird Registration</th>
                    <th colSpan="2" className="py-2 px-6 text-center bg-amber-50/50 text-amber-700">Late Registration</th>
                  </tr>
                  <tr className="bg-slate-50 text-slate-600 text-xs uppercase">
                    <th className="py-3 px-6 text-center border-r border-gray-200 bg-blue-50/30">Online Presenters</th>
                    <th className="py-3 px-6 text-center border-r border-gray-200 bg-blue-50/30">Physical Presenters</th>
                    <th className="py-3 px-6 text-center border-r border-gray-200 bg-amber-50/30">Online Presenters</th>
                    <th className="py-3 px-6 text-center bg-amber-50/30">Physical Presenters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 border-r border-gray-100">
                      Students <span className="text-amber-600 font-bold">**</span>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div>LKR 2,500</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 1,875</div>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div>LKR 3,000</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 2,250</div>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div>LKR 3,500</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 2,625</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div>LKR 4,000</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 3,000</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors bg-slate-50/30">
                    <td className="py-4 px-6 border-r border-gray-100">
                      Local <span className="text-amber-600 font-bold">**</span>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div>LKR 5,000</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 3,750</div>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div>LKR 6,000</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 4,500</div>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div>LKR 6,500</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 4,875</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div>LKR 7,500</div>
                      <div className="text-xs text-amber-600 font-bold mt-1 tracking-wide">IEEE: LKR 5,625</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors bg-blue-50/10 border-l-4 border-l-blue-500">
                    <td className="py-4 px-6 border-r border-gray-100 font-bold text-[#005596]">
                      International
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div className="font-bold">USD 60</div>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div className="font-bold">USD 80</div>
                    </td>
                    <td className="py-4 px-6 text-center border-r border-gray-100">
                      <div className="font-bold">USD 90</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="font-bold">USD 120</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-amber-50/50 text-sm text-amber-800 border-t border-amber-100">
              <span className="font-bold">**</span> 25% registration fee waiver applies to local (Student and Regular) participants with a valid IEEE membership.
            </div>
          </section>

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
                <h3 className="text-xl font-bold text-slate-800">Registration Category</h3>
                <p className="text-sm text-slate-500 mt-1">Select your attendance type and category.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-1 sm:col-span-2 group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category & Attendance <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select name="attendanceType" required value={formData.attendanceType} onChange={handleInputChange} className="appearance-none w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm cursor-pointer">
                      <option value="" disabled>Select your category...</option>
                      <option value="Student - Online">Student - Online (LKR 2,500)</option>
                      <option value="Student - Physical">Student - Physical (LKR 3,000)</option>
                      <option value="Local - Online">Local - Online (LKR 5,000)</option>
                      <option value="Local - Physical">Local - Physical (LKR 6,000)</option>
                      <option value="International - Online">International - Online (USD 60)</option>
                      <option value="International - Physical">International - Physical (USD 80)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    IEEE Membership ID <span className="text-slate-400 font-normal">(Optional {formData.attendanceType && !formData.attendanceType.includes('International') ? '- 25% Discount Applied' : ''})</span>
                  </label>
                  <input type="text" name="ieeeMemberId" value={formData.ieeeMemberId} onChange={handleInputChange} placeholder="e.g. 98765432" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200" />
                </div>

                {/* --- NEW DYNAMIC PRICE FIELD --- */}
                {formData.attendanceType && (
                  <div className="col-span-1 sm:col-span-2 group animate-fade-in-up mt-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Total Amount Payable</label>
                    <div className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/80 text-emerald-900 flex items-center justify-between shadow-sm transition-all duration-300">
                      <span className="font-bold flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Amount Due
                      </span>
                      <div className="flex items-center gap-3">
                        {hasDiscount && (
                          <span className="text-sm line-through text-emerald-600/60 font-bold">
                            {formattedBaseAmount}
                          </span>
                        )}
                        <span className="text-2xl font-black text-emerald-700">
                          {formattedDisplayAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* --- END NEW DYNAMIC PRICE FIELD --- */}

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

                  {fileError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {fileError}
                    </div>
                  )}

                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className={`w-full flex justify-center items-center gap-2 py-4 px-8 rounded-xl text-lg font-bold text-white transition-all duration-200 shadow-lg shadow-indigo-900/20 
                  ${fileError ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transform hover:-translate-y-0.5'}`}
              >
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
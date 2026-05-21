import React from 'react';
import { Link } from 'react-router-dom'; // Added for navigation
import { 
  CreditCard, 
  Landmark, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  PackageCheck,
  Monitor,
  Users,
  FileText,
  Download
} from 'lucide-react';

export default function Registration() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      
      {/* Header Banner */}
      <div className="bg-[#002b4b] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Registration</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Secure your spot at IMPETUS 2026. Please review the fee structure and guidelines below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Important Deadline Alert */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-lg mb-12 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-1">Important Notice for Authors</h3>
            <p className="text-amber-800 leading-relaxed">
              Authors/Presenters must register for the conference on or before <span className="font-bold">May 20, 2026</span>. 
              The full paper will <span className="underline">not</span> be included in the proceedings if at least one author does not register before the deadline.
            </p>
          </div>
        </div>

        {/* 1. Registration Fees Table */}
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

        {/* 2. Payment Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">1. Bank Transfer</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong className="text-gray-900">A/C Name:</strong> Uva Wellassa University</li>
                <li><strong className="text-gray-900">Bank Details:</strong> Bank of Ceylon, Badulla Branch</li>
                <li><strong className="text-gray-900">A/C No:</strong> 0003114820</li>
                <li><strong className="text-gray-900">Bank Code:</strong> 7010</li>
                <li><strong className="text-gray-900">Bank Branch Code:</strong> 011</li>
                <li><strong className="text-gray-900">Swift Code:</strong> BCEYLKLX</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Online Payment</h3>
              <p className="text-sm text-gray-500 mb-2">Credit / Debit Card</p>
              <p className="text-sm font-semibold text-purple-700 mb-6 bg-purple-50 inline-block px-2 py-1 rounded self-start">
                (For the International Participant)
              </p>
              <Link 
                to="/pay/" 
                className="mt-auto block text-center w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
              >
                Go to Registration & Payment
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Shroff Counter</h3>
              <p className="text-sm text-gray-500 mb-4">For UWU Students/Staff</p>
              <p className="text-sm text-gray-600">
                Payments can be made directly at the Shroff Counter.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200">
                <strong>Location:</strong><br/>
                Ground Floor,<br/>
                Senate Building, UWU
              </div>
            </div>

          </div>
        </section>

        {/* 3. Registration Steps */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Registration Steps</h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm text-center group hover:border-blue-300 transition-all">
                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">1</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Make Payment</h3>
                <p className="text-gray-600 text-sm">Make the payment using one of the methods listed above.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm text-center group hover:border-blue-300 transition-all">
                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Fill Registration Form</h3>
                <p className="text-gray-600 text-sm mb-4">Complete the online form by clicking "Register Now" and submit it with the payment receipt.</p>
                <p className="text-xs text-amber-600 mt-2 font-medium italic">(Registration will be available after May 02nd)</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm text-center group hover:border-blue-300 transition-all">
                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">3</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">CMT Upload</h3>
                <p className="text-gray-600 text-sm">Upload Camera-Ready Paper (final submission) via CMT, signed Author Declaration Form, and payment slip (online or physical).</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 flex flex-col items-center">
            <Link 
              to="/register-form" 
              className="bg-[#005596] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#003b69] transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20"
            >
              Go to Registration Form
            </Link>
            <p className="text-sm text-amber-700 mt-3 font-semibold bg-amber-50 px-4 py-1 rounded-full border border-amber-200">
              (Registration will be available after May 02nd)
            </p>
          </div>
        </section>

        {/* 4. Conference Package */}
        <section className="mb-16">
           <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <PackageCheck className="w-8 h-8 text-[#005596]" /> 
              Conference Package
            </h2>
            <p className="text-gray-600 mt-2">What is included in your registration fee</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="bg-white p-8 rounded-2xl border-t-4 border-blue-400 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-500" /> For Online Presenters
                </h3>
                <ul className="space-y-4">
                  {["e-Participation in all sessions", "e-Program Book", "e-Certificate"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="bg-white p-8 rounded-2xl border-t-4 border-[#005596] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#005596] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#005596]" /> For Physical Presenters
                </h3>
                <ul className="space-y-4">
                  {["Participation in all sessions", "e-Program Book", "e-Certificate", "Lunch / Refreshments"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#005596] flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
}
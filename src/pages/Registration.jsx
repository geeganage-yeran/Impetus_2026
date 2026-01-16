import React from 'react';
import { CreditCard, Globe } from 'lucide-react';

export default function Registration() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Registration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Secure your spot at IMPETUS 2026. Early bird rates available until Feb 9th.
          </p>
        </div>

        <div className="flex justify-center gap-8 max-w-5xl mx-auto px-4">
          {/* Local Participants */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
            {/* Content remains the same... */}
            <h3 className="text-2xl font-bold text-[#005596] mb-2">Local Participants</h3>
            <p className="text-gray-500 mb-6">For Sri Lankan University Students & Staff</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">LKR 5000<span className="text-lg font-normal text-gray-500">/person</span></div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li>• Full access to all sessions</li>
              <li>• Conference Kit</li>
              <li>• Lunch and Refreshments</li>
              <li>• Certificate of Participation</li>
            </ul>
            <button className="w-full py-4 bg-[#005596] text-white rounded-lg font-semibold hover:bg-[#00447a] transition-colors">
              Pay via Bank Transfer
            </button>
          </div>
        </div>

        {/* International Participants
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-500 relative overflow-hidden">
            <div className="absolute top-5 right-5 text-blue-500">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">International</h3>
            <p className="text-gray-500 mb-6">For International Delegates</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">$ 50<span className="text-lg font-normal text-gray-500">/person</span></div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li>• Hybrid / Virtual Access</li>
              <li>• Digital Conference Kit</li>
              <li>• E-Certificate</li>
              <li>• Publication Support</li>
            </ul>
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" /> Pay Online (Stripe)
            </button>
          </div> */}
      </div>
    </div>
  );
}
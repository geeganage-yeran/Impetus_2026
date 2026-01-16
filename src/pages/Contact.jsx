import React, { useState } from 'react';
import ContactSection from '../components/ContactSection'; // Import your existing design

export default function Contact() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (passcode === 'IMPETUS2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Access Code');
    }
  };

  return (
    <div className="pt-20">
      {/* Existing Contact Info Cards */}
      <ContactSection /> 

      {/* Coordinator Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Coordinators</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
            <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-lg">Prof. Sandya Kumari</h3>
                <p className="text-blue-600">Coordinator</p>
                <p className="text-gray-500">sandya@uwu.ac.lk</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-lg">Ms. Rashmi Abeywardhana</h3>
                <p className="text-blue-600">Secretary</p>
                <p className="text-gray-500">shinrashmi97@gmail.com</p>
            </div>
        </div>
      </div>

      {/* Protected Form Section */}
      <section className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-6">Send us a Message</h3>
          
          {!isAuthenticated ? (
            <form onSubmit={handleAuth} className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Passcode to access form
              </label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: IMPETUS2026"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button type="submit" className="w-full bg-[#005596] text-white py-3 rounded-lg font-semibold">
                Unlock Form
              </button>
            </form>
          ) : (
            <form className="space-y-4 animate-fade-in">
              <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm mb-4">
                Access Granted.
              </div>
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
              <textarea placeholder="Message" rows="4" className="w-full p-3 border rounded-lg"></textarea>
              <button className="w-full bg-[#005596] text-white py-3 rounded-lg font-semibold hover:bg-[#00447a]">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
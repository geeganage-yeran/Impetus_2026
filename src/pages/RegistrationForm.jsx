import React, { useState } from 'react';
import { Landmark, CreditCard, Upload, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'Local Presenter (Early Bird)',
    receiptFile: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, receiptFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Logic to determine amount
      let amount = 0;
      let currency = 'lkr';

      if (formData.category.includes('Student')) amount = 2500;
      else if (formData.category.includes('Local')) amount = 5000;
      else {
        amount = 60;
        currency = 'usd';
      }

      // --- BANK TRANSFER FLOW ---
      if (paymentMethod === 'bank') {
        if (!formData.receiptFile) {
          alert("Please upload your bank transfer receipt.");
          setIsLoading(false);
          return;
        }

        const submitData = new FormData();
        submitData.append('fullName', formData.fullName);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('category', formData.category);
        submitData.append('amount', amount);
        submitData.append('currency', currency);
        submitData.append('receipt', formData.receiptFile);

        const response = await fetch('http://localhost:5000/api/register-bank', {
          method: 'POST',
          body: submitData, 
        });

        if (response.ok) {
          alert("Registration submitted successfully! We will verify your bank receipt.");
          window.location.href = '/'; // Redirect home or to a success page
        } else {
          alert("Error submitting registration.");
        }
      } 
      
      // --- ONLINE PAYMENT FLOW ---
      else if (paymentMethod === 'online') {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          amount: amount,
          currency: currency
        };

        const response = await fetch('http://localhost:5000/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url; // Redirect to Stripe
        } else {
          alert("Payment gateway error. Please try again.");
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Could not connect to the server. Ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/registration" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Fee Guidelines
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="bg-[#002b4b] p-8 md:p-10 text-white text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Participant Registration</h1>
            <p className="text-blue-200">Fill in your details and select your payment method.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
            
            {/* Step 1: Personal Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Dr. Jane Doe"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="jane@university.edu"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="+94 77 123 4567"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white">
                    <option value="Local Student (Early Bird)">Local Student (LKR 2,500)</option>
                    <option value="Local Presenter (Early Bird)">Local Presenter (LKR 5,000)</option>
                    <option value="International Presenter (Early Bird)">International Presenter (USD 60)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Bank Transfer Label */}
                <label className={`relative flex flex-col p-6 cursor-pointer rounded-xl border-2 transition-all ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-200 bg-white'}`}>
                  <input type="radio" name="paymentMethod" value="bank" className="absolute opacity-0" onChange={(e) => setPaymentMethod(e.target.value)} required/>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${paymentMethod === 'bank' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}><Landmark className="w-6 h-6" /></div>
                    <span className="text-lg font-bold text-gray-900">Bank Transfer</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Transfer funds directly to the University account and upload the receipt below.</p>
                  
                  {/* File Upload visible only when bank is selected */}
                  {paymentMethod === 'bank' && (
                    <div className="mt-auto animate-fade-in pt-4 border-t border-blue-200">
                      <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-blue-400 bg-white text-blue-600 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <Upload className="w-5 h-5" />
                        <span className="text-sm font-semibold truncate max-w-[200px]">{formData.receiptFile ? formData.receiptFile.name : 'Upload Payment Receipt'}</span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                      </label>
                    </div>
                  )}
                </label>

                {/* Online Payment Label */}
                <label className={`relative flex flex-col p-6 cursor-pointer rounded-xl border-2 transition-all ${paymentMethod === 'online' ? 'border-purple-500 bg-purple-50/50' : 'border-gray-200 hover:border-purple-200 bg-white'}`}>
                  <input type="radio" name="paymentMethod" value="online" className="absolute opacity-0" onChange={(e) => setPaymentMethod(e.target.value)} required/>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${paymentMethod === 'online' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}><CreditCard className="w-6 h-6" /></div>
                    <span className="text-lg font-bold text-gray-900">Online Payment</span>
                  </div>
                  <p className="text-sm text-gray-600">Pay securely via Credit or Debit Card using our global payment gateway.</p>
                </label>
              </div>
            </div>

            {/* Step 3: Action */}
            <div className="pt-6 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={isLoading || !paymentMethod}
                className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-all shadow-lg
                  ${isLoading || !paymentMethod ? 'bg-gray-300 cursor-not-allowed shadow-none text-gray-500' 
                  : paymentMethod === 'bank' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'}
                `}
              >
                {isLoading 
                  ? 'Processing...' 
                  : paymentMethod === 'bank' 
                    ? 'Submit Registration & Receipt' 
                    : paymentMethod === 'online'
                      ? 'Proceed to Secure Checkout'
                      : 'Select a Payment Method'
                }
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
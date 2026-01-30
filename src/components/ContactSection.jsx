import React from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ExternalLink, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-5 sm:py-5 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-15 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 font-semibold">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about IMPETUS 2026? We'd love to hear from you. Reach out to our organizing committee
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Email Card */}
          <div data-aos="fade-up" className="group relative overflow-hidden rounded-2xl bg-white p-8 border border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-16 -mt-16 opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-[#005596] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">Email</h3>
              <a
                href="mailto:impetus@ieee.uwu.ac.lk"
                className="text-[#005596] font-medium inline-flex items-center gap-2 group/link"
              >
                impetus@ieee.uwu.ac.lk
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all" />
              </a>
              <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
            </div>
          </div>

          {/* Phone Card */}
          <div data-aos="fade-up" className="group relative overflow-hidden rounded-2xl bg-white p-8 border border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-16 -mt-16 opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-[#005596] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">Phone</h3>
              <a href="tel:+94551234567" className="text-[#005596] font-medium inline-flex items-center gap-2 group/link">
                +94 71 915 1945
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all" />
              </a>
              <p className="text-sm text-gray-500 mt-2">Monday - Friday, 9 AM - 5 PM</p>
            </div>
          </div>

          {/* Address Card */}
          <div data-aos="fade-up" className="group relative overflow-hidden rounded-2xl bg-white p-8 border border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-16 -mt-16 opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-[#005596] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">Address</h3>
              <p className="text-sm text-gray-600">
                IEEE UWU Student Branch
                <br />
                Faculty of Applied Sciences
                <br />
                Uva Wellassa University
                <br />
                Badulla, Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
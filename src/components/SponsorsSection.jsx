import React from "react";
import { Handshake, Award, Building2, Users } from "lucide-react";
import ieeeLogo from "../assets/ieee.png";
import uniLogo from "../assets/university.png";  

const sponsors = [
  { name: "Microsoft", placeholder: "MS" },
  { name: "IEEE", placeholder: "IEEE" },
  { name: "Tech Partner", placeholder: "TP" },
  { name: "University", placeholder: "UNI" },
];

export default function SponsorsSection() {
  return (
    <section className="py-10 sm:py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-semibold">
            Sponsors & Partners
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            IMPETUS is made possible through the support of our valued sponsors
            and partners
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="relative overflow-hidden p-8 sm:p-12 bg-white rounded-2xl shadow-xl border-2 border-blue-100 mb-12 sm:mb-16 hover:shadow-2xl transition-all duration-300"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-30 h-30 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-30 rounded-full -mr-10 -mt-10"></div>

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 bg-blue-100 text-[#005596] rounded-full">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Organized By</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-8">
              {/* IEEE UWU Student Branch */}
              <a
                href="https://www.ieeeuwu.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <img
                    src={ieeeLogo}
                    alt="IEEE Uva Wellassa University"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                </div>
                <p className="text-gray-900 font-semibold text-lg">
                  IEEE Uva Wellassa University
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Student Branch
                </p>
              </a>

              {/* Faculty of Applied Sciences */}
              <a
                href="https://fas.uwu.ac.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <img
                    src={uniLogo}
                    alt="Faculty of Applied Sciences"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                </div>
                <p className="text-gray-900 font-semibold text-lg">
                  Faculty of Applied Sciences
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Uva Wellassa University
                </p>
              </a>
            </div>
          </div>
        </div>
        {/* Sponsors Grid */}
        <div data-aos="fade-up" className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl text-gray-900 font-light text-center mb-8">
            Our Sponsors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-[#1a66a1] hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300">
                    <span className="text-gray-500 text-lg font-bold group-hover:text-blue-600 transition-colors duration-300">
                      {sponsor.placeholder}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {sponsor.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* <div className="relative overflow-hidden p-8 sm:p-12 bg-gradient-to-br from-[#005596] to-[#3377ab] rounded-2xl shadow-2xl text-center transform hover:scale-[1.02] transition-all duration-300">
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>

          <div className="relative flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Handshake className="w-10 h-10 animate-pulse text-white" />
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl text-white mb-4 font-semibold">
                Become a Sponsor
              </h3>
              <p className="text-base sm:text-lg text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join us in supporting innovation and academic excellence.
                Partner with IMPETUS to showcase your commitment to advancing
                technology for humanity.
              </p>
              <button className="bg-white cursor-pointer text-[#005596] hover:bg-gray-100 px-8 py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg">
                Explore Sponsorship Opportunities
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

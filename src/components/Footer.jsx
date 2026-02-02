import React from "react";
import { Link } from "react-router-dom";
import whiteLogo from "../assets/whitelogo.png"; 

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-[#020617] via-[#001e35] to-[#002b4b] text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Intro */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="inline-block mb-6 hover:opacity-80 transition-opacity"
            >
              <div className="w-48 h-auto">
                <img
                  src={whiteLogo}
                  alt="IMPETUS IEEE UWU"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <p className="text-blue-200/80 text-sm leading-relaxed max-w-sm">
              International Symposium on Computing, Engineering, and Technology. 
              Fostering innovation and ethical impact through multidisciplinary collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-blue-200/80">
              <li>
                <Link to="/" onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/author" onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Author Space
                </Link>
              </li>
              <li>
                <Link to="/committee" onClick={scrollToTop} className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Committees
                </Link>
              </li>
              <li>
                <a 
                  href="https://cmt3.research.microsoft.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Submit Full Paper
                </a>
              </li>
            </ul>
          </div>

          {/* Organized By */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Organized By</h4>
            <div className="space-y-4 text-sm text-blue-200/80">
              <div className="flex flex-col">
                <span className="text-white font-medium mb-0.5">Faculty of Applied Sciences</span>
                <span>Uva Wellassa University</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium mb-0.5">IEEE Student Branch</span>
                <span>Uva Wellassa University</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-blue-200/60">
            © 2026 IMPETUS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-blue-200/60">
            <Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
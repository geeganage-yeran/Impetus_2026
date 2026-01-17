import React from "react";
import whiteLogo from "../assets/whitelogo.png"; 
export default function Footer() {
  return (
    <footer className="bg-[#002b4b] text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:opacity-80 transition-opacity block"
            >
              <div className="w-40 h-12 flex items-center">
                <img
                  src={whiteLogo}
                  alt="IMPETUS IEEE UWU"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
            <p className="text-sm text-white/70 mt-4">
              International Symposium on Computing, Engineering, and Technology
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#theme" className="hover:text-white transition-colors">
                  Theme & Topics
                </a>
              </li>
              <li>
                <a
                  href="#submission"
                  className="hover:text-white transition-colors"
                >
                  Submit Paper
                </a>
              </li>
              <li>
                <a
                  href="#registration"
                  className="hover:text-white transition-colors"
                >
                  Registration
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Organized By */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Organized By</h4>
            <p className="text-sm text-white/70 mb-2">
              IEEE Uva Wellassa University Student Branch
            </p>
            <p className="text-sm text-white/70">
              Faculty of Applied Sciences
              <br />
              Uva Wellassa University
            </p>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
          <p className="text-sm text-white/70">
            © 2026 IMPETUS. All rights reserved. | Organized by IEEE UWU Student
            Branch
          </p>
        </div>
      </div>
    </footer>
  );
}
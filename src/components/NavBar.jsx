import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import blackLogo from "../assets/blacklogo.png"; 

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // For mobile dropdown toggle
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Defined Navigation Structure
  const navItems = [
    { path: "/", label: "Home" },
    { 
      label: "Author Space", 
      // Dropdown items
      children: [
        { path: "/author", label: "Submission" },
        { path: "/registration", label: "Registration" }
      ]
    },
    { path: "/committee", label: "Committees" },
    { path: "/contact", label: "Contact Us" },
  ];

  const isActive = (path) => location.pathname === path;

  // Toggle for mobile sub-menu
  const toggleDropdown = (label) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white shadow-md"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-40 h-12">
                  <img
                    src={blackLogo}
                    alt="IMPETUS Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => {
                // Render Dropdown Item
                if (item.children) {
                  return (
                    <div key={index} className="relative group">
                      <button 
                        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                          item.children.some(child => isActive(child.path))
                            ? "text-[#005596]"
                            : "text-slate-700 hover:text-[#005596]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-48 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                          {item.children.map((child, childIndex) => (
                            <Link
                              key={childIndex}
                              to={child.path}
                              className={`block px-4 py-2 text-sm hover:bg-blue-50 hover:text-[#005596] transition-colors ${
                                isActive(child.path) ? "text-[#005596] bg-blue-50 font-semibold" : "text-gray-600"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Render Standard Item
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive(item.path)
                        ? "text-[#005596]"
                        : "text-slate-700 hover:text-[#005596]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Submit Paper Button */}
              <a
                href="https://cmt3.research.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#005596] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#003b69] transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Submit Paper
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navItems.map((item, index) => {
              if (item.children) {
                return (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex justify-between items-center p-3 text-left font-medium rounded-lg ${
                        activeDropdown === item.label ? "bg-blue-50 text-[#005596]" : "text-slate-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                      {activeDropdown === item.label ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    
                    {/* Mobile Dropdown Content */}
                    <div 
                      className={`pl-4 space-y-1 bg-gray-50 transition-all duration-300 overflow-hidden ${
                        activeDropdown === item.label ? "max-h-40 py-2" : "max-h-0"
                      }`}
                    >
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block p-2 text-sm rounded-md ${
                            isActive(child.path) ? "text-[#005596] font-semibold" : "text-gray-600"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-3 text-slate-700 hover:bg-gray-50 rounded-lg font-medium ${
                    isActive(item.path) ? "text-[#005596] bg-blue-50" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            <a
              href="https://cmt3.research.microsoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#005596] text-white p-3 rounded-lg text-center font-semibold mt-4"
            >
              Submit Paper
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
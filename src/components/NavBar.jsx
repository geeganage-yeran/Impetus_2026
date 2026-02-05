import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import blackLogo from "../assets/logoBlack.png"; 

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/author", label: "Author Guidelines" }, // Renamed and separated
    { path: "/registration", label: "Registration" }, // Separated
    { path : "/program", label: "Program Details" },
    { path: "/committee", label: "Committees" },
    { path: "/contact", label: "Contact Us" },
  ];

  const isActive = (path) => location.pathname === path;

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
              {navItems.map((item) => (
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
              ))}
              
              {/* Submit Paper Button */}
              <a
                href="https://cmt3.research.microsoft.com/IMPETUS2026"
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
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 text-slate-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://cmt3.research.microsoft.com/IMPETUS2026"
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
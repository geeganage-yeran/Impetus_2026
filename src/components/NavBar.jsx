import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import blackLogo from "../assets/blacklogo.png"; 

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
    { path: "/cfp", label: "Call for Papers" },
    { path: "/committee", label: "Committee" },
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
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-35 h-70 sm:w-50 sm:h-12 flex items-center justify-center">
                
                {/* 2. USE THE VARIABLE HERE */}
                <img
                  src={blackLogo} 
                  alt="IMPETUS IEEE UWU"
                  className="w-full h-full object-contain"
                />

              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`cursor-pointer transition-colors font-medium text-sm ${
                    isActive(item.path)
                      ? "text-[#005596] font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/registration"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-[#005596] hover:bg-[#003b69] cursor-pointer text-white rounded-lg px-6 py-2.5 font-medium text-sm transition-all hover:shadow-lg"
              >
                Registration
              </Link>
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
            <Link
              to="/registration"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#005596] text-white p-3 rounded-lg text-center font-semibold"
            >
              Registration
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
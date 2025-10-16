import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "theme", label: "Theme" },
    { id: "submission", label: "Submission" },
    { id: "registration", label: "Registration" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:opacity-80 transition-opacity"
            >
              <div className="w-35 h-70 sm:w-50 sm:h-12 flex items-center justify-center">
                <img
                  src={
                    isScrolled
                      ? "../assets/blacklogo.png"
                      : "../assets/whitelogo.png"
                  }
                  alt="IMPETUS IEEE UWU"
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer transition-colors font-medium text-sm ${
                    isScrolled ? "text-slate-700 hover:text-slate-900 font-semibold " : "text-white hover:text-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("registration")}
                className="bg-[#005596] hover:bg-[#003b69] cursor-pointer text-white rounded-lg px-6 py-2.5 font-medium text-sm transition-all hover:shadow-lg"
              >
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-white hover:text-white/80"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Glass Effect Dropdown */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="mx-4 my-2 px-4 py-6 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-white/10">
                <button
                  onClick={() => scrollToSection("registration")}
                  className="w-full bg-white text-slate-900 hover:bg-white/90 rounded-lg px-4 py-3 font-semibold text-center transition-all shadow-lg"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

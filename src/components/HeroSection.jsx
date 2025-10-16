import { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function HeroAndCountdown() {
  const targetDate = new Date('2026-02-25T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [showFloatingCountdown, setShowFloatingCountdown] = useState(true);
  const fullText = 'IMPETUS 2026';
  const keepText = 'I'; // Text to keep (only the "I" letter)
  const typingSpeed = 150; // milliseconds per character
  const deletingSpeed = 100; // milliseconds per character when deleting
  const pauseBeforeDelete = 2000; // pause before starting to delete
  const pauseBeforeRetype = 500; // pause before retyping

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle scroll to show/hide floating countdown
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.3; // Hide when scrolled 70% of viewport
      
      setShowFloatingCountdown(scrollPosition < heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let currentIndex = keepText.length;
    let isDeleting = false;
    let timeoutId;

    // Start by showing the kept text (just "I")
    setTypedText(keepText);

    const type = () => {
      if (!isDeleting && currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(type, typingSpeed);
      } else if (!isDeleting && currentIndex > fullText.length) {
        // Finished typing, wait before deleting
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseBeforeDelete);
      } else if (isDeleting && currentIndex > keepText.length) {
        // Deleting (but keep the "I" letter)
        currentIndex--;
        setTypedText(fullText.slice(0, currentIndex));
        timeoutId = setTimeout(type, deletingSpeed);
      } else if (isDeleting && currentIndex === keepText.length) {
        // Finished deleting to the keep point (just "I"), wait before retyping
        isDeleting = false;
        timeoutId = setTimeout(() => {
          type();
        }, pauseBeforeRetype);
      }
    };

    timeoutId = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="intro.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Subtle Pattern Overlay (optional) */}
        {/* <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div> */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-3 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-medium transition-all hover:bg-white/15 animate-fade-in">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-white">February 25, 2026 (Tentative)</span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 text-white animate-fade-in-up">
              {typedText}
              {showCursor && <span className="animate-blink">|</span>}
            </h1>
            <div className="h-1 w-24 bg-white mx-auto"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            International Symposium on Computing,<br className="hidden sm:block" /> Engineering, and Technology
          </p>

          {/* Description */}
          <p className="sm:text-lg text-sm text-white/80 max-w-6xl font-extralight mx-auto mb-12 leading-relaxed px-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            IMPETUS is an International Research Symposium organized by the IEEE Uva Wellassa University Student Branch and the Faculty of Applied Sciences at Uva Wellassa University, Sri Lanka.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => scrollToSection('registration')}
              className="group px-8 py-4 bg-[#005596] text-white rounded-lg font-semibold text-base transition-all hover:bg-[#003b69] cursor-pointer hover:shadow-xl w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            
            <button
              onClick={() => scrollToSection('submission')}
              className="px-8 py-4 cursor-pointer bg-white/15 backdrop-blur-md border-2 border-white/30 text-white rounded-lg font-semibold text-base transition-all hover:bg-white/20 w-full sm:w-auto"
            >
              Submit Abstract
            </button>
          </div>
        </div>

        {/* Floating Countdown Widget */}
        <div 
          className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
            showFloatingCountdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-4 shadow-2xl">
            <div className="text-center mb-2">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Event Starts In</p>
            </div>
            <div className="flex gap-3">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hrs' },
                { value: timeLeft.minutes, label: 'Min' },
                { value: timeLeft.seconds, label: 'Sec' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-slate-800/50 rounded-lg px-3 py-2 min-w-[50px]">
                    <div className="text-2xl font-bold text-white">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-medium text-white/50 uppercase mt-1">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section - Professional Dark Background */}
      <section className="relative py-10 bg-slate-900 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div data-aos="fade-up" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2">
              Event Countdown
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Mark your calendar for this academic gathering
            </p>
          </div>

          {/* Countdown Single Line */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item, index) => (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:bg-slate-800/70 hover:border-slate-600 min-w-[110px] sm:min-w-[130px]">
                  {/* Content */}
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl font-bold mb-2 text-white transition-all duration-300 group-hover:scale-105">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                </div>

                {/* Separator (except last item) */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 text-2xl font-light text-slate-600">
                    :
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
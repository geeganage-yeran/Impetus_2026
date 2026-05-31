import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Globe, BookOpenCheck, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { useNavigate } from 'react-router-dom';

export default function HeroAndCountdown() {
  const navigate = useNavigate();
  const targetDate = new Date('2026-05-27T09:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventStarted, setIsEventStarted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [showFloatingCountdown, setShowFloatingCountdown] = useState(true);
  
  const fullText = 'IMPETUS 2026';
  const keepText = 'I'; 
  const typingSpeed = 150; 
  const deletingSpeed = 100; 
  const pauseBeforeDelete = 2000; 
  const pauseBeforeRetype = 500; 

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
      } else {
        setIsEventStarted(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.3; 
      setShowFloatingCountdown(scrollPosition < heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let currentIndex = keepText.length;
    let isDeleting = false;
    let timeoutId;

    setTypedText(keepText);

    const type = () => {
      if (!isDeleting && currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(type, typingSpeed);
      } else if (!isDeleting && currentIndex > fullText.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseBeforeDelete);
      } else if (isDeleting && currentIndex > keepText.length) {
        currentIndex--;
        setTypedText(fullText.slice(0, currentIndex));
        timeoutId = setTimeout(type, deletingSpeed);
      } else if (isDeleting && currentIndex === keepText.length) {
        isDeleting = false;
        timeoutId = setTimeout(() => {
          type();
        }, pauseBeforeRetype);
      }
    };

    timeoutId = setTimeout(type, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, []);

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
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30 text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 bg-black/40 backdrop-blur-md border border-white/30 rounded-full transition-all duration-300 hover:bg-black/50 hover:scale-105 hover:shadow-[0_0_20px_rgba(253,224,71,0.3)] animate-fade-in cursor-default group">
            <Calendar className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
            <div className="flex items-center gap-3 text-lg">
              <span className="text-white font-bold tracking-wide border-r border-white/30 pr-3">
                May 27, 2026
              </span>
              <span className="flex items-center gap-2 text-yellow-300 font-extrabold uppercase tracking-widest text-sm sm:text-base">
                <Globe className="w-4 h-4 animate-pulse" />
                Hybrid Mode
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 text-white animate-fade-in-up drop-shadow-2xl">
              {typedText}
              {showCursor && <span className="animate-blink">|</span>}
            </h1>
            <div className="h-1 w-24 bg-white mx-auto shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-6 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            International Conference on Computing,<br className="hidden sm:block" /> Engineering, and Technology
          </p>

          {/* EXTENDED DEADLINE HIGHLIGHT */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-full font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-400">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span className="uppercase tracking-wider text-sm md:text-base">
                Full Paper Submission Deadline Extended: April 10, 2026
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="sm:text-lg text-base text-gray-200 max-w-6xl mx-auto mb-12 leading-loose font-light px-4 text-center">
              <span className="text-white font-semibold text-xl tracking-wide mr-1">IMPETUS</span> 
              is a pioneering academic endeavor by the 
              <span className="text-white font-medium mx-1">Faculty of Applied Sciences, Uva Wellassa University of Sri Lanka</span>, 
              in collaboration with the 
              <span className="text-white font-medium mx-1">IEEE Uva Wellassa University Student Branch</span>. 
              Centered around the theme 
              <br className="hidden md:block" />
              <span className="text-yellow-300 font-medium text-xl inline-block my-2">"Humanity First: Steering Innovation for Ethical Impact"</span>
              <br className="hidden md:block" />
              The Conference emphasizes ethical, human-centered, and multidisciplinary innovation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            
            {/* Submit Papers Button */}
            <button
              disabled
              className="px-12 py-4 cursor-not-allowed bg-white/5 backdrop-blur-md border-2 border-white/20 text-white/50 rounded-lg font-bold text-lg transition-all w-full sm:w-auto shadow-none"
            >
              Submit Full Paper
            </button>

            {/* Publication Info Spotlight */}
            <div className="flex items-center gap-3 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 px-6 py-3 rounded-2xl shadow-xl max-w-2xl">
              <BookOpenCheck className="w-6 h-6 text-yellow-300 flex-shrink-0 animate-pulse" />
              <p className="text-white text-sm md:text-base font-semibold text-center leading-relaxed">
                All accepted and presented papers will receive a <span className="text-yellow-300 font-bold">DOI</span> and will be published in the conference proceedings.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Countdown Widget */}
        <div 
          className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
            showFloatingCountdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          {isEventStarted ? (
            <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 p-[2px] rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-pulse transition-all duration-300 hover:scale-105">
              <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 md:p-5 flex items-center gap-4 cursor-pointer hover:bg-slate-800/95 transition-colors">
                <div className="relative flex h-4 w-4">
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gray-500"></span>
                </div>
                <div>
                  <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400 uppercase tracking-widest">
                    Conference Ended
                  </p>
                  <p className="text-white text-xs md:text-sm font-medium mt-0.5">See you next year!</p>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* Countdown Section */}
      <section className="relative py-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div data-aos="fade-up" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isEventStarted ? (
            <div className="text-center py-12 px-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-yellow-500/30 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-6 ring-1 ring-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-bounce">
                  <Globe className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 mb-6 drop-shadow-lg tracking-tight">
                  The Conference has Ended!
                </h2>
                
                <p className="text-lg md:text-xl lg:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-10">
                  IMPETUS 2026 has officially concluded. See you next year!
                </p>
                
                <button 
                  disabled
                  className="relative inline-flex h-14 overflow-hidden rounded-full p-[2px] opacity-50 cursor-not-allowed"
                >
                  <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-900 px-8 py-1 text-lg font-bold text-white/50 backdrop-blur-3xl gap-2">
                    Join Conference Now
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2">
                  Event Countdown
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  Mark your calendar for this academic gathering
                </p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item, index) => (
                  <div key={index} className="group relative">
                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:bg-slate-800/70 hover:border-slate-600 min-w-[110px] sm:min-w-[130px]">
                      <div className="text-center">
                        <div className="text-5xl sm:text-6xl font-bold mb-2 text-white transition-all duration-300 group-hover:scale-105">
                          {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                          {item.label}
                        </div>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 text-2xl font-light text-slate-600">
                        :
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>
    </div>
  );
}
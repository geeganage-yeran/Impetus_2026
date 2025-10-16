import React from 'react';
import { MapPin, Video, Building2 } from 'lucide-react';

export default function VenueSection() {
  return (
    <section className="py-10 sm:py-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 font-bold">
            Venue & Accommodation
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Join us at the beautiful campus of Uva Wellassa University in Sri Lanka, with hybrid participation options available
          </p>
        </div>

        {/* Two Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Inaugural Session Card */}
          <div data-aos="fade-up" className="p-6 sm:p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2 font-semibold">Inaugural Session</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Physically at Uva Wellassa University
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              The opening ceremony will be held in person at the university's main auditorium, featuring distinguished guests, keynote addresses, and networking opportunities.
            </p>
          </div>

          {/* Technical Sessions Card */}
          <div data-aos="fade-up" className="p-6 sm:p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2 font-semibold">Technical Sessions & Closing</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Fully Online (Hybrid Mode)
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              All technical paper presentations and the closing ceremony will be conducted online, allowing global participation and accessibility.
            </p>
          </div>
        </div>

        {/* University Card with Image */}
        <div data-aos="fade-up" className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Image Section */}
            <div className="lg:col-span-2 relative h-64 lg:h-auto bg-gray-200">
              <img
                src="./src/assets/uni.jpg"
                alt="Uva Wellassa University Campus"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="lg:col-span-3 p-6 sm:p-8 bg-white">
              <h3 className="text-gray-900 mb-4 font-semibold text-lg">Uva Wellassa University</h3>
              
              <div className="space-y-4 mb-6">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 mb-1 font-medium">Location</p>
                    <p className="text-sm text-gray-600">
                      Badulla, Uva Province, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
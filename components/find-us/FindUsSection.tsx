import React from 'react';
import { Clock, ExternalLink, Hotel, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { CONTACT_INFO, GOOGLE_MAPS_URL, MAP_EMBED_URL } from '@/lib/constants';

export const FindUsSection: React.FC = () => {
  return (
    <section id="contact-info" className="py-20 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#741B2A] tracking-tight">
            Find Us
          </h2>

          {/* Gold Divider */}
          <div className="w-20 h-1 bg-[#C9A23A] mx-auto rounded-full" />
        </div>

        {/* Two Column Layout: Left Contact Card, Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Information Card (approx 35% on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl p-5 sm:p-8 border border-[#C9A23A]/20 shadow-md space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#741B2A] border-b border-gray-100 pb-4">
              Contact Information
            </h3>

            <div className="space-y-5 text-sm sm:text-base">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#741B2A] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#741B2A] font-serif text-sm">Address</h4>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#741B2A] transition-colors leading-snug font-medium flex items-center gap-1 group"
                  >
                    <span>{CONTACT_INFO.address}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#C9A23A] group-hover:scale-110 transition-transform flex-shrink-0" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#741B2A] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#741B2A] font-serif text-sm">Phone</h4>
                  <div className="space-y-0.5 text-gray-700">
                    {CONTACT_INFO.phones.map((phone, idx) => (
                      <p key={idx}>
                        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#C9A23A] transition-colors">
                          {phone}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#741B2A] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#741B2A] font-serif text-sm">Email</h4>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-gray-700 hover:text-[#C9A23A] transition-colors break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Restaurant Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#741B2A] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#741B2A] font-serif text-sm">Working Hours</h4>
                  <div className="text-gray-700 space-y-0.5">
                    {CONTACT_INFO.restaurantWorkingHours.map((hours, idx) => (
                      <p key={idx}>{hours}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Plus Code */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#741B2A] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#741B2A] font-serif text-sm">Plus Code</h4>
                  <p className="text-gray-700">{CONTACT_INFO.plusCode}</p>
                </div>
              </div>

              {/* Hotel Timings */}
              <div className="flex items-start space-x-4 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#741B2A] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#741B2A] font-serif text-sm">Hotel Timings</h4>
                  <p className="text-gray-700 text-sm">Check-in: {CONTACT_INFO.checkInTime}</p>
                  <p className="text-gray-700 text-sm">Check-out: {CONTACT_INFO.checkOutTime}</p>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#741B2A] hover:bg-[#5F1624] text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-[#C9A23A]/30 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#C9A23A]" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Map (approx 65% on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 h-[320px] sm:h-[420px] lg:h-full min-h-[320px] sm:min-h-[450px] bg-gray-200 rounded-2xl overflow-hidden border border-[#C9A23A]/30 shadow-md relative group">
            <iframe
              title="Hotel Aditya Grand Location Map"
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[10%] contrast-[105%]"
            />
            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/95 hover:bg-white text-[#741B2A] font-semibold rounded-xl text-xs shadow-lg transition-all border border-gray-200 flex items-center gap-1.5 backdrop-blur-xs cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#741B2A]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

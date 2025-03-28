
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

export default function LocationMap() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Visit Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Come experience our delicious food in person at our restaurant in the heart of Ho Chi Minh City.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-lg overflow-hidden shadow-md h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197356!2d106.699104!3d10.782357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa55e51688fc392f6!2sNguyen%20Hue%20Walking%20Street!5e0!3m2!1sen!2sus!4v1658258218185!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            />
          </div>
          
          <div className="lg:col-span-2 bg-brand-cream p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-brand-dark border-b border-brand-orange pb-2">
              Restaurant Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-brand-red mt-1 mr-3 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Address</h4>
                  <p className="text-gray-700">
                    123 Nguyen Hue Boulevard<br />
                    District 1, Ho Chi Minh City<br />
                    Vietnam
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-brand-red mt-1 mr-3 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Contact</h4>
                  <p className="text-gray-700">
                    Phone: +84 123 456 789<br />
                    Email: info@tastybowl.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-brand-red mt-1 mr-3 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Opening Hours</h4>
                  <p className="text-gray-700">
                    Monday - Friday: 10:00 - 22:00<br />
                    Saturday: 11:00 - 23:00<br />
                    Sunday: 12:00 - 22:00
                  </p>
                </div>
              </div>
              
              <Button className="w-full bg-brand-red hover:bg-red-700 text-white">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

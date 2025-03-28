
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Linh Nguyen",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    rating: 5,
    text: "The Pho Bo here is absolutely incredible! The broth is rich and flavorful, just like my grandmother used to make. I order from TastyBowl at least once a week."
  },
  {
    id: 2,
    name: "David Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "I've tried many Vietnamese restaurants in HCMC, but TastyBowl stands out for their authentic flavors and generous portions. The Banh Mi is a must-try!"
  },
  {
    id: 3,
    name: "Mai Tran",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 4,
    text: "As a local, I'm very picky about Vietnamese food, but TastyBowl does not disappoint. Their Bun Cha is exceptional, and the delivery is always prompt."
  }
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? "text-brand-yellow fill-brand-yellow" : "text-gray-300"}`} 
      />
    ));
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-brand-dark mb-4">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about our food and service.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

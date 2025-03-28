
import { Utensils, Clock, Truck, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Utensils className="h-10 w-10 text-brand-red" />,
    title: "Quality Ingredients",
    description: "We source the freshest ingredients from local markets every morning."
  },
  {
    icon: <Clock className="h-10 w-10 text-brand-orange" />,
    title: "Fast Delivery",
    description: "Our delivery team ensures your food arrives hot and fresh within 30 minutes."
  },
  {
    icon: <Truck className="h-10 w-10 text-brand-yellow" />,
    title: "Free Delivery",
    description: "Enjoy free delivery for all orders over 200,000 VND in District 1."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-brand-green" />,
    title: "Easy Payment",
    description: "Choose from multiple payment options including bank transfer and cash on delivery."
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-brand-dark mb-12">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

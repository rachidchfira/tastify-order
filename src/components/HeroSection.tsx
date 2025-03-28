
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-screen">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="hero-overlay"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Authentic Moroccan Flavors</h1>
          <p className="text-xl text-white/90 mb-8">
            Experience the rich and aromatic taste of Morocco in the heart of Ho Chi Minh City. 
            Order online for delivery or pickup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu">
              <Button className="px-8 py-6 bg-brand-red hover:bg-red-700 text-white text-lg">
                Explore Menu
              </Button>
            </Link>
            <Link to="/order">
              <Button className="px-8 py-6 bg-brand-yellow hover:bg-amber-500 text-brand-dark text-lg">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

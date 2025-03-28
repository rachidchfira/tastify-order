
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section 
      className="py-16 bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-brand-dark/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Order?</h2>
          <p className="text-xl text-white/90 mb-8">
            Experience the authentic taste of Vietnam delivered right to your doorstep.
            Order now and enjoy our special promotions!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button className="px-8 py-6 bg-brand-yellow hover:bg-amber-500 text-brand-dark text-lg">
                Explore Menu
              </Button>
            </Link>
            <Link to="/order">
              <Button className="px-8 py-6 bg-brand-red hover:bg-red-700 text-white text-lg">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

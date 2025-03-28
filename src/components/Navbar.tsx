
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className={`text-2xl font-bold ${isScrolled ? "text-brand-red" : "text-white"}`}>
            TastyBowl
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks isScrolled={isScrolled} />
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/cart">
            <Button variant="ghost" className={`p-2 relative ${isScrolled ? "text-brand-dark hover:text-brand-red" : "text-white hover:text-brand-yellow"}`}>
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              className={`p-2 ${isScrolled ? "text-brand-dark hover:text-brand-red" : "text-white hover:text-brand-yellow"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          
          <Link to="/order" className="hidden md:block">
            <Button className="bg-brand-red hover:bg-red-700 text-white">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-full left-0 right-0 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <NavLinks isMobile={true} />
            <Link to="/order">
              <Button className="w-full bg-brand-red hover:bg-red-700 text-white">
                Order Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

const NavLinks = ({ isScrolled = true, isMobile = false }) => {
  const linkClass = isMobile
    ? "text-brand-dark hover:text-brand-red font-medium"
    : `${isScrolled ? "text-brand-dark" : "text-white"} hover:text-brand-yellow font-medium transition-colors`;
    
  return (
    <>
      <Link to="/" className={linkClass}>Home</Link>
      <Link to="/menu" className={linkClass}>Menu</Link>
      <Link to="/about" className={linkClass}>About</Link>
      <Link to="/contact" className={linkClass}>Contact</Link>
    </>
  );
};

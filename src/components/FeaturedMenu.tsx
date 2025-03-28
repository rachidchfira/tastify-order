
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Menu Categories & Items
const categories = ["Popular", "Main Dishes", "Appetizers", "Drinks"];

const menuItems = {
  "Popular": [
    {
      id: "p1",
      name: "Pho Bo",
      description: "Traditional Vietnamese beef noodle soup with herbs and lime",
      price: 85000,
      image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Best Seller"
    },
    {
      id: "p2",
      name: "Banh Mi Thit",
      description: "Vietnamese sandwich with grilled pork, pickled vegetables, and pâté",
      price: 65000,
      image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Popular"
    },
    {
      id: "p3",
      name: "Bun Cha",
      description: "Grilled pork with rice vermicelli, herbs and dipping sauce",
      price: 75000,
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "p4",
      name: "Ca Phe Sua Da",
      description: "Vietnamese iced coffee with sweetened condensed milk",
      price: 35000,
      image: "https://images.unsplash.com/photo-1544788978-c0d118afa40b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Favorite"
    }
  ],
  "Main Dishes": [
    {
      id: "m1",
      name: "Com Tam Suon",
      description: "Broken rice with grilled pork chop, fried egg and vegetables",
      price: 80000,
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "m2",
      name: "Bun Bo Hue",
      description: "Spicy beef noodle soup from central Vietnam",
      price: 90000,
      image: "https://images.unsplash.com/photo-1614080262560-9feff9de8185?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Spicy"
    },
    {
      id: "m3",
      name: "Ca Kho To",
      description: "Caramelized fish in clay pot with vegetables and rice",
      price: 95000,
      image: "https://images.unsplash.com/photo-1518983546435-47245aaa6cc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "m4",
      name: "Bo Luc Lac",
      description: "Shaking beef with bell peppers and onions",
      price: 110000,
      image: "https://images.unsplash.com/photo-1545114687-d2acd3da74b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "New"
    }
  ],
  "Appetizers": [
    {
      id: "a1",
      name: "Goi Cuon",
      description: "Fresh spring rolls with shrimp, pork, herbs and peanut sauce",
      price: 55000,
      image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "a2",
      name: "Cha Gio",
      description: "Crispy fried spring rolls with dipping sauce",
      price: 60000,
      image: "https://images.unsplash.com/photo-1544795381-58119c606ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "a3",
      name: "Goi Ngo Sen",
      description: "Lotus root salad with shrimp, pork and herbs",
      price: 65000,
      image: "https://images.unsplash.com/photo-1538133251510-8acca97b019f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "a4",
      name: "Banh Xeo",
      description: "Crispy Vietnamese pancake with bean sprouts and herbs",
      price: 70000,
      image: "https://images.unsplash.com/photo-1606458000899-17185e4326ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Favorite"
    }
  ],
  "Drinks": [
    {
      id: "d1",
      name: "Ca Phe Sua Da",
      description: "Vietnamese iced coffee with sweetened condensed milk",
      price: 35000,
      image: "https://images.unsplash.com/photo-1544788978-c0d118afa40b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "d2",
      name: "Sinh To Bo",
      description: "Fresh avocado smoothie with condensed milk",
      price: 45000,
      image: "https://images.unsplash.com/photo-1590080875238-5a2952653ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    },
    {
      id: "d3",
      name: "Nuoc Mia",
      description: "Fresh sugarcane juice with kumquat",
      price: 30000,
      image: "https://images.unsplash.com/photo-1578577338344-3cc3dce7f1a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Refreshing"
    },
    {
      id: "d4",
      name: "Tra Da",
      description: "Vietnamese iced tea",
      price: 25000,
      image: "https://images.unsplash.com/photo-1541119257206-a9cf4353d655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    }
  ]
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

export default function FeaturedMenu() {
  const [activeTab, setActiveTab] = useState("Popular");
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
      duration: 3000,
    });
  };
  
  return (
    <section className="py-16 bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Our Menu</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our authentic Vietnamese dishes made with the freshest ingredients and traditional recipes.
          </p>
        </div>
        
        <Tabs defaultValue="Popular" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/80 backdrop-blur-sm">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-brand-red data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuItems[category as keyof typeof menuItems].map((item) => (
                  <div key={item.id} className="menu-item bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                      {item.badge && (
                        <span className="menu-badge">{item.badge}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 h-12 overflow-hidden">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-brand-red font-bold">{formatPrice(item.price)}</span>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-full hover:text-brand-red hover:border-brand-red"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button 
                            onClick={() => handleAddToCart(item)}
                            className="rounded-full bg-brand-red hover:bg-red-700"
                            size="icon"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link to="/menu">
                  <Button className="bg-brand-dark hover:bg-gray-800 text-white">
                    View Full Menu
                  </Button>
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

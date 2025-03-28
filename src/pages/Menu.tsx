
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Menu Categories & Items (Same as in FeaturedMenu)
const categories = ["All", "Main Dishes", "Appetizers", "Soups", "Noodles", "Rice Dishes", "Drinks", "Desserts"];

const allMenuItems = {
  "Main Dishes": [
    {
      id: "m1",
      name: "Com Tam Suon",
      description: "Broken rice with grilled pork chop, fried egg and vegetables",
      price: 80000,
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Main Dishes"
    },
    {
      id: "m2",
      name: "Bo Luc Lac",
      description: "Shaking beef with bell peppers and onions",
      price: 110000,
      image: "https://images.unsplash.com/photo-1545114687-d2acd3da74b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "New",
      category: "Main Dishes"
    },
    {
      id: "m3",
      name: "Ca Kho To",
      description: "Caramelized fish in clay pot with vegetables and rice",
      price: 95000,
      image: "https://images.unsplash.com/photo-1518983546435-47245aaa6cc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Main Dishes"
    },
    {
      id: "m4",
      name: "Ga Nuong",
      description: "Grilled lemongrass chicken with rice and vegetables",
      price: 85000,
      image: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Main Dishes"
    },
  ],
  "Appetizers": [
    {
      id: "a1",
      name: "Goi Cuon",
      description: "Fresh spring rolls with shrimp, pork, herbs and peanut sauce",
      price: 55000,
      image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Appetizers"
    },
    {
      id: "a2",
      name: "Cha Gio",
      description: "Crispy fried spring rolls with dipping sauce",
      price: 60000,
      image: "https://images.unsplash.com/photo-1544795381-58119c606ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Appetizers"
    },
    {
      id: "a3",
      name: "Goi Ngo Sen",
      description: "Lotus root salad with shrimp, pork and herbs",
      price: 65000,
      image: "https://images.unsplash.com/photo-1538133251510-8acca97b019f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Appetizers"
    },
    {
      id: "a4",
      name: "Banh Xeo",
      description: "Crispy Vietnamese pancake with bean sprouts and herbs",
      price: 70000,
      image: "https://images.unsplash.com/photo-1606458000899-17185e4326ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Favorite",
      category: "Appetizers"
    },
  ],
  "Soups": [
    {
      id: "s1",
      name: "Pho Bo",
      description: "Traditional Vietnamese beef noodle soup with herbs and lime",
      price: 85000,
      image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Best Seller",
      category: "Soups"
    },
    {
      id: "s2",
      name: "Bun Bo Hue",
      description: "Spicy beef noodle soup from central Vietnam",
      price: 90000,
      image: "https://images.unsplash.com/photo-1614080262560-9feff9de8185?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Spicy",
      category: "Soups"
    },
    {
      id: "s3",
      name: "Hu Tieu Nam Vang",
      description: "Cambodian-style noodle soup with pork and seafood",
      price: 80000,
      image: "https://images.unsplash.com/photo-1490716961549-5dbd18f53101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Soups"
    },
    {
      id: "s4",
      name: "Canh Chua Ca",
      description: "Sour soup with fish, pineapple, tomatoes and herbs",
      price: 75000,
      image: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Soups"
    },
  ],
  "Noodles": [
    {
      id: "n1",
      name: "Bun Cha",
      description: "Grilled pork with rice vermicelli, herbs and dipping sauce",
      price: 75000,
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Noodles"
    },
    {
      id: "n2",
      name: "Bun Thit Nuong",
      description: "Grilled pork with rice vermicelli and fresh herbs",
      price: 70000,
      image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Noodles"
    },
    {
      id: "n3",
      name: "Mi Xao Don",
      description: "Crispy fried egg noodles with stir-fried vegetables and meat",
      price: 80000,
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Noodles"
    },
    {
      id: "n4",
      name: "Hu Tieu Xao",
      description: "Stir-fried flat rice noodles with vegetables and meat",
      price: 75000,
      image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Noodles"
    },
  ],
  "Rice Dishes": [
    {
      id: "r1",
      name: "Com Chien Duong Chau",
      description: "Yangzhou fried rice with shrimp, pork, and vegetables",
      price: 70000,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Rice Dishes"
    },
    {
      id: "r2",
      name: "Com Ga Hainan",
      description: "Hainanese chicken rice with chili and ginger sauce",
      price: 75000,
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Rice Dishes"
    },
    {
      id: "r3",
      name: "Com Suon",
      description: "Grilled pork chop with rice and vegetables",
      price: 80000,
      image: "https://images.unsplash.com/photo-1625320276299-14d9b28db8b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Rice Dishes"
    },
    {
      id: "r4",
      name: "Com Ga Xoi Mo",
      description: "Crispy fried chicken with rice and dipping sauce",
      price: 85000,
      image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Rice Dishes"
    },
  ],
  "Drinks": [
    {
      id: "d1",
      name: "Ca Phe Sua Da",
      description: "Vietnamese iced coffee with sweetened condensed milk",
      price: 35000,
      image: "https://images.unsplash.com/photo-1544788978-c0d118afa40b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Drinks"
    },
    {
      id: "d2",
      name: "Sinh To Bo",
      description: "Fresh avocado smoothie with condensed milk",
      price: 45000,
      image: "https://images.unsplash.com/photo-1590080875238-5a2952653ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Drinks"
    },
    {
      id: "d3",
      name: "Nuoc Mia",
      description: "Fresh sugarcane juice with kumquat",
      price: 30000,
      image: "https://images.unsplash.com/photo-1578577338344-3cc3dce7f1a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      badge: "Refreshing",
      category: "Drinks"
    },
    {
      id: "d4",
      name: "Tra Da",
      description: "Vietnamese iced tea",
      price: 25000,
      image: "https://images.unsplash.com/photo-1541119257206-a9cf4353d655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Drinks"
    },
  ],
  "Desserts": [
    {
      id: "de1",
      name: "Che Ba Mau",
      description: "Three-color dessert with beans, jelly and coconut milk",
      price: 40000,
      image: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Desserts"
    },
    {
      id: "de2",
      name: "Banh Flan",
      description: "Vietnamese caramel custard",
      price: 35000,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Desserts"
    },
    {
      id: "de3",
      name: "Che Chuoi",
      description: "Banana in coconut milk with tapioca pearls",
      price: 38000,
      image: "https://images.unsplash.com/photo-1611293388250-580b08c4a145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Desserts"
    },
    {
      id: "de4",
      name: "Xoi Xeo",
      description: "Sweet sticky rice with mung bean and coconut",
      price: 35000,
      image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Desserts"
    },
  ],
};

// Create the All category by combining all items
const allItems = Object.values(allMenuItems).flat();

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  category: string;
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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
  
  const getFilteredItems = (category: string) => {
    let items = category === "All" ? allItems : allMenuItems[category as keyof typeof allMenuItems] || [];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    return items;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 bg-brand-cream">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-brand-dark mb-2">Our Menu</h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore our authentic Vietnamese dishes made with the freshest ingredients.
          </p>
          
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-8 overflow-x-auto">
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
                {getFilteredItems(category).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredItems(category).map((item) => (
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
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-600 text-lg mb-4">No items found matching your search criteria.</p>
                    <Button 
                      onClick={() => setSearchQuery("")}
                      variant="outline"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}

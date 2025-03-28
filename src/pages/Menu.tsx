import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Menu Items
const menuItemsData = [
  {
    id: "p1",
    name: "Pho Bo",
    description: "Traditional Vietnamese beef noodle soup with herbs and lime",
    price: 85000,
    image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Main Dishes",
    badge: "Best Seller"
  },
  {
    id: "p2",
    name: "Banh Mi Thit",
    description: "Vietnamese sandwich with grilled pork, pickled vegetables, and pâté",
    price: 65000,
    image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Sandwiches",
    badge: "Popular"
  },
  {
    id: "p3",
    name: "Bun Cha",
    description: "Grilled pork with rice vermicelli, herbs and dipping sauce",
    price: 75000,
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Noodles",
  },
  {
    id: "p4",
    name: "Ca Phe Sua Da",
    description: "Vietnamese iced coffee with sweetened condensed milk",
    price: 35000,
    image: "https://images.unsplash.com/photo-1544788978-c0d118afa40b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
    badge: "Favorite"
  },
  {
    id: "m1",
    name: "Com Tam Suon",
    description: "Broken rice with grilled pork chop, fried egg and vegetables",
    price: 80000,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Rice Dishes",
  },
  {
    id: "m2",
    name: "Bun Bo Hue",
    description: "Spicy beef noodle soup from central Vietnam",
    price: 90000,
    image: "https://images.unsplash.com/photo-1614080262560-9feff9de8185?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Noodles",
    badge: "Spicy"
  },
  {
    id: "m3",
    name: "Ca Kho To",
    description: "Caramelized fish in clay pot with vegetables and rice",
    price: 95000,
    image: "https://images.unsplash.com/photo-1518983546435-47245aaa6cc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Seafood",
  },
  {
    id: "m4",
    name: "Bo Luc Lac",
    description: "Shaking beef with bell peppers and onions",
    price: 110000,
    image: "https://images.unsplash.com/photo-1545114687-d2acd3da74b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Beef",
    badge: "New"
  },
  {
    id: "a1",
    name: "Goi Cuon",
    description: "Fresh spring rolls with shrimp, pork, herbs and peanut sauce",
    price: 55000,
    image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Appetizers",
  },
  {
    id: "a2",
    name: "Cha Gio",
    description: "Crispy fried spring rolls with dipping sauce",
    price: 60000,
    image: "https://images.unsplash.com/photo-1544795381-58119c606ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Appetizers",
  },
  {
    id: "a3",
    name: "Goi Ngo Sen",
    description: "Lotus root salad with shrimp, pork and herbs",
    price: 65000,
    image: "https://images.unsplash.com/photo-1538133251510-8acca97b019f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Salads",
  },
  {
    id: "a4",
    name: "Banh Xeo",
    description: "Crispy Vietnamese pancake with bean sprouts and herbs",
    price: 70000,
    image: "https://images.unsplash.com/photo-1606458000899-17185e4326ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Appetizers",
    badge: "Favorite"
  },
  {
    id: "d1",
    name: "Ca Phe Sua Da",
    description: "Vietnamese iced coffee with sweetened condensed milk",
    price: 35000,
    image: "https://images.unsplash.com/photo-1544788978-c0d118afa40b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
  },
  {
    id: "d2",
    name: "Sinh To Bo",
    description: "Fresh avocado smoothie with condensed milk",
    price: 45000,
    image: "https://images.unsplash.com/photo-1590080875238-5a2952653ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
  },
  {
    id: "d3",
    name: "Nuoc Mia",
    description: "Fresh sugarcane juice with kumquat",
    price: 30000,
    image: "https://images.unsplash.com/photo-1578577338344-3cc3dce7f1a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
    badge: "Refreshing"
  },
  {
    id: "d4",
    name: "Tra Da",
    description: "Vietnamese iced tea",
    price: 25000,
    image: "https://images.unsplash.com/photo-1541119257206-a9cf4353d655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
  }
];

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string; // Add this optional property
};

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuItemsData);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const filteredItems = menuItemsData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMenuItems(filteredItems);
  }, [searchQuery]);

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
    <div className="min-h-screen">
      <Navbar />
      <section className="py-12 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Explore Our Full Menu</h2>
            <p className="text-lg text-gray-600">
              Browse our delicious Vietnamese dishes and find your new favorite.
            </p>
          </div>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 mx-auto rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {item.badge && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-brand-red text-white text-xs font-bold rounded-md z-10">
                      {item.badge}
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">{item.name}</h3>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


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
    name: "Lamb Tagine",
    description: "Slow-cooked lamb with prunes, almonds, and aromatic spices served with couscous",
    price: 185000,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Main Dishes",
    badge: "Best Seller"
  },
  {
    id: "p2",
    name: "Chicken Pastilla",
    description: "Sweet and savory pie with spiced chicken, almonds, and cinnamon in crispy phyllo dough",
    price: 165000,
    image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Main Dishes",
    badge: "Popular"
  },
  {
    id: "p3",
    name: "Couscous Royale",
    description: "Steamed couscous with lamb, chicken, merguez sausage, and seasonal vegetables",
    price: 175000,
    image: "https://images.unsplash.com/photo-1536489885071-87983c3e2859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Main Dishes",
  },
  {
    id: "p4",
    name: "Mint Tea",
    description: "Traditional Moroccan mint tea with fresh mint leaves and sugar",
    price: 45000,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
    badge: "Favorite"
  },
  {
    id: "m1",
    name: "Beef Kefta Tagine",
    description: "Spiced meatballs in rich tomato sauce with eggs, served with fresh bread",
    price: 160000,
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Main Dishes",
  },
  {
    id: "m2",
    name: "Fish Chermoula",
    description: "Grilled fish marinated in chermoula sauce with lemon and fresh herbs",
    price: 190000,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Seafood",
    badge: "Spicy"
  },
  {
    id: "m3",
    name: "Vegetable Tagine",
    description: "Slow-cooked seasonal vegetables with preserved lemon and olives",
    price: 145000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Vegetarian",
  },
  {
    id: "m4",
    name: "Mechoui",
    description: "Slow-roasted lamb shoulder with cumin, paprika, and garlic",
    price: 210000,
    image: "https://images.unsplash.com/photo-1514516345957-556ca7c90a64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Main Dishes",
    badge: "New"
  },
  {
    id: "a1",
    name: "Zaalouk",
    description: "Smoky eggplant and tomato salad with garlic, cumin, and olive oil",
    price: 75000,
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Appetizers",
  },
  {
    id: "a2",
    name: "Moroccan Briouats",
    description: "Crispy pastry triangles filled with spiced meat or cheese",
    price: 80000,
    image: "https://images.unsplash.com/photo-1541086095944-f4b5412d3666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Appetizers",
  },
  {
    id: "a3",
    name: "Moroccan Salad",
    description: "Fresh tomatoes, cucumbers, onions with herbs and olive oil dressing",
    price: 65000,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Salads",
  },
  {
    id: "a4",
    name: "Harira Soup",
    description: "Traditional Moroccan soup with tomatoes, lentils, chickpeas, and fragrant spices",
    price: 70000,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Soups",
    badge: "Favorite"
  },
  {
    id: "d1",
    name: "Moroccan Mint Tea",
    description: "Traditional tea with fresh mint leaves and sugar",
    price: 45000,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
  },
  {
    id: "d2",
    name: "Orange Blossom Water",
    description: "Refreshing drink with orange blossom water and honey",
    price: 50000,
    image: "https://images.unsplash.com/photo-1556679343-c1306ee5277b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
  },
  {
    id: "d3",
    name: "Avocado Smoothie",
    description: "Creamy avocado smoothie with milk, honey, and dates",
    price: 60000,
    image: "https://images.unsplash.com/photo-1590080875238-5a2952653ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
    badge: "Refreshing"
  },
  {
    id: "d4",
    name: "Moroccan Coffee",
    description: "Strong coffee flavored with cardamom and cinnamon",
    price: 55000,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Drinks",
  },
  {
    id: "de1",
    name: "Moroccan Pastries",
    description: "Assortment of traditional Moroccan pastries with almonds and honey",
    price: 85000,
    image: "https://images.unsplash.com/photo-1603137071762-2760f0c5bf5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Desserts",
    badge: "Popular"
  },
  {
    id: "de2",
    name: "Orange Blossom Cake",
    description: "Moist semolina cake with orange blossom water and almonds",
    price: 65000,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Desserts",
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
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Explore Our Moroccan Menu</h2>
            <p className="text-lg text-gray-600">
              Browse our authentic Moroccan dishes prepared with traditional spices and techniques.
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


import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/menu">
            <Button className="bg-brand-red hover:bg-red-700 text-white">
              Explore Menu
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="hidden md:grid md:grid-cols-6 gap-4 mb-4 text-gray-600 font-semibold">
                  <div className="md:col-span-3">Item</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-3 flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-600 flex items-center mt-1"
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <span className="md:hidden font-semibold mr-2">Price:</span>
                        {formatPrice(item.price)}
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="flex border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="px-3 py-1 flex items-center">{item.quantity}</div>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right font-semibold">
                        <span className="md:hidden font-semibold mr-2">Total:</span>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 pb-4 border-b">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">{formatPrice(15000)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">{formatPrice(getTotalPrice() + 15000)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button className="w-full bg-brand-red hover:bg-red-700 text-white">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <div className="mt-4">
                <Link to="/menu">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

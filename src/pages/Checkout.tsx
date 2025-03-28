
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "bank") {
      setShowQRCode(true);
      return;
    }
    
    // Process cash on delivery order
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast({
        title: "Order Successful!",
        description: "Your order has been placed successfully. You will receive a confirmation shortly.",
        duration: 5000,
      });
      navigate("/order-confirmation");
    }, 2000);
  };
  
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {showQRCode ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Scan QR Code to Pay</h2>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-6 rounded-lg mb-6">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                      alt="Payment QR Code" 
                      className="w-64 h-64 object-cover"
                    />
                  </div>
                  <p className="text-gray-700 mb-4 text-center">
                    Scan this QR code with your banking app to complete the payment.
                    Please reference your order number when making the payment.
                  </p>
                  <div className="text-center mb-4">
                    <p className="font-bold">Amount: {formatPrice(getTotalPrice() + 15000)}</p>
                    <p className="text-sm text-gray-600">Order ID: ORD-{Math.floor(Math.random() * 1000000)}</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setShowQRCode(false)}>
                      Go Back
                    </Button>
                    <Button 
                      className="bg-brand-red hover:bg-red-700 text-white" 
                      onClick={() => {
                        clearCart();
                        toast({
                          title: "Payment Received!",
                          description: "Your order has been placed successfully. You will receive a confirmation shortly.",
                          duration: 5000,
                        });
                        navigate("/order-confirmation");
                      }}
                    >
                      I've Completed Payment
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required placeholder="First Name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required placeholder="Last Name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="Email" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" required placeholder="Phone Number" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" required placeholder="Street Address" />
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input id="district" required placeholder="District" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required defaultValue="Ho Chi Minh City" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Textarea id="notes" placeholder="Any special instructions for delivery" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                    <div className="flex items-center space-x-2 p-3 border rounded-md mb-2 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">Bank Transfer (QR Code)</Label>
                    </div>
                  </RadioGroup>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-red hover:bg-red-700 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      `Place Order - ${formatPrice(getTotalPrice() + 15000)}`
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 pb-4 border-b">Order Summary</h2>
              
              <div className="max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex py-3 border-b last:border-0">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-4">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

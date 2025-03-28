
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderConfirmation() {
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-24 flex flex-col items-center justify-center max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8 w-full text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-4">
            Your order has been placed successfully and will be delivered shortly.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="font-semibold">Order Number:</p>
            <p className="text-xl text-brand-red font-bold">{orderNumber}</p>
          </div>
          
          <div className="mb-8 text-left">
            <h2 className="text-xl font-bold mb-3">Order Details:</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Estimated Delivery Time:</span>
                <span className="font-semibold">30-45 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-semibold">Cash on Delivery</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span className="font-semibold">123 Nguyen Street, District 1, HCMC</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
            <Link to="/menu">
              <Button className="w-full bg-brand-red hover:bg-red-700 text-white">
                Order Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

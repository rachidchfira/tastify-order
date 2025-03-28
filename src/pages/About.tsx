
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-brand-dark mb-8">About TastyBowl</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-brand-red">Our Story</h2>
              <p className="text-gray-700 mb-4">
                TastyBowl was founded in 2018 by Chef Minh Nguyen, who wanted to bring authentic Vietnamese 
                flavors to food enthusiasts in Ho Chi Minh City while embracing modern dining conveniences.
              </p>
              <p className="text-gray-700 mb-4">
                With a passion for traditional Vietnamese cuisine and years of experience in top restaurants 
                across Vietnam, Chef Minh created a menu that celebrates the rich culinary heritage of Vietnam 
                while adding his own contemporary twist.
              </p>
              <p className="text-gray-700">
                What started as a small family restaurant has now grown into one of the most beloved 
                Vietnamese eateries in District 1, known for its flavorful dishes, fresh ingredients, 
                and exceptional service.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-brand-red text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Authenticity</h3>
                <p className="text-gray-600">
                  We stay true to traditional Vietnamese recipes and cooking methods, 
                  ensuring every dish delivers an authentic taste of Vietnam.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Quality</h3>
                <p className="text-gray-600">
                  We source the freshest ingredients from local markets daily, 
                  ensuring the highest quality and flavor in every dish.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Innovation</h3>
                <p className="text-gray-600">
                  While honoring tradition, we embrace innovation in our service, 
                  delivery methods, and occasional menu specials.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-cream p-8 rounded-lg shadow-md mb-16">
            <h2 className="text-2xl font-bold mb-4 text-brand-red">Meet Our Chef</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img 
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" 
                alt="Chef Minh Nguyen" 
                className="w-64 h-64 object-cover rounded-full shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Chef Minh Nguyen</h3>
                <p className="text-gray-700 mb-4">
                  Chef Minh began his culinary journey at the age of 16, learning traditional 
                  cooking techniques from his grandmother in the countryside near Hue. After 
                  formal training at the Saigon Culinary Institute and working in renowned 
                  restaurants across Vietnam and abroad, he returned to Ho Chi Minh City to 
                  open TastyBowl.
                </p>
                <p className="text-gray-700">
                  "My goal is to share the authentic flavors of Vietnam with both locals and visitors. 
                  Each dish tells a story of our rich culinary tradition and celebrates the 
                  incredible ingredients found throughout our beautiful country."
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-brand-red">Ready to Experience Our Food?</h2>
            <div className="flex justify-center gap-4">
              <Link to="/menu">
                <Button className="bg-brand-dark hover:bg-gray-800 text-white">
                  Explore Our Menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

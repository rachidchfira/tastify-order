
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import FeaturedMenu from "@/components/FeaturedMenu";
import Testimonials from "@/components/Testimonials";
import LocationMap from "@/components/LocationMap";
import CallToAction from "@/components/CallToAction";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <FeaturedMenu />
      <Testimonials />
      <LocationMap />
      <CallToAction />
      <Footer />
    </div>
  );
}

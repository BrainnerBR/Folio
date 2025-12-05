import Landing from "../Landing";
import ServicesSection from "../../Components/ServicesSection";
import PricingSection from "../../Components/PricingSection";
import Footer from "../../Components/Footer";

export default function Home() {
  return (
    <div className="space-y-10">
      <Landing />
      <ServicesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

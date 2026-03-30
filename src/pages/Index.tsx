import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import PhoneCarousel from "@/components/PhoneCarousel";
import HelloQInAction from "@/components/HelloQInAction";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import AppExperienceSection from "@/components/AppExperienceSection";
import SafetySection from "@/components/SafetySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DownloadCTA from "@/components/DownloadCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <PhoneCarousel />
      <HelloQInAction />
      <FeaturesSection />
      <CommunitySection />
      <AppExperienceSection />
      <SafetySection />
      <TestimonialsSection />
      <DownloadCTA />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;

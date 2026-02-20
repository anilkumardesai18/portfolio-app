import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import AIChatSection from "@/components/sections/AIChatSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AIChatSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeSwitcher />
    </>
  );
}

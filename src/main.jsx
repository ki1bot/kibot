import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { getPortfolioData } from "@/lib/portfolio-api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/animations/AnimatedBackground";
import { BackToTop } from "@/components/animations/BackToTop";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioShowcaseSection } from "@/components/sections/PortfolioShowcaseSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

const initialPortfolioData = {
  projects: [],
  certificates: [],
  comments: [],
};

function HomePage() {
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);

  useEffect(() => {
    let isMounted = true;

    getPortfolioData()
      .then((data) => {
        if (!isMounted) return;

        setPortfolioData({
          projects: Array.isArray(data?.projects) ? data.projects : [],
          certificates: Array.isArray(data?.certificates)
            ? data.certificates
            : [],
          comments: Array.isArray(data?.comments) ? data.comments : [],
        });
      })
      .catch((error) => {
        console.error("Gagal memuat data portfolio:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-transparent">
      <AnimatedBackground />
      <BackToTop />
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <AboutSection
        projects={portfolioData.projects}
        certificates={portfolioData.certificates}
      />
      <PortfolioShowcaseSection
        projects={portfolioData.projects}
        certificates={portfolioData.certificates}
      />
      <ContactSection comments={portfolioData.comments} />
      <Footer />
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App>
      <HomePage />
    </App>
  </StrictMode>,
);

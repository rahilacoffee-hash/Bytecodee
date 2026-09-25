import { useEffect, useState } from "react";
import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import AboutMe from "../component/AboutMe";
import Projects from "../component/Projects";
import Experience from "../component/Experience";
import Testimonials from "../component/Testimonials";
import Contact from "../component/Contact";
import Loader from "../component/Loader/loader";
import PricingSection from "../component/PricingSection";
import HomeConversationBubble from "../component/Chat/HomeConversationBubble";
import { getHomepageContent } from "../Services/admin.api";
import { HOME_PAGE_DEFAULTS } from "../data/homepageContent";

const Home = ({ isNight, onThemeToggle }) => {
  let [loading, setLoading] = useState(true);
  const [content, setContent] = useState(HOME_PAGE_DEFAULTS);

  useEffect(() => {
    getHomepageContent()
      .then((response) => {
        if (response.data?.content) setContent(response.data.content);
      })
      .catch((error) => {
        console.warn("Unable to load saved homepage content; showing defaults.", error);
      });
  }, []);

  return (
    <>
      {/* Real-time loader — tracks actual browser load progress */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <main
        className={`portfolio-shell ${isNight ? "portfolio-night" : "portfolio-day"}`}
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.4s ease" }}
      >
        <div className="relative h-screen overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={content.hero.backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-[1]" />
          <Navbar isNight={isNight} onThemeToggle={onThemeToggle} />
          <Hero content={content.hero} />
        </div>

        <AboutMe content={content.about} />
        <Projects content={content.projects} />
        <PricingSection />
        <Experience />
        <Testimonials content={content.testimonials} />
        <Contact />
        <HomeConversationBubble />
      </main>
    </>
  );
};

export default Home;

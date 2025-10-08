import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    // Passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full w-12 h-12 
        bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary 
        transition-all duration-300 shadow-md
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}`}
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollToTop;


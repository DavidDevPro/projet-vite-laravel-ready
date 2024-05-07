// BackToTopButton.jsx
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Maintenant, nous écoutons le défilement sur la fenêtre entière
      if (window.scrollY > 10) {
        // Vous pouvez ajuster ce nombre selon vos besoins
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Écoutez l'événement de défilement sur la fenêtre
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      // Assurez-vous de supprimer l'écouteur lorsque le composant est démonté
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={`back-to-top ${isVisible ? "is-visible" : ""}`} onClick={scrollToTop}>
      <FaArrowUp />
    </button>
  );
}

import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour détecter l'inactivité de l'utilisateur.
 *
 * @param {Function} onInactive - Fonction à exécuter après inactivité.
 * @param {number} timeLimit - Durée limite d'inactivité en millisecondes (défaut: 10 minutes).
 * @param {boolean} isActive - Active ou désactive la détection d'inactivité.
 * @returns {void}
 */
const useInactivityDetector = (onInactive, timeLimit = 10 * 60 * 1000, isActive = true, isAuthenticated = false) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    // Si isActive est false, ne fait rien
    if (!isActive && !isAuthenticated) return; 
    // Fonction pour réinitialiser le timer
    const resetTimer = () => {
      setTimeLeft(timeLimit);
    };

    // Initialisation d'un interval pour diminuer timeLeft
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          // Quand le timer atteint 0, exécutez onInactive et réinitialisez
          clearInterval(intervalId);
          onInactive(timeLimit); // Appel de la fonction de rappel avec timeLimit
          return timeLimit;
        }
        return newTime;
      });
    }, 1000);

    // Ajout des écouteurs d'événements pour réinitialiser le timer sur activité
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("click", resetTimer);

    // Nettoyage des intervalles et des écouteurs d'événements
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [onInactive, timeLimit, isActive,isAuthenticated]);

  // Code facultatif pour afficher le temps restant (décommentez si nécessaire)
  // useEffect(() => {
  //   const minutes = Math.floor(timeLeft / 60000);
  //   const seconds = Math.floor((timeLeft % 60000) / 1000);
  //   console.log(`Temps restant avant déconnexion : ${minutes}m ${seconds}s`);
  // }, [timeLeft]);
};

export default useInactivityDetector;

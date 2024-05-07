// Importation de la variable databaseUrl à partir des variables d'environnement de Vite
const apiUrl  = import.meta.env.VITE_API_URL;
// Exportation de la variable databaseUrl pour la rendre accessible depuis d'autres fichiers
export { apiUrl  };
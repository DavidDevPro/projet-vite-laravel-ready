//Définition variable nom pour l'application (a faire apparaitre dans l'onget du navigateur)
export const APP_NAME = "projet model de base";
//Définition variable le nom du développeur pour le copyright
export const APP_DEV = "devxxxx";

// Définition de la variable `basename` en fonction du mode de l'environnement
//name_files correspond au nom du dossier ou se trouvera le site en production (hors racine domaine)
//si racine il faut mettre "/"
const basename = import.meta.env.MODE === "production" ? "/name_files/" : "";

// Exportation de la variable `basename` pour l'utiliser dans d'autres fichiers
export { basename };

// Importe package.json
import packageJson from '../package.json'; 
// Exporte la version (et tout autre config que tu juges nécessaire)
export const Config = {
    version: packageJson.version,
  };
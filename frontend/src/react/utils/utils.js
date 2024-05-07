// utils.js

/**
 * Convertit les clés d'un objet ou d'un tableau d'objets en camelCase.
 * @param {Object|Array} obj - L'objet ou le tableau d'objets à convertir.
 * @returns {Object|Array} L'objet ou le tableau d'objets avec des clés en camelCase.
 */
export function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((newObj, key) => {
      let newKey = key.replace(/(_\w)/g, (match) => match[1].toUpperCase());
      newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
      newObj[newKey] = toCamelCase(obj[key]);
      return newObj;
    }, {});
  }
  return obj;
}

/**
 * Formate un solde en tant que chaîne de caractères formatée en euro.
 * @param {number|string} solde - Le solde à formater.
 * @returns {string} Le solde formaté.
 */
export const formatSolde = (solde) => {
  return parseFloat(solde).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};

/**
 * Formate une date au format local (français).
 * @param {string} date - La date à formater.
 * @returns {string} La date formatée.
 */

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR");
};

/**
 * Formate la date de la version au format dd/mm/yyyy.
 * @param {string} dateString - La chaîne de caractères représentant la date.
 * @returns {string} La date formatée spécifiquement pour l'affichage de la version.
 */
export const formatVersionDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formate un montant en tant que chaîne de caractères formatée en euro.
 * @param {number} amount - Le montant à formater.
 * @returns {string} Le montant formaté.
 */
export const formatCurrency = (amount) => {
  const numberAmount = Number(amount);
  return numberAmount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
};

export function formatMontant(value) {
  const num = parseFloat(value);
  return isNaN(num) ? "0.00" : num.toFixed(2);
}

/**
 * Capitalize the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(string) {
  if (typeof string !== 'string' || string.length === 0) {
      return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Formate une date et une heure au format local (français) avec les secondes.
 * @param {Date|string} date - La date à formater.
 * @returns {string} La date et l'heure formatées.
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString("fr-FR", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
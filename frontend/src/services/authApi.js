// api/user/authApi.js

import axios from 'axios';
import { apiUrl } from '@apiConfig';

/**
 * Envoie une requête de connexion à l'API pour un utilisateur.
 *
 * @param {string} identifiant - L'identifiant de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} Une promesse résolue avec la réponse de l'API, normalisée en camelCase.
 */
const loginUser = async (identifiant, password) => {
  const loginUrl = `${apiUrl}login`;

  try {
    const response = await axios.post(loginUrl, {
        identifiant: identifiant,
        password: password,
    });

    return response.data;
  } catch (error) {
    console.error("Could not login utilisateur: ", error.response || error);
    throw error;
  }
};

/**
 * Envoie une requête d'inscription à l'API pour un nouvel utilisateur avec FormData.
 *
 * @param {FormData} formData - FormData contenant les données du nouvel utilisateur, y compris l'image de profil si présente.
 * @returns {Promise<Object>} Une promesse résolue avec la réponse de l'API, normalisée en camelCase.
 */
const registerUser = async (formData) => {
  const registerUrl = `${apiUrl}register`;

  try {
    const response = await axios.post(registerUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Could not register utilisateur: ", error.response || error);
    throw error;
  }
};

/**
 * Envoie une requête pour réinitialiser le mot de passe à l'API et recevoir un lien de réinitialisation.
 *
 * @param {string} email - L'email de l'utilisateur qui demande la réinitialisation.
 * @returns {Promise<Object>} Une promesse résolue avec la réponse de l'API, normalisée en camelCase.
 */
const sendPasswordResetEmail = async (email) => {
  const resetPasswordUrl = `${apiUrl}password/email`;

  try {
    const response = await axios.post(resetPasswordUrl, {
      email
    });

    return response.data;

  } catch (error) {
    console.error("Could not send password reset email: ", error.response || error);
    throw error;
  }
};

/**
 * Réinitialise le mot de passe de l'utilisateur avec les données fournies.
 *
 * @param {object} data - Un objet contenant l'email, le token, le nouveau mot de passe et la confirmation du mot de passe.
 * @returns {Promise<Object>} Une promesse résolue avec la réponse de l'API, normalisée en camelCase.
 */
const resetPassword = async (data) => {
  const resetUrl = `${apiUrl}password/reset`;

  try {
    const response = await axios.post(resetUrl, {
      email: data.email,
      token: data.token,
      password: data.password,
      password_confirmation: data.passwordConfirmation
    });

return response.data;
  } catch (error) {
    console.error("Could not reset password: ", error.response || error);
    throw error;
  }
};


/**
 * Envoie une requête de déconnexion à l'API pour un utilisateur.
 *
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @returns {Promise<Object>} Une promesse résolue avec la réponse de l'API, normalisée en camelCase, ou un objet d'erreur.
 */
const logoutUser = async (token) => {
  const logoutUrl = `${apiUrl}logout`;
  try {
    const response = await axios.post(logoutUrl, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error.response || error);
    return { success: false, error: error.response?.data || { message: error.message } };
  }
};

export { loginUser, registerUser, logoutUser, sendPasswordResetEmail, resetPassword };
// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUser,registerUser,logoutUser } from '@services/authApi';

// Fonction asynchrone pour la connexion
export const loginAsync = (identifiant, password) => async (dispatch) => {
  try {
    dispatch(loginLoading());
    const response = await loginUser(identifiant, password);

    if (response.success) {
      dispatch(loginSuccess(response)); // Utilisation directe de la réponse normalisée
      return { success: true, data: response };
    } else {
      dispatch(loginFailure("Échec de la connexion."));
      return { success: false, error: "Échec de la connexion." };
    }
  } catch (error) {
    dispatch(loginFailure(error.message || "Une erreur est survenue lors de la connexion."));
    return { success: false, error: error.message || "Une erreur est survenue lors de la connexion." };
  }
};

// Fonction asynchrone pour l'inscription
export const registerAsync = (formData) => async (dispatch) => {
  try {
    dispatch(registerLoading());
    const response = await registerUser(formData); // Modifié pour prendre formData

    if (response.success) {
      dispatch(registerSuccess(response));
      return { success: response.success };
    } else {
      dispatch(registerFailure("Échec de l'inscription."));
      return { success: response.success };
    }
  } catch (error) {
    dispatch(registerFailure(error.message || "Une erreur est survenue lors de l'inscription."));
    // return { success: response.success };
  }
};

// Fonction asynchrone pour la déconnexion
export const logoutAsync = (token) => async (dispatch) => {
  try {
    const response = await logoutUser(token);
    if (response.success) {
      dispatch(logout());  // Réinitialiser l'état d'authentification
      return { success: true };
    } else {
      console.error("Échec de la déconnexion :", response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return { success: false, error: error.message || "Une erreur est survenue lors de la déconnexion." };
  }
};

// Initialisation de l'état d'authentification
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

// Création du slice d'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token; // Assurez-vous que ces clés correspondent à celles normalisées
      state.user = {
        idUser: action.payload.idUser,
        prenomUtilisateur: action.payload.prenomUtilisateur,
        cheminImageProfil: action.payload.cheminImageProfil,
      };
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    // Reducers pour l'inscription
    registerLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.loading = false;
    },
  },
});

// Exportation des actions du slice
export const { loginLoading, loginSuccess, loginFailure, logout, registerLoading, registerSuccess, registerFailure } = authSlice.actions;

// Exportation du reducer
export default authSlice.reducer;
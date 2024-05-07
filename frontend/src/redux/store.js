import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";

// Configuration de Redux Persist pour le reducer d'authentification
const authPersistConfig = {
    key: "auth", // La clé utilisée pour stocker l'état dans le stockage local
    storage, // Méthode de stockage (stockage local par défaut)
};

// Application de Redux Persist au reducer d'authentification
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Création du store Redux avec Redux Persist pour le reducer d'authentification
export function setupStore() {
    const store = configureStore({
      reducer: {
        auth: persistedAuthReducer,
    },
    // Configuration du middleware pour éviter les avertissements de sérialisation
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER", "persist/FLUSH"],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
}
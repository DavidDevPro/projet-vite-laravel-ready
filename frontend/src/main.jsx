import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { ModalProvider } from './react/context/ModalContext.jsx';
import App from "./App.jsx";
import { setupStore } from "./redux/store";
const { store, persistor } = setupStore();
// Importation des styles principaux
import "@/sass/main.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </PersistGate>
  </Provider>
);

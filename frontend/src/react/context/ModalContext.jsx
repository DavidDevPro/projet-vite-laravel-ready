import PropTypes from 'prop-types'; 
import { createContext } from 'react';
import useModalState from '../hooks/useModalState'; // Importez votre hook existant

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalState = useModalState();

  return (
    <ModalContext.Provider value={modalState}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

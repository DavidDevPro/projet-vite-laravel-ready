import React from 'react';
import { useState,useCallback } from 'react';
import { BsInfoCircle,BsQuestionCircle,BsExclamationTriangle } from "react-icons/bs";

const useModalState = (navigate,) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSharingModalOpen, setSharingModalOpen] = useState(false);
  const [showDeletionSuccess, setShowDeletionSuccess] = useState(false);
 
  const [isEditConfirmationOpen, setIsEditConfirmationOpen] = useState(false);
  const [isEditSuccessModalOpen, setIsEditSuccessModalOpen] = useState(false);
  
  const [modalConfig, setModalConfig] = useState([]);
  
  const showLogoutConfirmation = useCallback((title, message, handleLogout) => {
    setModalConfig([{
      isOpen: true,
      title: title,
      message: message,
      onClose: () => {
        handleLogout(); // Exécute la déconnexion lors de la fermeture du modal
        setModalConfig([]); // Nettoie le modalConfig après la fermeture
      },
      closeButtonText: "Ok"
    }]);
  }, [setModalConfig]);

  const closeModal = useCallback(() => {
    setModalConfig([]); // Réinitialise la configuration du modal
    try {
        navigate("/SaisieListe");
    } catch (error) {
        console.error("Erreur lors de la tentative de navigation :", error);
        setModalConfig([{
            isOpen: true,
            title: "Erreur de navigation",
            message: "Erreur lors de la tentative de navigation",
            onClose: () => setModalConfig([]),
            closeButtonText: "Ok"
        }]);
    }
  }, [navigate]); 

  const loginModalConfig = useCallback((title, message) => ({
    isOpen: true,
    title: title,
    message: message,
    onClose: closeModal,
    closeButtonText: "Ok"
  }), [closeModal]);

  const successModalConfig = (message, title = "Succès", additionalOnClose = () => {}) => ({
    isOpen: true,
    title: title,
    message: React.isValidElement(message) ? React.cloneElement(message) : message,
    icon: <BsInfoCircle className="modal-info-icon" />,
    onClose: () => {
      setModalConfig([]); // Ferme la modale
      additionalOnClose(); // Exécute une action supplémentaire
    },
    closeButtonText: "Ok"
  });

  const errorModalConfig = (title,message) => ({
    isOpen: true,
    title: title || "Erreur",
    message,
    icon: <BsExclamationTriangle className="modal-info-icon" />,
    onClose: () => setModalConfig([]),
    closeButtonText: "Ok",
    // icon: <LuAlertTriangle className="modal-info-icon"/>
  });

  const confirmationModalConfig = (message,message2 = "", onConfirmCallback, onCancelCallback, onCloseCallback) => ({
    isOpen: true,
    title: "Confirmation",
    message,
    message2,
    icon: <BsQuestionCircle className="modal-info-icon" />,
    icon2: message2 ? <BsExclamationTriangle className="modal-alert-icon" /> : null,
    onConfirm: onConfirmCallback,
    onCancel: onCancelCallback || (() => setModalConfig([])),
    onClose: onCloseCallback || (() => setModalConfig([])),
    closeButtonText: "Annuler"
  });
  
  return {
    modalConfig,
    setModalConfig,
    loginModalConfig,
    showLogoutConfirmation,
    successModalConfig,
    errorModalConfig,
    confirmationModalConfig,
    isInfoModalOpen,
    setIsInfoModalOpen,
    isCreateModalOpen,
    setCreateModalOpen,
    isConfirmModalOpen,
    setConfirmModalOpen,
    showDeletionSuccess,
    setShowDeletionSuccess,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    isEditConfirmationOpen, 
    setIsEditConfirmationOpen,
    isEditSuccessModalOpen,
    setIsEditSuccessModalOpen,
    isSharingModalOpen,
    setSharingModalOpen,
  };
};

export default useModalState;
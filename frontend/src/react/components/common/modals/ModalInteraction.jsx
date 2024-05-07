import PropTypes from "prop-types";
import ModalBase from './ModalBase';
import { BsCheckCircle,BsXCircle } from "react-icons/bs";

function ModalInteraction({
  isOpen,
  onClose,
  title,
  message,
  message2,
  prenomUtilisateur,
  icon,
  icon2,
  onConfirm,
  onCancel,
  confirmText = "Oui",
  cancelText = "Non",
  closeButtonText = "Ok",
}) {
  
  // Définir si c'est un modal de confirmation ou un message simple
  const isConfirmationModal = onConfirm || onCancel;
  // modal-container ou modal-content
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} containerClass={"modal-container modal-interaction"} backgroundClassName="modal-background-common modal-background-interaction">
      <div className="modal-title">
        <h3 id="modalTitle">{title}</h3>
      </div>
      <div className="modal-message">
        {icon}
        {prenomUtilisateur && <p>Bonjour, {prenomUtilisateur}!</p>}
        <div>{message}</div>
      </div>
      {message2 && (
        <div className="modal-alert">
            {icon2}
            <p>{message2}</p>
        </div>
      )}
      <div className="modal-footer">
        {!isConfirmationModal && (
          <button className="modal-button" onClick={onClose}>
            <BsCheckCircle className="button-icon-text-modal"/>{closeButtonText}
          </button>
        )}
        {onConfirm && (
          <button className="modal-button modal-button-confirm" onClick={onConfirm}>
            <BsCheckCircle className="button-icon-text-modal"/>{confirmText}
          </button>
        )}
        {onCancel && (
          <button className="modal-button modal-button-cancel" onClick={onCancel}>
            <BsXCircle className="button-icon-text-modal"/>{cancelText}
          </button>
        )}
      </div>
    </ModalBase>
  );
}

ModalInteraction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  message2: PropTypes.string,
  prenomUtilisateur: PropTypes.string,
  icon: PropTypes.element,
  icon2: PropTypes.element,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  closeButtonText: PropTypes.string,
};

export default ModalInteraction;

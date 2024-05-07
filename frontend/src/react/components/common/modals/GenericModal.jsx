import PropTypes from 'prop-types';
import ModalInteraction from './ModalInteraction';

const GenericModal = ({ modalConfig }) => {
  if (!modalConfig || modalConfig.length === 0) {
    return null; // Retourner null si modalConfig est vide
  }

  return (
    <>
      {modalConfig.map((modal, index) => (
        
        <ModalInteraction
          key={index}
          {...modal} // Spread props pour éviter la duplication
          closeButtonText={modal.closeButtonText || 'Ok'}
        />
      ))}
    </>
  );
};

// Définition de PropTypes pour chaque objet de modalConfig
const modalConfigPropType = PropTypes.shape({
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  onConfirm: PropTypes.func, // onConfirm peut être optionnel
  onCancel: PropTypes.func, // onCancel peut être optionnel
  closeButtonText: PropTypes.string // closeButtonText peut être optionnel
});

GenericModal.propTypes = {
  modalConfig: PropTypes.arrayOf(modalConfigPropType).isRequired // modalConfig est un tableau de objets conforme à modalConfigPropType
};

export default GenericModal;

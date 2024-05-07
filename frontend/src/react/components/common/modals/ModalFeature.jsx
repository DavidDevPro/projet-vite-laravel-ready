import PropTypes from "prop-types";
import ModalBase from './ModalBase';
const ModalFeature = ({ isOpen, children, onClose, isUserModal,isSetupModal,isSaisieModal, isRecurrentModal, additionalClass  }) => {
  
  let containerClass = "modal-container";
  if (isUserModal) {
    containerClass += " user-modal";
  }
  if (isSetupModal) {
    containerClass += " setup-modal";
  }
  if (isSaisieModal) {
    containerClass += " saisie-modal";
  }
  if (isRecurrentModal) {
    containerClass += " reccurent-modal";
  }
  if (additionalClass) {
    containerClass += ` ${additionalClass}`;
  }

  return (
    <ModalBase 
      isOpen={isOpen}
      onClose={onClose}
      overlayClassName="modal-overlay"
      backgroundClassName="modal-background-common modal-background-feature"
      containerClass={containerClass}
    >
      {children}
    </ModalBase>
  );
};

ModalFeature.propTypes = {
  isOpen: PropTypes.bool,  // Pas nécessairement required ici, si vous voulez que ce soit optionnel
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isUserModal: PropTypes.bool,
  isSetupModal: PropTypes.bool,
  isSaisieModal: PropTypes.bool,
  isRecurrentModal: PropTypes.bool,
  additionalClass: PropTypes.string,
};

ModalFeature.defaultProps = {
  isOpen: false,  // Définir une valeur par défaut pour isOpen
  isUserModal: false,
  isSetupModal: false,
  isSaisieModal: false,
  additionalClass: '',
};

export default ModalFeature;

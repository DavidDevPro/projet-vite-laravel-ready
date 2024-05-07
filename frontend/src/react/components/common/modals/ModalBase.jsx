import ReactModal from "react-modal";
import PropTypes from 'prop-types';
import { FaWindowClose } from "react-icons/fa";

const ModalBase = ({ isOpen, children, onClose, className, overlayClassName, backgroundClassName,containerClass }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    className={className || "modal-container"}
    overlayClassName={overlayClassName || "modal-overlay"}
    closeTimeoutMS={250}
    aria-labelledby="modalTitle"
    role="dialog"
    aria-modal="true">
    <div className={backgroundClassName}>
        <div className={containerClass}>
            <div className="modal-close-container">
                <FaWindowClose className="button-icon-green" onClick={onClose} aria-label="Fermer" />
            </div>
        {children}
        </div>
    </div>
  </ReactModal>
);

ModalBase.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  backgroundClassName: PropTypes.string,
  containerClass: PropTypes.string,
};

export default ModalBase;

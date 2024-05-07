import PropTypes from 'prop-types';

const RadioButton = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  isRequired = false,
  disabled=false,
  className = "radio-input",
  labelClassName = "radio-label",
  innerCircleClassName = "radio-inner-circle",
}) => {
  
  return (
    <>
      <input
        id={id}
        name={name}
        className={className}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id} className={labelClassName}>
        <span className={innerCircleClassName}></span>
        {label}
        {isRequired && <span className="required-marker">&#x2731;</span>} {/* Affichage conditionnel de l'astérisque */}
      </label>
    </>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool, // PropType ajouté pour isRequired
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  innerCircleClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

// Définition des defaultProps pour isRequired
RadioButton.defaultProps = {
  isRequired: false, // La valeur par défaut de isRequired est false
  className: "radio-input",
  labelClassName: "radio-label",
  innerCircleClassName: "radio-inner-circle",
  disabled: false,
};

export default RadioButton;

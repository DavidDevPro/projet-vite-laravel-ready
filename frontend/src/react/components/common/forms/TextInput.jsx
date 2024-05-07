import PropTypes from 'prop-types';

const TextInput = ({
  label,
  id,
  name,
  type = 'text', // Défini par défaut à 'text'
  value,
  onChange,
  onBlur,
  placeholder,
  minLength,
  maxLength,
  title,
  isRequired,
  iconSrc,
  iconAlt,
  showPassword,
  className,
  labelClassName,
  disabled,
}) => {
    
  // Gère le type d'input pour le mot de passe
  const inputType = showPassword ? "text" : type;

  return (
    <>
      {iconSrc ? (
        <>
          <img src={iconSrc} alt={iconAlt} className="input-icon" />
          <label htmlFor={id} className="visually-hidden">{label}{isRequired && <span className="required-marker">&#x2731;</span>}</label>
        </>
      ) : (
        <label htmlFor={id} className={labelClassName}>{label}{label && " : "}{isRequired && <span className="required-marker">&#x2731;</span>}</label>
      )}
      <input
        type={inputType}
        id={id}
        name={name}
        className={`text-input-field ${className || ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        title={title}
        required={isRequired}
        aria-label={label}
        aria-required={isRequired ? 'true' : 'false'}
        disabled={disabled}
      />
    </>
  );
};

// Les PropTypes et DefaultProps restent inchangés
TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func, // Ajouté pour validation
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string,
  showPassword: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  isRequired: false,
  type: 'text',
  label: '',
  iconSrc: '',
  iconAlt: '',
  showPassword: false,
  className: '',
  labelClassName: '',
  disabled: false,
  onBlur: null,
};

export default TextInput;

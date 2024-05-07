import PropTypes from "prop-types";

/**
 * Composant personnalisé pour un menu déroulant (dropdown).
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.id - L'identifiant du composant.
 * @param {string} props.name - Le nom du composant.
 * @param {Array} props.options - Les options du menu déroulant.
 * @param {number|string} props.value - La valeur sélectionnée.
 * @param {Function} props.onChange - Fonction appelée lors d'un changement de sélection.
 * @param {boolean} [props.disabled] - Indique si le menu est désactivé.
 * @param {string} [props.label] - Le label associé au menu déroulant.
 * @returns {React.Component} Le composant Select.
 */
const Select = ({
  id,
  name,
  options,
  value,
  onChange,
  disabled,
  size,
  label,
  title,
  className,
  labelClassName,
  selectClassName,
  isRequired,
  multiple = false,
}) => {
  const selectValue = multiple ? value : (Array.isArray(value) ? value[0] : value);
  const combinedSelectClassName = `no-custom-scrollbar ${selectClassName || ''}`.trim();
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label} : {isRequired && <span className="required-marker">&#x2731;</span>}
        </label>
      )}
      <select 
        name={name} 
        id={id} 
        value={selectValue} 
        size={size} 
        title={title}
        onChange={onChange} 
        disabled={disabled} 
        aria-disabled={disabled ? "true" : "false"} 
        className={combinedSelectClassName}
        multiple={multiple}
        required={isRequired}>
          {options.map((option) => (
            <option key={option.id.toString()} value={option.value} hidden={option.hidden}>
              {option.label}
            </option>
          ))}        
      </select>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number, 
    PropTypes.string, 
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  hidden: PropTypes.bool,
  className: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  isRequired: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default Select;
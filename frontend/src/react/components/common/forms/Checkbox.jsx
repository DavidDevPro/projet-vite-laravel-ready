import PropTypes from 'prop-types';

const Checkbox = ({
  label, 
  id,
  name, 
  checked, 
  onChange, 
  title, 
  disabled,
  isRequired,
  className ='checkbox-container',
  inputClassName,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="checkbox-label">
        {label}{isRequired && <span className="required-marker">&#x2731;</span>}
      </label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        title={title}
        disabled={disabled}
        required={isRequired}
        aria-checked={checked}
        aria-required={isRequired}
        className={inputClassName}
      />
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

Checkbox.defaultProps = {
  isRequired: false,
  inputClassName: '',
};

export default Checkbox;

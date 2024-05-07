import PropTypes from 'prop-types';

const DateInput = ({
  label,
  id,
  name,
  value,
  onChange,
  title,
  isRequired,
  className = 'date-input-container',
  labelClassName = 'input-label',
  inputClassName = 'date-input-field',
  disabled,
}) => {

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
      {label}{label && " : "}{isRequired && <span className="required-marker">&#x2731;</span>}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        className={inputClassName}
        value={value}
        onChange={onChange}
        title={title}
        required={isRequired}
        disabled={disabled}
      />
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

DateInput.defaultProps = {
  isRequired: false,
  className: 'date-input-container',
  inputClassName: 'date-input-field',
  labelClassName: 'input-label',
};

export default DateInput;

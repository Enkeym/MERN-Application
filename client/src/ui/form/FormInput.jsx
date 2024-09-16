import {Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormInput = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  required = false,
  errorMessage,
  pattern,
  min,
  step,
  controlId,
  autoFocus = false,
  ...rest
}) => {
  const dynamicMessage = errorMessage
    ? `Error: ${errorMessage}`
    : placeholder || label;

  return (
    <Form.Group className='mb-3' controlId={controlId}>
      {label && (
        <Form.Label htmlFor={controlId}>
          {label}
          <span className="info-icon" title={dynamicMessage} style={{marginLeft: '5px', cursor: 'pointer'}}>?</span>
        </Form.Label>
      )}
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        required={required}
        title={dynamicMessage}
        aria-label={dynamicMessage}
        pattern={pattern}
        min={min}
        step={step}
        isInvalid={!!errorMessage}
        {...rest}
      />
      {errorMessage && (
        <Form.Text className="text-danger">
          {errorMessage}
        </Form.Text>
      )}
    </Form.Group>
  );
};

FormInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  pattern: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  controlId: PropTypes.string,
  autoFocus: PropTypes.bool
};

export default FormInput;

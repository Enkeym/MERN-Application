import { Form } from 'react-bootstrap';

const FormInput = ({
  value,
  onChange,
  placeholder,
  type,
  name,
  required = false,
  title,
  pattern = false,
  min,
  step,
  controlId 
}) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus
        required={required}
        title={title}
        pattern={pattern}
        min={min !== false ? min : undefined} 
        step={step !== false ? step : undefined} 
        id={controlId} 
      />
    </Form.Group>
  );
};

export default FormInput;

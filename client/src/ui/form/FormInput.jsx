import {Form} from 'react-bootstrap';

// Компонент для отображения текстового поля формы
const FormInput = ({
  value,
  onChange,
  placeholder,
  type,
  name,
  required = false,
  title,
  pattern = false,
  min = false,
  step = false,
  controlId = false
}) => {
  return (
    <Form.Group className='mb-3'>
      {/* Выводим метку поля */}
      <Form.Label>{name}</Form.Label>
      {/* Создаем текстовое поле */}
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus
        required={required}
        title={title}
        pattern={pattern}
        min={min}
        step={step}
        controlId={controlId}
      />
    </Form.Group>
  );
};

export default FormInput;

import {Form} from 'react-bootstrap'

// eslint-disable-next-line react/prop-types
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
        min={min}
        step={step}
        controlId={controlId}
      />
    </Form.Group>
  )
}
export default FormInput

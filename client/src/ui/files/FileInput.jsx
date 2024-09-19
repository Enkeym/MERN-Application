import {Form} from 'react-bootstrap';

const FileInput = ({onChange, ...props}) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{props.name}</Form.Label>
      <Form.Control
        type='file'
        onChange={onChange}
        {...props}
      />
    </Form.Group>
  );
};

export default FileInput;
import {Form, Image, Alert, Row, Col} from 'react-bootstrap';
import {useState} from 'react';

const FileInput = ({
  onChange,
  accept = 'image/*',
  multiple = false,
  maxSizeMB = 2,
  ...props
}) => {
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];

      // Проверка типа файла
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        setFileName('');
        setPreview(null);
        return;
      }

      // Проверка размера файла
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        setError(`File size exceeds the ${maxSizeMB}MB limit.`);
        setFileName('');
        setPreview(null);
        return;
      }


      setError(null);
      setFileName(file.name);
      const imagePreviewUrl = URL.createObjectURL(file);
      setPreview(imagePreviewUrl);
      onChange(e);

    } else {
      setFileName('');
      setPreview(null);
      setError(null);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        aria-label="File input"
        {...props}
      />

      <Row className="align-items-center mt-3">
        {preview && (
          <Col xs="auto">
            <Image src={preview} thumbnail alt="Image preview" style={{maxHeight: '100px', marginRight: '10px'}} />
          </Col>
        )}
        {fileName && <Col><Form.Text className="text-muted">{fileName}</Form.Text></Col>}
      </Row>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form.Group>
  );
};

export default FileInput;

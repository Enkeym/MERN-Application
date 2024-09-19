import {useEffect, useRef, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import FormInput from './FormInput'
import FileInput from '../files/FileInput'
import FormOption from '../options/FormOption'

const FormProduct = ({onSubmit, initialData = {}, isLoading}) => {
  const prevInitialDataRef = useRef();

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    price: initialData.price || '',
    description: initialData.description || '',
    categoryId: initialData.categoryId || '',
    image: null,
  });

  const {title, price, description, categoryId, image} = formData;

  useEffect(() => {
    if (JSON.stringify(prevInitialDataRef.current) !== JSON.stringify(initialData)) {
      setFormData({
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || '',
        categoryId: initialData.categoryId || '',
        image: null,
      });
    }
    prevInitialDataRef.current = initialData;
  }, [initialData]);

  const onChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append('title', title)
    form.append('price', price)
    form.append('description', description)
    form.append('categoryId', categoryId)

    if (image) {
      form.append('image', image)
    }

    onSubmit(form)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        name='Name'
        value={title}
        onChange={onChange}
        placeholder='Name'
        type='text'
        required
      />
      <FormInput
        name='Price'
        value={price}
        onChange={onChange}
        placeholder='Price'
        type='number'
        min='0'
        step='0.01'
        required
      />
      <FormInput
        name='Description'
        value={description}
        onChange={onChange}
        placeholder='Description'
        type='text'
        required
      />
      <FileInput
        name='Image'
        onChange={handleImageChange}
      />
      <FormOption
        name='Category'
        value={categoryId}
        onChange={onChange}
        initialName={categoryId}
        required
      />
      {isLoading ? (
        <Button variant="primary" disabled>
          Loading...
        </Button>
      ) : (
        <Button type="submit" variant="primary" className="me-2">
          Save
        </Button>
      )}
    </Form>
  )
}

export default FormProduct
import {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {useAddCategoriesMutation} from '../../../app/services/categoryApi';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import FormInput from '../../../ui/form/FormInput';


const AddCategory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    setSlug(name.toLowerCase());
  }, [name]);

  const [addCategories] = useAddCategoriesMutation();
  const navigate = useNavigate();


  const handleAddProducts = async (e) => {
    e.preventDefault();

    try {
      await addCategories({name, slug}).unwrap();
      toast.success('Created successfully!');
      handleClose();
      setName('');
      navigate('/products/my');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <>
      <Button variant='success' onClick={handleShow} className='m-1'>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProducts}>
            <FormInput
              name='Category name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              pattern='[a-zA-Z]*'
              title='Only latin letters'
              type='text'
              placeholder='name'
            />

            <Button type='submit' variant='primary' className='me-2'>
              Add
            </Button>

            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategory;

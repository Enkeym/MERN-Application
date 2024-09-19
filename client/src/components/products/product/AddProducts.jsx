import {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useAddProductMutation} from '../../../app/services/productsApi';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import FormProduct from '../../../ui/forms/FormProduct';


const AddProducts = () => {
  const [show, setShow] = useState(false);
  const [addProducts, {isLoading}] = useAddProductMutation();
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)

  const handleAddProducts = async (formData) => {
    try {
      await addProducts(formData).unwrap();
      toast.success('Product created successfully!');
      handleClose();
      navigate('/products/my');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow} className='m-1'>
        Add Product
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormProduct onSubmit={handleAddProducts} isLoading={isLoading} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProducts;

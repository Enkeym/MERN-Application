import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useRegisterMutation} from '../app/services/usersApi';
import {setCredentials} from '../features/authSlice';
import {toast} from 'react-toastify';
import Loader from '../components/loader/Loader';
import FormInput from '../ui/form/FormInput';

// Паттерны для валидации полей
const namePattern = /^[A-Za-z0-9]{1,16}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {name, email, password, confirmPassword} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading}] = useRegisterMutation();

  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/products/my');
    }
  }, [navigate, userInfo]);

  const onChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name' && !namePattern.test(value)) {
      error = 'Name must contain only letters and numbers, up to 9 characters.';
    }
    if (name === 'email' && !emailPattern.test(value)) {
      error = 'Please enter a valid email address.';
    }
    if (name === 'password' && !passwordPattern.test(value)) {
      error = 'Password must be 6-16 characters and contain only letters and numbers.';
    }
    if (name === 'confirmPassword' && value !== formData.password) {
      error = 'Passwords do not match.';
    }

    setErrors({...errors, [name]: error});
  };

  const isFormValid = () => {
    const valid = !Object.values(errors).some((error) => error) && Object.values(formData).every((value) => value !== '');
    return valid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const res = await register({name, email: email.toLowerCase(), password}).unwrap();
      dispatch(setCredentials(res));
      navigate('/products/my');
    } catch (error) {
      toast.error(error?.data?.message || 'Registration failed');
    }
  };

  return (
    <Layout>
      <h1>Sign Up</h1>
      <Form className='mt-3' onSubmit={submitHandler}>
        <FormInput
          name='name'
          type='text'
          placeholder='Name'
          value={name}
          onChange={onChange}
          errorMessage={errors.name}
          required
        />

        <FormInput
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={onChange}
          errorMessage={errors.email}
          required
        />

        <FormInput
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={onChange}
          errorMessage={errors.password}
          controlId='password'
          required
        />

        <FormInput
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={onChange}
          errorMessage={errors.confirmPassword}
          controlId='confirmPassword'
          required
        />

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3' disabled={!isFormValid()}>
          Sign Up
        </Button>

        <Row className='py-3'>
          <Col>
            Already have an account? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default Register;

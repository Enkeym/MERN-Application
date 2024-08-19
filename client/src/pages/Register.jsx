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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading}] = useRegisterMutation();

  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/products/my');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const res = await register({name, email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/products/my');
      } catch (err) {
        toast.error(err?.data?.message || 'Registration failed');
      }
    } else {
      toast.error('Passwords do not match');
    }
  };

  return (
    <Layout>
      <h1>Sign Up</h1>
      <Form className='mt-3' onSubmit={submitHandler}>
        <FormInput
          name='Name'
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          pattern='[A-Za-z0-9]{1,9}'
          title='Only letters and numbers are allowed and no more than 9 characters'
          required
        />

        <FormInput
          name='Email address'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          name='Password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern='[A-Za-z0-9]{1,16}'
          title='Only letters and numbers are allowed and no more than 16 characters'
          controlId='password'
          required
        />

        <FormInput
          name='Confirm Password'
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          pattern='[A-Za-z0-9]{1,16}'
          title='Only letters and numbers are allowed and no more than 16 characters'
          controlId='confirmPassword'
          required
        />

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
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

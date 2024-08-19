import {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import Loader from '../components/loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {useUpdateMutation} from '../app/services/usersApi';
import {setCredentials} from '../features/authSlice';
import FormInput from '../ui/form/FormInput';

const Profile = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth);
  const [update, {isLoading}] = useUpdateMutation();

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const res = await update({password}).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('Profile updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error('Passwords do not match');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Layout>
      <h1>Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2'>
          <Form.Label>Name:</Form.Label>
          <Form.Control type='text' readOnly value={userInfo.name} />
        </Form.Group>

        <Form.Group className='my-2'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type='email' readOnly value={userInfo.email} />
        </Form.Group>

        <FormInput
          name='New Password'
          type='password'
          placeholder='Enter new password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <FormInput
          name='Confirm Password'
          type='password'
          placeholder='Confirm new password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
      </Form>
    </Layout>
  );
};

export default Profile;

import {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import Loader from '../components/loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {useUpdateMutation} from '../app/services/usersApi';
import {setCredentials} from '../features/authSlice';
import FormInput from '../ui/forms/FormInput';

const passwordPattern = /^[a-z0-9]{6,16}$/;

const Profile = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  })

  const {password, confirmPassword} = formData
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth);
  const [update, {isLoading}] = useUpdateMutation();

  useEffect(() => {
    setFormData({password: '', confirmPassword: ''})
  }, [userInfo]);

  const validateField = (name, value) => {
    let error = '';

    if (name === 'password' && !passwordPattern.test(value)) {
      error = 'Password must be 6-16 characters and contain only letters and numbers.';
    }

    if (name === 'confirmPassword' && value !== formData.password) {
      error = 'Passwords do not match.';
    }

    setErrors((prev) => ({...prev, [name]: error}));
  }

  const onChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    validateField(name, value);
  }

  const isFormValid = () => {
    return !Object.values(errors).some((error) => error) && Object.values(formData).every((value) => value !== '');
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const res = await update({password}).unwrap()
      dispatch(setCredentials(res))
      toast.success('Password updated successfully')
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update password')
    }
  };

  return (
    <Layout>
      <h1>Profile</h1>

      <Form onSubmit={submitHandler}>
        <FormInput
          name='Name'
          type='text'
          placeholder='Name'
          value={userInfo.name}
          readOnly
        />

        <FormInput
          name='Email'
          type='email'
          placeholder='Email'
          value={userInfo.email}
          readOnly
        />

        <FormInput
          name='password'
          type='password'
          placeholder='Enter new password'
          value={password}
          onChange={onChange}
          errorMessage={errors.password}
          required
        />

        <FormInput
          name='confirmPassword'
          type='password'
          placeholder='Confirm new password'
          value={confirmPassword}
          onChange={onChange}
          errorMessage={errors.confirmPassword}
          required
        />

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3' disabled={!isFormValid()}>
          Save
        </Button>
      </Form>
    </Layout>
  );
};

export default Profile;

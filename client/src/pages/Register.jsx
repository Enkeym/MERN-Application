import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useRegisterMutation} from '../app/services/users';
import {setCredentials} from '../features/authSlice';
import {toast} from 'react-toastify';
import Loader from '../components/loader/Loader';
import FormInput from '../ui/form/FormInput';

const Register = () => {
  // Состояния для хранения данных формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Хук для навигации
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mutation для регистрации пользователя
  const [register, {isLoading}] = useRegisterMutation();

  // Получение информации о пользователе из Redux
  const {userInfo} = useSelector((state) => state.auth);

  // Проверка, если пользователь уже зарегистрирован, переадресация на страницу "Мои продукты"
  useEffect(() => {
    if (userInfo) {
      navigate('/products/my');
    }
  }, [navigate, userInfo]);

  // Обработчик отправки формы
  const submitHandler = async (e) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (password === confirmPassword) {
      try {
        // Отправка запроса на регистрацию
        const res = await register({name, email, password}).unwrap();
        // Установка учетных данных в Redux
        dispatch(setCredentials({...res}));
        // Переадресация на страницу "Мои продукты" после успешной регистрации
        navigate('/products/my');
      } catch (err) {
        // Обработка ошибки при регистрации
        toast.error(err?.data?.message || 'Registration failed');
      }
    } else {
      // Вывод сообщения, если пароли не совпадают
      toast.error('Passwords do not match');
    }
  };

  return (
    <Layout>
      {/* Форма регистрации */}
      <h1>Sign Up</h1>
      <Form className='mt-3' onSubmit={submitHandler}>
        {/* Поле ввода имени */}
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

        {/* Поле ввода адреса электронной почты */}
        <FormInput
          name='Email address'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Поле ввода пароля */}
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

        {/* Поле для подтверждения пароля */}
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

        {/* Отображение загрузчика во время отправки запроса */}
        {isLoading && <Loader />}

        {/* Кнопка для отправки формы */}
        <Button type='submit' variant='primary' className='mt-3'>
          Sign Up
        </Button>

        {/* Ссылка для перехода на страницу входа */}
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

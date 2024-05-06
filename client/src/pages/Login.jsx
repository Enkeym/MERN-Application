// Импорт необходимых библиотек и компонентов
import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Layout from '../components/layout/Layout'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useLoginMutation} from '../app/services/users'
import {setCredentials} from '../features/authSlice'
import {toast} from 'react-toastify'
import Loader from '../components/loader/Loader'
import FormInput from '../ui/form/FormInput'

// Компонент для входа пользователя
const Login = () => {
  // Состояния для хранения значений электронной почты и пароля
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Хук для перехода на другие страницы
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Мутация для входа пользователя
  const [login, {isLoading}] = useLoginMutation()

  // Получение информации о пользователе из Redux
  const {userInfo} = useSelector((state) => state.auth)

  // Проверка, если пользователь уже вошел в систему, перенаправляем его на страницу со списком его продуктов
  useEffect(() => {
    if (userInfo) {
      navigate('/products/my')
    }
  }, [navigate, userInfo])

  // Обработчик события отправки формы
  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      // Выполняем вход пользователя
      const res = await login({email, password}).unwrap()
      // Устанавливаем учетные данные пользователя в Redux
      dispatch(setCredentials({...res}))
      // Перенаправляем пользователя на страницу со списком его продуктов
      navigate('/products/my')
    } catch (err) {
      // В случае ошибки выводим сообщение об ошибке
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <Layout>
      <h1>Sign In</h1>
      {/* Форма для входа пользователя */}
      <Form className='mt-3' onSubmit={submitHandler}>
        {/* Поле для ввода электронной почты */}
        <FormInput
          name='Email'
          type={'email'}
          placeholder={'Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Поле для ввода пароля */}
        <FormInput
          name='Password'
          type={'password'}
          placeholder={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern='[a-zA-Z0-9]*'
          title='Only letters and numbers are allowed'
          required
        />

        {/* Отображение загрузчика во время выполнения запроса на вход */}
        {isLoading && <Loader />}

        {/* Кнопка для отправки формы */}
        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>

        {/* Ссылка для регистрации нового пользователя */}
        <Row className='py-3'>
          <Col>
            New Customer? <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </Form>
    </Layout>
  )
}
export default Login

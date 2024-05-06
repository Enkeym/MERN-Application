import {useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import Layout from '../components/layout/Layout'
import Loader from '../components/loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {useUpdateMutation} from '../app/services/users'
import {setCredentials} from '../features/authSlice'
import FormInput from '../ui/form/FormInput'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const {userInfo} = useSelector((state) => state.auth)

  const [update, {isLoading}] = useUpdateMutation()

  // Заполняем состояние данными пользователя после загрузки страницы
  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.name, userInfo.email])

  // Обработчик отправки формы
  const submitHandler = async (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      try {
        // Вызываем мутацию обновления профиля
        const res = await update({password}).unwrap()
        // Обновляем информацию о пользователе в хранилище
        dispatch(setCredentials({...res}))
        // Выводим уведомление об успешном обновлении
        toast.success('Profile updated')
        // Очищаем поля пароля
        setPassword('')
        setConfirmPassword('')
      } catch (err) {
        // Обрабатываем ошибку и выводим сообщение
        toast.error(err?.data?.message || err.error)
      }
    } else {
      // Выводим сообщение об ошибке, если пароли не совпадают
      toast.error('Passwords do not match')
      // Очищаем поля пароля
      setPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <Layout>
      <h1>Profile</h1>

      <Form onSubmit={submitHandler}>
        {/* Поле с именем пользователя */}
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name: {name}</Form.Label>
        </Form.Group>

        {/* Поле с электронной почтой пользователя */}
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email: {email}</Form.Label>
        </Form.Group>

        {/* Поле ввода пароля */}
        <FormInput
          name='Password'
          type='password'
          placeholder={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern='[a-zA-Z0-9].{16}*'
          title='Only letters and numbers are allowed and no more than 16 characters'
          controlId='password'
          required
        />

        {/* Поле для подтверждения пароля */}
        <FormInput
          name='Confirm Password'
          type='password'
          placeholder={'confirm password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          pattern='[a-zA-Z0-9].{16}*'
          title='Only letters and numbers are allowed and no more than 16 characters'
          controlId='confirmPassword'
          required
        />

        {/* Отображаем загрузчик, если запрос выполняется */}
        {isLoading && <Loader />}

        {/* Кнопка сохранения изменений */}
        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
      </Form>
    </Layout>
  )
}
export default Profile

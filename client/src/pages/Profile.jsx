import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Layout from '../components/layout/Layout'
import Loader from '../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useUpdateMutation } from '../app/services/users'
import { setCredentials } from '../features/authSlice'
import FormInput from '../ui/form/FormInput'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [update, { isLoading }] = useUpdateMutation()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.name, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      try {
        const res = await update({ password }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated')
        setPassword('')
        setConfirmPassword('')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    } else {
      toast.error('Password do not match')
      setPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <Layout>
      <h1>Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name: {name}</Form.Label>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email: {email}</Form.Label>
        </Form.Group>

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

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
      </Form>
    </Layout>
  )
}
export default Profile

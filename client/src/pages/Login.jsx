import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Layout from '../components/layout/Layout'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useLoginMutation} from '../app/services/usersApi'
import {setCredentials} from '../features/authSlice'
import {toast} from 'react-toastify'
import Loader from '../components/loader/Loader'
import FormInput from '../ui/form/FormInput'
import {setCartItems} from '../features/cartSlice'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [login, {isLoading}] = useLoginMutation()


  const {userInfo} = useSelector((state) => state.auth)


  useEffect(() => {
    if (userInfo) {
      navigate('/products/my')
    }
  }, [navigate, userInfo])


  const submitHandler = async (e) => {
    e.preventDefault()

    try {

      const res = await login({email, password}).unwrap()

      dispatch(setCredentials(res))

      const cartItems = localStorage.getItem('CartItems')
      if (cartItems) {
        dispatch(setCartItems(JSON.parse(cartItems)))
        localStorage.removeItem('CartItems')
      }

      navigate('/products/my')
    } catch (err) {

      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <Layout>
      <h1>Sign In</h1>
      <Form className='mt-3' onSubmit={submitHandler}>
        <FormInput
          name='Email'
          type={'email'}
          placeholder={'Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

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

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>

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

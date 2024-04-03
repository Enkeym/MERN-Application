import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import Loader from '../components/loader/Loader'
import {Button, Card, Container} from 'react-bootstrap'
import {
  useProductByIdQuery,
  useRemoveProductMutation
} from '../app/services/products'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

const ProductDetails = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data = [], isLoading} = useProductByIdQuery(id)
  const {image, title, price, description, userId} = data
  const [remove] = useRemoveProductMutation()

  const {userInfo} = useSelector((state) => state.auth)

  {
    isLoading && <Loader />
  }

  {
    data ? data : <Navigate to='/' />
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      await remove(data.id).unwrap()
      toast.success('successfully deleted!')
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
      <Card style={{width: '25rem'}}>
        <Card.Img variant='top' src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{price}<span>&#36;</span></Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          {userInfo && userInfo.id === userId ? (
            <>
              <Link to={`/products/edit/${data.id}`}>
                <Button variant='secondary' className='me-2'>
                  Edit
                </Button>
              </Link>
              <Button onClick={handleDelete} variant='danger'>
                Delete
              </Button>
            </>
          ) : (
            <Button variant='primary'>Buy</Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}
export default ProductDetails

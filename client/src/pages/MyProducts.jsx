import {toast} from 'react-toastify'
import Loader from '../components/loader/Loader'
import {useSelector} from 'react-redux'
import AddProducts from '../components/products/product/AddProducts'
import AddCategory from '../components/products/category/AddCategory'
import MainProduct from '../components/products/product/MainProduct'
import {useProductByIdQuery} from '../app/services/products'
import {Container} from 'react-bootstrap'

const MyProducts = () => {
  const {userInfo} = useSelector((state) => state.auth)

  const {data = [], isLoading, isError} = useProductByIdQuery('')

  let result = data.filter((item) => item.userId === userInfo.id)


  return (
    <Container className='text-center p-3'>
      <AddCategory />
      <AddProducts />
      {isLoading && <Loader />}
      {isError && toast.error('Error!')}
      <MainProduct data={result} />
    </Container>
  )
}
export default MyProducts

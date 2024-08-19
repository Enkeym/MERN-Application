import {toast} from 'react-toastify'
import Loader from '../components/loader/Loader'
import {useSelector} from 'react-redux'
import AddProducts from '../components/products/product/AddProducts'
import AddCategory from '../components/products/category/AddCategory'
import MainProduct from '../components/products/product/MainProduct'
import {Container} from 'react-bootstrap'
import {useMyProductsQuery} from '../app/services/productsApi'


const MyProducts = () => {

  const {userInfo} = useSelector((state) => state.auth)

  const currentPage = useSelector((state) => state.products.currentPage)
  const currentPageSize = useSelector((state) => state.products.currentPageSize)


  const {
    data = [],
    isLoading,
    isError
  } = useMyProductsQuery({
    userId: userInfo.id,
    page: currentPage,
    pageSize: currentPageSize
  })


  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error('Error!');
    return null;
  }


  return (
    <Container className='text-center p-3'>
      <AddCategory />
      <AddProducts />
      <MainProduct data={data} />
    </Container>
  );
}

export default MyProducts;

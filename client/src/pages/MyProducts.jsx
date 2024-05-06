import {toast} from 'react-toastify'
import Loader from '../components/loader/Loader'
import {useSelector} from 'react-redux'
import AddProducts from '../components/products/product/AddProducts'
import AddCategory from '../components/products/category/AddCategory'
import MainProduct from '../components/products/product/MainProduct'
import {Container} from 'react-bootstrap'
import {useMyProductsQuery} from '../app/services/products'

// Компонент для отображения списка продуктов пользователя
const MyProducts = () => {
  // Получение информации о текущем пользователе из Redux
  const {userInfo} = useSelector((state) => state.auth)
  // Получение текущей страницы и размера страницы из Redux
  const currentPage = useSelector((state) => state.product.currentPage)
  const currentPageSize = useSelector((state) => state.product.currentPageSize)

  // Получение списка продуктов пользователя с использованием запроса useMyProductsQuery
  const {
    data = [], // Данные о продуктах
    isLoading, // Флаг загрузки
    isError // Флаг ошибки
  } = useMyProductsQuery({
    userId: userInfo.id, // Идентификатор пользователя для фильтрации продуктов
    page: currentPage, // Текущая страница
    pageSize: currentPageSize // Размер страницы
  })

  // Обработка загрузки и ошибок
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error('Error!');
    return null;
  }


  // Отображение списка продуктов пользователя
  return (
    <Container className='text-center p-3'>
      <AddCategory />
      <AddProducts />
      <MainProduct data={data} />
    </Container>
  );
}

export default MyProducts;

import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import Loader from '../components/loader/Loader'
import {Button, Card, Container} from 'react-bootstrap'
import {useProductByIdQuery, useRemoveProductMutation} from '../app/services/products'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

const ProductDetails = () => {
  const navigate = useNavigate() // Хук для навигации между страницами
  const {id} = useParams() // Хук для получения параметров маршрута
  const {data = [], isLoading} = useProductByIdQuery(id) // Запрос данных о продукте по ID
  const {image, title, price, description, userId} = data // Деструктуризация данных о продукте
  const [remove] = useRemoveProductMutation() // Мутация для удаления продукта
  const {userInfo} = useSelector((state) => state.auth) // Получение информации о текущем пользователе из Redux Store

  // Если данные загружаются, отображаем компонент загрузки
  {
    isLoading && <Loader />
  }

  // Если данные о продукте не получены, перенаправляем пользователя на главную страницу
  {
    data ? data : <Navigate to='/' />
  }

  // Обработчик удаления продукта
  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      await remove(data.id).unwrap() // Выполнение удаления продукта
      toast.success('Successfully deleted!') // Уведомление об успешном удалении
      navigate('/products') // Перенаправление пользователя на главную страницу
    } catch (err) {
      toast.error(err?.data?.message || err.error) // Отображение ошибки удаления
    }
  }

  return (
    <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
      {/* Карточка с информацией о продукте */}
      <Card style={{width: '25rem'}}>
        <Card.Img variant='top' src={image} /> {/* Изображение продукта */}
        <Card.Body>
          <Card.Title>{title}</Card.Title> {/* Название продукта */}
          <Card.Subtitle>{price}<span>&#36;</span></Card.Subtitle> {/* Цена продукта */}
          <Card.Text>{description}</Card.Text> {/* Описание продукта */}
          {/* Управление кнопками в зависимости от аутентификации пользователя и владельца продукта */}
          {userInfo && userInfo.id === userId ? ( // Если пользователь аутентифицирован и является владельцем продукта
            <> {/* Фрагмент для вложенных элементов */}
              <Link to={`/products/edit/${data.id}`}> {/* Ссылка для перехода к редактированию продукта */}
                <Button variant='secondary' className='me-2'> {/* Кнопка для редактирования */}
                  Edit
                </Button>
              </Link>
              <Button onClick={handleDelete} variant='danger'> {/* Кнопка для удаления */}
                Delete
              </Button>
            </>
          ) : ( // Если пользователь не является владельцем продукта
            <Button variant='primary'>Buy</Button> //Кнопка удаления продуктов 
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}
export default ProductDetails

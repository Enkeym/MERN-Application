import {Card, Container} from 'react-bootstrap' // Импорт компонентов из библиотеки react-bootstrap
import {Link} from 'react-router-dom' // Импорт компонента Link из react-router-dom
import Paginator from '../../pagination/Paginator' // Импорт компонента Paginator

/**
 * Компонент MainProduct отображает список продуктов.
 * Если список пуст, выводится сообщение о том, что продукты не найдены или пользователь еще не добавил свой первый продукт.
 * Иначе отображается список продуктов в виде карточек с возможностью перехода на страницу продукта по клику.
 * Под списком продуктов отображается пагинация, если список продуктов не пустой и имеет несколько страниц.
 *
 * @param {object} data - Объект с данными о продуктах.
 * @param {array} data.currentPageProducts - Массив с данными о продуктах текущей страницы.
 * @param {number} data.totalPages - Общее количество страниц с продуктами.
 * @returns {JSX.Element} - Элемент компонента MainProduct.
 */
const MainProduct = ({data}) => {
  const {currentPageProducts, totalPages} = data // Деструктуризация объекта с данными о продуктах

  // Если список продуктов пуст, выводится сообщение о том, что продукты не найдены или пользователь еще не добавил свой первый продукт
  if (!currentPageProducts || currentPageProducts.length === 0) {
    return (
      <Container
        className='d-flex justify-content-center align-items-center mt-5'
        style={{color: 'red'}}
      >
        <h2>Product not found or add your first product!</h2>
      </Container>
    )
  }

  // Отображение списка продуктов в виде карточек с возможностью перехода на страницу продукта по клику
  return (
    <>
      <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
        {/* Маппинг списка продуктов для создания карточек */}
        {currentPageProducts?.map((items) => {
          const {id, title, image, description, price} = items // Деструктуризация данных о продукте
          return (
            <Link
              to={`/products/${id}`} // Ссылка на страницу продукта
              key={id}
              style={{textDecoration: 'none'}} // Стиль ссылки
            >
              {/* Карточка продукта */}
              <Card style={{width: '25rem'}}>
                <Card.Img
                  variant='top'
                  src={image}
                  style={{height: '300px'}} // Стиль изображения
                />
                <Card.Body>
                  <Card.Title>{title}</Card.Title> {/* Заголовок продукта */}
                  {/* Цена продукта */}
                  <Card.Subtitle className='py-1'>
                    {price}
                    <span>&#36;</span>
                  </Card.Subtitle>
                  <Card.Text>{description}</Card.Text> {/* Описание продукта */}
                </Card.Body>
              </Card>
            </Link>
          )
        })}
      </Container>

      {/* Пагинация, если список продуктов не пустой и имеет несколько страниц */}
      {currentPageProducts && currentPageProducts.length > 0 && (
        <div className='d-flex justify-content-center'>
          <Paginator totalPages={totalPages} /> {/* Компонент пагинации */}
        </div>
      )}
    </>
  )
}

export default MainProduct // Экспорт компонента MainProduct

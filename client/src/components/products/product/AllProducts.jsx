import SearchTitle from '../search/SearchTitle'
import {useAllProductsQuery} from '../../../app/services/products'
import {useSelector} from 'react-redux'
import Loader from '../../loader/Loader'
import SelectCategory from '../category/SelectCategory'
import OneProduct from './OneProduct'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'

// Компонент для отображения всех продуктов
const AllProducts = () => {
  const [products, setProducts] = useState([])

  // Получение фильтрованных данных из Redux-стейта
  const searchName = useSelector((state) => state.product.searchName)
  const categoryName = useSelector((state) => state.product.categoryName)
  const currentPage = useSelector((state) => state.product.currentPage)
  const currentPageSize = useSelector((state) => state.product.currentPageSize)

  // Вызов хука useAllProductsQuery для получения данных о продуктах
  const {data, isLoading, isError} = useAllProductsQuery({
    category: categoryName,
    search: searchName,
    page: currentPage,
    pageSize: currentPageSize,
  })

  useEffect(() => {
    if (data) {
      setProducts(data || [])
    }
  }, [data])


  // Возвращение разметки с компонентами для выбора категории, поиска и отображения продуктов
  return (
    <div>
      <SelectCategory />
      {isError && toast.error(isError)}
      {isLoading && <Loader />}
      <SearchTitle />
      <OneProduct data={products} />
    </div>
  )
}

export default AllProducts

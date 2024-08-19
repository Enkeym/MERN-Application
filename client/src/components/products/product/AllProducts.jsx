import SearchTitle from '../search/SearchTitle'
import {useAllProductsQuery} from '../../../app/services/productsApi'
import {useSelector} from 'react-redux'
import Loader from '../../loader/Loader'
import SelectCategory from '../category/SelectCategory'
import OneProduct from './OneProduct'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'


const AllProducts = () => {
  const [products, setProducts] = useState([])

  
  const searchName = useSelector((state) => state.products.searchName)
  const categoryName = useSelector((state) => state.products.categoryName)
  const currentPage = useSelector((state) => state.products.currentPage)
  const currentPageSize = useSelector((state) => state.products.currentPageSize)


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

import SearchTitle from '../search/SearchTitle'
import { useAllProductsQuery } from '../../../app/services/products'
import { useSelector } from 'react-redux'
import Loader from '../../loader/Loader'
import SelectCategory from '../category/SelectCategory'
import OneProduct from './OneProduct'
import { toast } from 'react-toastify'

const AllProducts = () => {
  const searchName = useSelector((state) => state.product.searchName)
  const categoryName = useSelector((state) => state.product.categoryName)

  const body = {
    search: searchName,
    category: categoryName
  }

  const { data = [], isLoading, isError } = useAllProductsQuery(body)

  {
    isLoading && <Loader />
  }
  {
    isError && toast.error('Error!')
  }

  return (
    <>
      <SelectCategory body={body} />
      <SearchTitle />
      <OneProduct data={data} body={body} />
    </>
  )
}

export default AllProducts

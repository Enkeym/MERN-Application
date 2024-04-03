import {useDispatch} from 'react-redux'
import {searchName} from '../../../features/productSlice'
import {useEffect, useState} from 'react'
import {useDebounce} from '../../../utils/debounce/debounce'
import {FormControl} from 'react-bootstrap'

const SearchTitle = () => {
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchName(debounced))
  }, [debounced, dispatch])

  return (

    <FormControl
      placeholder='search...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  )
}
export default SearchTitle
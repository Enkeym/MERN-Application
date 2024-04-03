import {Form} from 'react-bootstrap'
import {useGetCategoryQuery} from '../../app/services/category'
import Loader from '../../components/loader/Loader'

// eslint-disable-next-line react/prop-types
const FormOption = ({value, onChange, name = false}) => {
  const {data: categories = [], isLoading} = useGetCategoryQuery()

  {
    isLoading && <Loader />
  }


  return (
    <Form.Group className='mb-3'>
      <Form.Label>{name}</Form.Label>
      <Form.Select value={value} onChange={onChange} required>
        <option value=''>select category</option>
        {categories.map((category) => {
          const {id, slug, name: categoryName} = category
          return (
            <option key={id} value={slug}>
              {categoryName}
            </option>
          )
        })}
      </Form.Select>
    </Form.Group>
  )
}
export default FormOption
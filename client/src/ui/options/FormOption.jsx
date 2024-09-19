import {Form} from 'react-bootstrap';
import {useGetCategoryQuery} from '../../app/services/categoryApi';
import Loader from '../../components/loader/Loader';
import {useCallback} from 'react';

const FormOption = ({value, onChange}) => {
  const {data: categories = [], isLoading, isError} = useGetCategoryQuery();

  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Error loading categories.</p>;
  }

  if (categories.length === 0) {
    return <p>No categories available.</p>;
  }


  return (
    <Form.Group className="mb-3">
      <Form.Select value={value} onChange={handleChange} required>
        <option value="">Select category</option>
        {categories.map(({id, slug, name}) => (
          <option key={id} value={slug}>
            {name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default FormOption;

import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeCategory} from '../../../features/productsSlice';
import FormOption from '../../../ui/form/FormOption';


const SelectCategory = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();

  const handleChange = (e) => {
    dispatch(changeCategory(e.target.value));
    setCategories(e.target.value);
  };


  return <FormOption value={categories} onChange={handleChange} />;
};

export default SelectCategory;

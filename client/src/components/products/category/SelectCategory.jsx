import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeCategory, setPage} from '../../../features/productsSlice';
import FormOption from '../../../ui/options/FormOption';


const SelectCategory = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    dispatch(changeCategory(selectedCategory));
    dispatch(setPage(1))
    setCategories(selectedCategory);
  };


  return <FormOption value={categories} onChange={handleChange} />;
};

export default SelectCategory;

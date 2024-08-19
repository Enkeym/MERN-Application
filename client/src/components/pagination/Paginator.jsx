import {Pagination} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setPage} from '../../features/productsSlice';


const Paginator = ({totalPages}) => {

  const {currentPage} = useSelector((state) => state.products);

  const dispatch = useDispatch();


  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };


  const getPageItems = () => {
    const items = [];
    for (let number = 1;number <= totalPages;number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };


  return (
    <Pagination>

      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {getPageItems()}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default Paginator;

/* eslint-disable react/prop-types */
import MainProduct from './MainProduct'

const OneProduct = ({ data, body }) => {
  const filteredGoods =
    body?.category === ''
      ? data
      : data?.filter((item) => item.categoryId === body.category)

  return (
    <>
      {data?.length !== 0 ? (
        <MainProduct data={filteredGoods} />
      ) : (
        <h1 style={{ color: 'red', textAlign: 'center', margin: '3rem' }}>
          Product not found!
        </h1>
      )}
    </>
  )
}
export default OneProduct

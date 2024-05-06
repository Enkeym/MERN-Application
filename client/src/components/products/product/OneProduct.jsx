/* eslint-disable react/prop-types */ // Отключение проверки propTypes для этого компонента

import MainProduct from './MainProduct' // Импорт компонента MainProduct

/**
 * Компонент OneProduct просто передает принятые данные в компонент MainProduct.
 * Здесь нет особых действий или манипуляций с данными.
 * Используется отключение проверки propTypes для этого компонента.
 *
 * @param {object} data - Данные о продукте.
 * @returns {JSX.Element} - Элемент компонента MainProduct с переданными данными.
 */
const OneProduct = ({data}) => {
  return <MainProduct data={data} /> // Возврат элемента компонента MainProduct с переданными данными
}

export default OneProduct // Экспорт компонента OneProduct

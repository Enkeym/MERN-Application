import {Spinner} from 'react-bootstrap';

// Компонент для отображения загрузчика
const Loader = () => {
  return (
    <Spinner
      animation="border" // Тип анимации спиннера
      role="status" // Роль спиннера (для доступности)
      style={{
        width: '100px', // Ширина спиннера
        height: '100px', // Высота спиннера
        margin: 'auto', // Центрирование спиннера
        display: 'block', // Отображение спиннера как блочного элемента
      }}
    />
  );
};

export default Loader;

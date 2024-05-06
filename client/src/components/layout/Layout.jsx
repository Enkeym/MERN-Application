import {Col, Container, Row} from 'react-bootstrap';

// Компонент макета страницы
const Layout = ({children}) => {
  return (
    <Container> {/* Контейнер для размещения содержимого страницы */}
      <Row className='justify-content-md-center mt-5'> {/* Строка с выравниванием по центру */}
        <Col xs={12} md={6} className='card p-5'> {/* Колонка для содержимого страницы */}
          {children} {/* Дочерние компоненты передаются здесь */}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;

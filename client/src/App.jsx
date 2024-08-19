import { Outlet } from 'react-router-dom'; 
import Header from './components/header/Header'; 
import { Container } from 'react-bootstrap'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify'; 

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;

import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {FaSignInAlt, FaSignOutAlt, FaHome} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {useLogoutMutation} from '../../app/services/users'
import {useNavigate} from 'react-router-dom'
import {logout} from '../../features/authSlice'

const Header = () => {
  // Получение информации о текущем пользователе из Redux
  const {userInfo} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // Обработчик выхода из учетной записи
  const logoutHandler = async () => {
    try {
      // Вызов API для выхода из учетной записи
      await logoutApiCall().unwrap();
      // Диспетчеризация действия выхода из учетной записи в Redux
      dispatch(logout());
      // Перенаправление на главную страницу
      navigate('/products');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/products'>
            <Navbar.Brand className='d-flex align-items-center gap-1'>
              <FaHome size={25} /> Main
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/products/my'>
                      <NavDropdown.Item>My Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orders'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header

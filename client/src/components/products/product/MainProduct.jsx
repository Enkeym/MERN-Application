import {Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const MainProduct = ({data}) => {
  return (
    <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
      {data?.map((items) => {
        const {id, title, image, description, price} = items
        return (
          <Link
            to={`/products/${id}`}
            key={id}
            style={{textDecoration: 'none'}}
          >
            <Card style={{width: '25rem'}}>
              <Card.Img variant='top' src={image} style={{height: '300px'}} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className='py-1'>
                  {price}
                  <span>&#36;</span>
                </Card.Subtitle>
                <Card.Text>{description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        )
      })}
    </Container>
  )
}
export default MainProduct

import StoreItem from '../components/StoreItem';
import dataProducts from '../data/items.json';
import { Row, Col } from 'react-bootstrap';

export default function Store() {
  return (
    <>
      <h1>Store</h1>

      <Row md={2} xs={1} lg={3} className='g-3'>
        {/* We map the array of items to create a card for each one. */}
        {dataProducts.map(product => (
          <Col key={product.id}>
            <StoreItem {...product} />
          </Col>

        ))}
      </Row>
    
    </>
  )
}

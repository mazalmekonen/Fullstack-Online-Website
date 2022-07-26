import {useSelector} from 'react-redux';
import { imageExists} from '../../services/mazalStoreApi';
import imgNotFound from '../../assets/images/imgNotFound.png';
import {Card,Button,Spinner} from 'react-bootstrap';

function CardProducts({id,loaded,currentProducts,instantBuy,addToCartProduct}){
    const filteredProducts = useSelector(state =>state.filteredProducts);
    return(
        <ul id ={id}>
              {loaded && typeof filteredProducts[0] === 'object' && Object.keys(filteredProducts[0]).length !== 0?currentProducts.map((product)=>{
                  return(
                    <li className={'product-card-outer'} key={product.title}>
                      <Card className={'product-card'} >
                        <Card.Body className={'product-card-body'}>
                            <Card.Title className={'product-card-title'}>{product.title}</Card.Title>
                            <Card.Text className={'product-card-text'}>
                              {product.description}<br/>
                              <strong>{product.uploader}</strong><br/>
                              <strong>{product.price} $</strong>
                            </Card.Text>
                          </Card.Body>
                          <Card.Img className={'product-card-image'} src={imageExists(product.image)?product.image:imgNotFound}/>
                          <div className={'product-card-button-container'}>
                            <Button variant="success" className={'product-card-add'} onClick={()=>{addToCartProduct(product)}}>Add to Cart</Button>
                            <Button variant="success" className={'product-card-buy'} onClick={()=>{instantBuy(product)}}>Buy</Button>
                          </div>
                      </Card>
                    </li>
                  )
              }):<div id={'products-loader-container'}><Spinner animation="border" variant="dark" id={'products-loader'} /></div>}
        </ul>
    )
}
export default CardProducts;
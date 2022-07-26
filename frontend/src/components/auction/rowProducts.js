import {useSelector} from 'react-redux';
import { imageExists} from '../../services/mazalStoreApi';
import imgNotFound from '../../assets/images/imgNotFound.png';
import {Button,Spinner} from 'react-bootstrap';

function RowProducts({id,loaded,currentProducts,addToCartProduct,instantBuy}){
    const filteredProducts = useSelector(state =>state.filteredProducts);
    return(
        <ul id ={id}>
              {loaded && typeof filteredProducts[0] === 'object' && Object.keys(filteredProducts[0]).length !== 0?currentProducts.map((product)=>{
                  return(
                    <li className={'product-row-outer'} key={product.title}>
                        <img className={'product-row-image'} src={imageExists(product.image)?product.image:imgNotFound} alt='product'/>
                        <div className={'product-row'} >
                            <div className={'product-row-body'}>
                                <h2 className={'product-row-title'}>{product.title}</h2>
                                <div className={'product-row-text'}>
                                {product.description}<br/>
                                <strong>{product.uploader}</strong><br/>
                                </div>
                            </div>
                            <div className={'product-row-button-container'}>
                                <div className={'row-product-button-inner'}><strong>{product.price} $</strong></div>
                                <div className={'row-product-button-inner'}><Button variant="success" className={'product-row-add'} onClick={()=>{addToCartProduct(product)}}>Add to Cart</Button> <Button variant="success" className={'product-row-buy'} onClick={()=>{instantBuy(product)}}>Buy</Button></div>
                            </div>
                        </div>
                    </li>
                  )
              }):<div id={'products-loader-container'}><Spinner animation="border" variant="dark" id={'products-loader'} /></div>}
        </ul>
    )
}
export default RowProducts;
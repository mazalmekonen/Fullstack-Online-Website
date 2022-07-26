import React,{useState,useEffect} from 'react';
import AuctionHeader from '../components/auction/auctionHeader';
import {useSelector,useDispatch} from 'react-redux';
import {updateProducts,appendToCart} from '../store/actions';
import { getAllProducts, getUserData, addNewTransaction } from '../services/mazalStoreApi';
import { ToastAlert,sortDown,sortUp } from '../utils';
import PaginationComp from '../components/pagination';
import CardProducts from '../components/auction/cardProducts';
import RowProducts from '../components/auction/rowProducts';


function Auction(){
    const cardIdContainer = 'products-container';
    const hidden = 'hide';
    const rowIdContainer = 'row-products-container';
    const [cardId,setCardId] = useState(hidden);
    const [rowId,setRowId] = useState(hidden);
    const [products,setProducts] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const filteredProducts = useSelector(state =>state.filteredProducts);
    const loggedIn = useSelector(state =>state.isLogged);
    const [userData, setUserData] = useState([]);
    const [currentAlert,setCurrentAlert] = useState('');
    const [currentHeader,setCurrentHeader] = useState('');
    const [showAlert,setShowAlert] = useState(false);
    const [titleUp,setTitleUp] = useState(false);
    const [priceUp,setPriceUp] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const dispatch = useDispatch();
  
    useEffect(() => {
      function handleResize() {
        if(window.innerWidth < 1024){
            setCardId(hidden);
            setRowId(rowIdContainer);
        }else if(window.innerWidth > 1024){
            setCardId(cardIdContainer);
            setRowId(hidden);
        }
      }
      
      window.addEventListener("resize", handleResize)
      
      handleResize()
      
      return () => { 
        window.removeEventListener("resize", handleResize)
      }
    }, [])
  
    useEffect(()=>{
        getAllProducts(setProducts);
        document.title='store';
    },[]);
    useEffect(()=>{
      const email = localStorage.getItem('userEmail');
      getUserData(email,setUserData);
    },[loggedIn]);
    useEffect(()=>{
      if(filteredProducts.length === 1 && Object.keys(filteredProducts[0]).length === 0 && products.length > 0){
        dispatch(updateProducts(products));
        setLoaded(true);
        }else if(filteredProducts.length > 0 || filteredProducts.length === 0){
        setLoaded(true);
      }
  },[products]);
  
  const addToCartProduct = (product) =>{
    dispatch(appendToCart(product));
  }
  const instantBuy = (product) =>{
      if(loggedIn){
          var newTransaction = {
              items:[product],
              price:product.price,
              buyer:userData.email
          }
          addNewTransaction(newTransaction,setCurrentAlert,setCurrentHeader,setShowAlert);
      }else{
          setCurrentHeader('Transaction failed');
          setCurrentAlert('Not logged in!');
          setShowAlert(true);
      }
  }
  const sortByElement = (productElemtent) =>{
    let tempData = filteredProducts;
    switch(productElemtent){
        case 'title':
            if(titleUp){
                tempData.sort(function(a,b){
                    return sortUp(a,b,productElemtent);
                });
                setTitleUp(false);
            }else{
                tempData.sort(function(a,b){
                    return sortDown(a,b,productElemtent);
                });
                setTitleUp(true);  
            }
            break;
        case 'price':
            if(priceUp){
                tempData.sort(function(a,b){
                    return (b.price-a.price)
                });
                setPriceUp(false);
            }else{
                tempData.sort(function(a,b){
                    return (a.price-b.price)
                });
                setPriceUp(true);  
            }
            break;
        default:
            break;
    }
    dispatch(updateProducts(tempData));
    }
    const indexOfLastProduct = currentPage * postsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (number) =>{
        setCurrentPage(number);
    }
    return(
        <div id={'auction-container'}>
          <AuctionHeader original = {products} setCurrentPage = {setCurrentPage} sortByElement = {sortByElement} priceUp= {priceUp} titleUp = {titleUp}/>
            <div id={'products-container-outer'}>
                <CardProducts currentProducts={currentProducts} loaded={loaded} id={cardId} instantBuy={instantBuy} addToCartProduct={addToCartProduct}/>
                <RowProducts currentProducts={currentProducts} loaded={loaded} id={rowId} instantBuy={instantBuy} addToCartProduct={addToCartProduct}/>
            </div>
            <div style={{background:'#555555',width:'100%'}}> <PaginationComp postsPerPage = {postsPerPage} totalPosts = {filteredProducts.length} paginate={paginate} currentPage={currentPage} className={'pagination'}/></div>
            <ToastAlert alert = {currentAlert} show={showAlert} setShow = {setShowAlert} header={currentHeader}/>
          </div>
    );
}
export default Auction;
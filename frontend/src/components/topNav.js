import logo from "../assets/images/logo.jpg";
import {NavLink} from 'react-router-dom';
import Login from "./login";
import Register from './register';
import React,{ useEffect, useState} from 'react';
import {FaShoppingCart, FaSearchDollar} from 'react-icons/fa';
import {IoMdArrowDropdown} from 'react-icons/io';
import {GiEmptyWoodBucket} from 'react-icons/gi';
import { Dropdown, Badge, CloseButton, Button, DropdownButton,ButtonGroup} from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux';
import { isLoggedOut,updateProducts, removeOneProduct, removeAll } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { ToastAlert } from '../utils';
import { getAllProducts, payCart, userAuthenticated } from "../services/mazalStoreApi";

function TopNav(){
    const [totalCost,setTotalCost] = useState('');
    const [toSearch,setToSearch] = useState('');
    const [modalShowRegister, setModalShowRegister] = useState(false);
    const [modalShowLogin, setModalShowLogin] = useState(false);
    const loggedIn = useSelector(state =>state.isLogged);
    const cartList = useSelector(state =>state.cart);
    const [userData, setUserData] = useState([]);
    const [products,setProducts] = useState([]);
    const [currentAlert,setCurrentAlert] = useState('');
    const [currentHeader,setCurrentHeader] = useState('');
    const [showAlert,setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let counter = 0;


    const search  = (e) =>{
        if (e.key==='Enter' || e==='Enter'){
            dispatch(updateProducts(products.filter(product=>{
                return(product.title.toLowerCase().includes(toSearch.toLowerCase()))
            })));
            navigate('/auction',{replace: true, state:{original:products}});
            setToSearch('');
        }
    }
    const userLogout =() =>{
        dispatch(isLoggedOut());
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate('/',{replace: true});
    }
    const deleteProductFromCart =(productToRemove) =>{
        dispatch(removeOneProduct(productToRemove));
    }
    const RemoveAllFromCart = () =>{
        dispatch(removeAll());
    }
    useEffect(()=>{
        userAuthenticated(setUserData,dispatch);
        getAllProducts(setProducts);
    },[]);
    useEffect(()=>{
        let price = 0;
        cartList.map((product)=>{
            price+=parseInt(product.price);
            return price;
        });
        setTotalCost(price);
    },[cartList]);
    return(
        <section className="TopNav">
            <ul id ='topNav-outer'>
                    <NavLink to ='/' id ="logo-container"><img src={logo} id ="logo" alt='logo'/></NavLink>
                    <div id='searchIcon-container' onClick={()=>{search('Enter')}}><FaSearchDollar id='searchIcon'/></div>
                    <input placeholder={"search"} id = {"searchBar"} value = {toSearch} onKeyUp={search} onChange={(e)=>{setToSearch(e.target.value)}}/>
                    <NavLink to="/auction" className={({isActive}) => "links" + (isActive ? "-active" :"")}>Store</NavLink>
                    <Dropdown>
                        <Dropdown.Toggle id="account">
                            {loggedIn>0?'Hello, ' + userData.fullName:'Hello, Account'}
                            <IoMdArrowDropdown/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu id="account-dropdowns" >
                            {loggedIn>0?
                            <div>
                                <Dropdown.Item className='account-dropdowns-within'>
                                    <NavLink to="/myAccount" > My Account</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={userLogout} className='account-dropdowns-within'>
                                    Logout
                                </Dropdown.Item>
                            </div>:
                            <div>
                                <Dropdown.Item onClick={()=>{setModalShowLogin(true)}} className='account-dropdowns-within'>
                                    Login
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={()=>{setModalShowRegister(true)}} className='account-dropdowns-within'>
                                    Register
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item className='account-dropdowns-within'>
                                    <NavLink to={'/admin'}>Admin</NavLink>
                                </Dropdown.Item>
                            </div>}
                        </Dropdown.Menu>
                    </Dropdown>
                    <DropdownButton 
                    as={ButtonGroup}
                    drop={'start'}
                    title={<FaShoppingCart/>}
                    id='account'
                    >
                            {cartList.length>0?
                            <div id={'cart-outer'}>
                                    {cartList.map((product)=>{
                                    counter++;
                                    return(
                                    <Dropdown.ItemText key={product.title + counter} className="d-flex justify-content-between align-items-start cart-bg">
                                        <div className="ms-2 me-auto d-flex">
                                            <img src={product.image} className={'cart-image'} alt={'product'}/>
                                            <div className="fw-bold ms-2">
                                                {product.title}<br/>
                                                <span style={{fontWeight:'lighter'}}>{product.uploader}</span>
                                            </div>
                                        </div>
                                        <Badge bg="light" className={'cart-product-price'}>
                                            {product.price} $
                                        </Badge>
                                        <CloseButton onClick={()=>{deleteProductFromCart(product.title)}}/>
                                    </Dropdown.ItemText>
                                    )
                                    })}
                                    <div id={'cart-total-cost'}>Total cost: {totalCost} $</div>
                                    <div id={'cart-button-group-container'}>
                                        <Button letiant="success" className={'cart-button'} onClick={()=>{payCart(loggedIn, cartList, totalCost, userData, setCurrentAlert,setCurrentHeader,setShowAlert,dispatch)}}>Pay</Button>
                                        <GiEmptyWoodBucket className={'cart-button within'} onClick={RemoveAllFromCart}/>
                                    </div>
                            </div>
                            :""}
                    </DropdownButton>
                    
            </ul>
            <Login show={modalShowLogin} onHide={()=>{setModalShowLogin(false)}}/>
            <Register show={modalShowRegister} onHide={()=>{setModalShowRegister(false)}}/>
            <ToastAlert alert = {currentAlert} show={showAlert} setShow = {setShowAlert} header={currentHeader}/>
        </section>
    );
}
export default TopNav;
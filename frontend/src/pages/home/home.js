import React,{useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import "./home.css"
import {isLoggedOut} from '../../store/actions';
import Login from '../../components/login';
import Register from '../../components/register';

function Home(){
    const [modalShowRegister, setModalShowRegister] = useState(false);
    const [modalShowLogin, setModalShowLogin] = useState(false);
    const loggedIn = useSelector(state =>state.isLogged);
    const dispatch = useDispatch();
    const userLogout =() =>{
        dispatch(isLoggedOut());
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
    }
    useEffect(()=>{
        document.title='home';
    },[])
    return(
        <div>
            <section id = "homeContainer">
                <div id = "homeTitle"><h1 id='homeTitleFirst'>Welcome to</h1><h1 id='homeTitleLast'>Shopify</h1></div>
                    <div id="homeDescription">
                        <p id='homeContent'>Buy / Sell / Enjoy</p>
                            {loggedIn?
                            <div id="homeNavigation">
                                <NavLink className='homeLinksNav' to={'/myAccount'}>My Account</NavLink>
                                <button className='homeLinks' onClick={userLogout}>Logout</button>
                            </div>:
                            <div id="homeNavigation">
                                <button className= "homeLinks" onClick={()=>{setModalShowLogin(true)}}>Login</button>
                                <button className= "homeLinks" onClick={()=>{setModalShowRegister(true)}}>Register</button>
                            </div>
                            }
                        <Login show={modalShowLogin} onHide={()=>{setModalShowLogin(false)}}/>
                        <Register show={modalShowRegister} onHide={()=>{setModalShowRegister(false)}}/>
                </div>
            </section>
        </div>
    );
}
export default Home;
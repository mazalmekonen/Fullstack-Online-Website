import { useState,useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import './admin.css'
import Accounts from '../../components/admin/accounts';
import Products from '../../components/admin/products';
import Stats from '../../components/admin/stats';
import AdminLogin from '../../components/admin/adminLogin';
import logo from '../../assets/images/logo.jpg';

function Admin () {
    const toggled = 'my-account-header-list-toggled';
    const notToggled = 'my-account-header-list-notToggled'
    const [statsClass,setStatsClass] = useState(notToggled);
    const [productsClass,setProductsClass] = useState(notToggled);
    const [accountsClass,setAccountsClass] = useState(toggled);
    const [toggleStats,setToggleStats] = useState(false);
    const [toggleProducts,setToggleProducts] = useState(false);
    const [toggleAccounts,setToggleAccounts] = useState(true);
    


    const toggle = (name) =>{
        switch(name){
            case 'products':
                setToggleStats(false);
                setToggleProducts(true);
                setToggleAccounts(false);
                setAccountsClass(notToggled);
                setProductsClass(toggled);
                setStatsClass(notToggled);
                break;
            case 'accounts':
                setToggleStats(false);
                setToggleProducts(false);
                setToggleAccounts(true);
                setAccountsClass(toggled);
                setProductsClass(notToggled);
                setStatsClass(notToggled);
                break;
            case 'stats':
                setToggleStats(true);
                setToggleProducts(false);
                setToggleAccounts(false);
                setAccountsClass(notToggled);
                setProductsClass(notToggled);
                setStatsClass(toggled);
                break;
            default:
                    break;
        }
    }
    useEffect(()=>{
        document.title='admin';
    },[]);
    return(
        <div id={'my-account-outer'}>
            <AdminLogin/>
            <div className={'my-account'}>
            <section className='my-account-header'>
                <NavLink to ='/' id ="my-account-logo-container"><img src={logo} id ="my-account-logo" alt='logo'/></NavLink>
                <ul className={'my-account-header-list'}>
                    <li className={accountsClass} onClick={()=>{toggle('accounts')}}>Accounts</li>
                    <div className="solid"></div>
                    <li className={productsClass} onClick={()=>{toggle('products')}}>Products</li>
                    <div className="solid"></div>
                    <li className={statsClass} onClick={()=>{toggle('stats')}}>Stats</li>
                </ul>
            </section>
            <section className={'admin-content'}>
                {toggleAccounts?<Accounts/>:''}
                {toggleProducts?<Products/>:''}
                {toggleStats?<Stats/>:''}
            </section>
            </div>
        </div>
        );
}
export default Admin;
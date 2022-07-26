import React,{useState} from 'react';
import AddModal from '../addModal';
import EditModal from '../editModal';
import {Accordion} from 'react-bootstrap';
import {userRemoveProduct } from '../../services/mazalStoreApi';
import { sortDown,sortUp} from '../../utils';
import Table from 'react-bootstrap/Table'
import PaginationComp from '../pagination';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';

function Overview({userData, userProducts,setUserProducts}){
    const [showAddModal,setShowAddModal] = useState(false);
    const [showEditModal,setShowEditModal] = useState(false);
    const [currentProductToEdit,setCurrentProductToEdit] = useState("");
    const [titleUp,setTitleUp] = useState(false);
    const [catagoryUp,setCatagoryUp] = useState(false);
    const [priceUp,setPriceUp] = useState(false);
    const [descriptionUp,setDescriptionUp] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastProduct = currentPage * postsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
    const currentProducts = userProducts.slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (number) =>{
        setCurrentPage(number);
    }
    const sortByElement = (productElemtent) =>{
        var tempProducts = userProducts;
        switch(productElemtent){
            case 'title':
                if(titleUp){
                    tempProducts.sort(function(a,b){
                        return sortUp(a,b,productElemtent);
                    });
                    setTitleUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return sortDown(a,b,productElemtent);
                    });
                    setTitleUp(true);  
                }
                break;
            case 'price':
                if(priceUp){
                    tempProducts.sort(function(a,b){
                        return (b.price-a.price)
                    });
                    setPriceUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return (a.price-b.price)
                    });
                    setPriceUp(true);  
                }
                break;
            case 'catagory':
                if(catagoryUp){
                    tempProducts.sort(function(a,b){
                        return sortUp(a,b,productElemtent);
                    });
                    setCatagoryUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return sortDown(a,b,productElemtent)
                    });
                    setCatagoryUp(true);  
                }
                break;
            case 'description':
                if(descriptionUp){
                    tempProducts.sort(function(a,b){
                        return sortUp(a,b,productElemtent);
                    });
                    setDescriptionUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return sortDown(a,b,productElemtent)
                    });
                    setDescriptionUp(true);  
                }
                break;
            default:
                break;
        }
        setUserProducts(tempProducts);
    }
    return(
        <div id={'my-account-overview-outer'}>
            <section className={'my-account-overview-info-container'}>
                <h2 className={'my-account-overview-section-title'}>PERSONAL INFO</h2>
                <div className={'my-account-overview-section-body'}>
                    <h5>First Name</h5>
                    <p>{userData.firstName}</p>
                    <h5>Last Name</h5>
                    <p>{userData.lastName}</p>
                    <h5>City</h5>
                    <p>{userData.city}</p>
                    <h5>Street</h5>
                    <p>{userData.street}</p>
                    <h5>Account Email</h5>
                    <p>{userData.email}</p>
                    <h5>Active Products Count</h5>
                    <p>{userProducts.length}</p>
                </div>
            </section>
            <section className={'my-account-overview-products-container'}>
                <h2 className={'my-account-overview-section-title'}>PRODUCTS</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr className={'my-account-overview-section-products-titles'}>
                            <th onClick={()=>{sortByElement('title')}}>Product Name {titleUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                            <th onClick={()=>{sortByElement('description')}}>Description {descriptionUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                            <th onClick={()=>{sortByElement('price')}}>Price {priceUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                            <th onClick={()=>{sortByElement('catagory')}}>Catagory {catagoryUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product)=>{
                            return(
                                <tr className={'my-account-overview-section-products-body'} key={product.title} >
                                    <td style={{overflow:'auto'}}>{product.title}</td>
                                    <td style={{overflow:'auto'}}>{product.description}</td>
                                    <td style={{overflow:'auto'}}>{product.price} $</td>
                                    <td style={{overflow:'auto'}}>{product.catagory}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </Table>
                    <div style={{background:'#555555',width:'100%'}}> <PaginationComp postsPerPage = {postsPerPage} totalPosts = {userProducts.length} paginate={paginate} currentPage={currentPage} className={'pagination'}/></div>
            </section>
            <section className={'my-account-overview-actions-container'}>
                <h2 className={'my-account-overview-section-title'}>ACTIONS</h2>
                <div className={'my-account-overview-section-body'}>
                    <div><button onClick={()=>{setShowAddModal(true)}}>Add Product</button></div>
                    <Accordion defaultActiveKey='0'>
                        <Accordion.Item className={'my-account-overview-section-button-container'} eventKey="1">
                            <Accordion.Header>Edit Product</Accordion.Header>
                            <Accordion.Body className={'my-account-overview-section-button-body'}>
                                <ul>
                                    {userProducts.map((product)=>{
                                        return(
                                            <li onClick={()=>{setShowEditModal(true);setCurrentProductToEdit(product)}}key={product.title}>{product.title}</li>
                                        )
                                    })}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className={'my-account-overview-section-button-container'} eventKey="2">
                            <Accordion.Header>Remove Product</Accordion.Header>
                            <Accordion.Body className={'my-account-overview-section-button-body'}>
                                <ul>
                                    {userProducts.map((product)=>{
                                        return(
                                            <li onClick={()=>{userRemoveProduct(product.title,userData,setUserProducts)}} key={product.title}>{product.title}</li>
                                        )
                                    })}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>
            <EditModal show ={showEditModal} setShow={setShowEditModal} updateProducts={setUserProducts} productToEdit={currentProductToEdit} email={userData.email}/>
            <AddModal show ={showAddModal} setShow={setShowAddModal} updateProducts={setUserProducts} email={userData.email}/>
        </div>
    )
}
export default Overview;
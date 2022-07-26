import {Modal,Button} from 'react-bootstrap'; 
import logo from '../assets/images/logo.jpg';
import './popUpWindow.css';
import React,{useState} from 'react';
import {addNewProduct} from '../services/mazalStoreApi';

function AddModal({email, show, setShow, updateProducts}){
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [catagory,setCatagory] = useState('');
    const [image,setImage] = useState('');

    const updateInputs =(e) =>{
        let value = e.target.value;
        let name = e.target.name;
        switch(name){
            case 'title':
                setTitle(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'image':
                setImage(value);
                break;
            default:
                    break;
        }
    }
    const addProduct = () =>{
        let uploaderEmail = 'admin';
        if(email!== undefined){
            uploaderEmail = email;
        }
        const newProduct = {
            title,
            price,
            description,
            catagory,
            image,
            uploader:uploaderEmail
        }
        console.log(catagory)
        if(title!==''&& price!==''&& description!==''&& catagory!==''&& image!==''){
          addNewProduct(newProduct,setShow,email,updateProducts);
        }   
    }
    return(
    <Modal show={show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt='logo'/>
            <h1>Add Product</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='Title' name = {'title'} onChange={updateInputs} maxlength="15"/>
            <input placeholder='Price' name = {'price'} onChange={updateInputs} type={'Number'}/>
            <input placeholder='Description' name = {'description'} onChange={updateInputs} maxlength="50"/>
            <select name="Catagory" onChange={(e)=>{setCatagory(e.target.value)}}>
                <option value="" disabled selected>Select your option</option>
                <option value="Cars" >Cars</option>
                <option value="Computer Parts" >Computer Parts</option>
                <option value="Furniture" >Furniture</option>
                <option value="Tech" >Tech</option>
                <option value="Miscellaneous" >Miscellaneous</option>
            </select>
            <input placeholder='Image' name = {'image'} onChange={updateInputs}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button letiant="success" onClick={addProduct}>Add</Button>
          <Button letiant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
        );
}
export default AddModal;
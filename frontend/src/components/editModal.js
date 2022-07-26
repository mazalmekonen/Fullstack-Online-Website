import {Modal,Button} from 'react-bootstrap'; 
import logo from '../assets/images/logo.jpg';
import './popUpWindow.css';
import React,{useState,useEffect} from 'react';
import {saveProductAndUpdate} from '../services/mazalStoreApi';
function EditModal({show,productToEdit,email,setShow,updateProducts,}){
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [catagory,setCatagory] = useState('');
    const [image,setImage] = useState('');
    useEffect(()=>{
        if(show){
            if(productToEdit.catagory !== undefined){
                setCatagory(productToEdit.catagory);
            }else{
                setCatagory("admin catagory");
            }
            setDescription(productToEdit.description);
            setImage(productToEdit.image);
            setTitle(productToEdit.title);
            setPrice(productToEdit.price);
        }
    },[show])
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
            case 'catagory':
                setCatagory(value);
                break;
            case 'image':
                setImage(value);
                break;
            default:
                break;
        }
    }

    const saveProduct = () =>{
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
            uploader:uploaderEmail,
            titleToEdit:productToEdit.title
        }
        if(title!==''&& price!==''&& description!==''&& catagory!==''&& image!==''){
            saveProductAndUpdate(newProduct,setShow,email,updateProducts);
        }   
    }
    return(
    <Modal show={show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt='logo'/>
            <h1>Edit Product</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='Title' name = {'title'} onChange={updateInputs} value={title} maxlength="15"/>
            <input placeholder='Price' name = {'price'} onChange={updateInputs} value={price} type={'Number'}/>
            <input placeholder='Description' name = {'description'} onChange={updateInputs} value={description} maxlength="50"/>
            <select name="Catagory" onChange={(e)=>{setCatagory(e.target.value)}}>
                <option value="" disabled selected>Select your option</option>
                <option value="Cars" >Cars</option>
                <option value="Computer Parts" >Computer Parts</option>
                <option value="Furniture" >Furniture</option>
                <option value="Tech" >Tech</option>
                <option value="Miscellaneous" >Miscellaneous</option>
            </select>
            <input placeholder='Image' name = {'image'} onChange={updateInputs} value={image}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button letiant="success" onClick={saveProduct}>Save</Button>
          <Button letiant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
        );
}
export default EditModal;
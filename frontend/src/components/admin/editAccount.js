import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import '../popUpWindow.css';
import React,{useState,useEffect} from 'react';
import {adminUpdateAccountAndReload} from "../../services/mazalStoreApi"

function EditAccount({show,accountToEdit,setShow,updateAccounts}){
    const [email,setEmail] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [city,setCity] = useState('');
    const [street,setStreet] = useState('');


    useEffect(()=>{
        if(show){
            setEmail(accountToEdit.email);
            setFirstName(accountToEdit.firstName);
            setLastName(accountToEdit.lastName);
            setCity(accountToEdit.city);
            setStreet(accountToEdit.street);
        }
    },[show])
    
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'email':
                setEmail(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'street':
                setStreet(value);
                break;
            default:
                break;
        }
    }

    const saveAccount = () =>{
        const newAccount = {
            email,
            firstName,
            lastName,
            city,
            street,
            emailToEdit: accountToEdit.email
        }
        if(email!==''&& firstName!=='' && lastName!=='' && city!=='' && street!==''){
            adminUpdateAccountAndReload(newAccount,setShow,updateAccounts);
        }   
    }
    return(
    <Modal show={show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt='logo'/>
            <h1>Edit Account</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='email' name = {'email'} onChange={updateInputs} value={email}/>
            <input placeholder='firstName' name = {'firstName'} onChange={updateInputs} value={firstName}/>
            <input placeholder='lastName' name = {'lastName'} onChange={updateInputs} value={lastName}/>
            <input placeholder='city' name = {'city'} onChange={updateInputs} value={city}/>
            <input placeholder='street' name = {'street'} onChange={updateInputs} value={street}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccount;
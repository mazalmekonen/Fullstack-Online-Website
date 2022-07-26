import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import '../popUpWindow.css';
import React,{useState} from 'react';
import {userEditFirstName} from "../../services/mazalStoreApi";

function EditAccountFirstName({accountToEdit,setShow,show}){
    const [firstName,setFirstName] = useState(accountToEdit.firstName);
    
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'firstName':
                setFirstName(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            firstName,
            email: accountToEdit.email
        }
        if(firstName!==''){
            userEditFirstName(setShow,user);
        }   
    }
    return(
    <Modal show={show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt={'logo'}/>
            <h1>Edit {accountToEdit.email}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='firstName' name = {'firstName'} onChange={updateInputs} value={firstName} maxLength={'20'}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccountFirstName;
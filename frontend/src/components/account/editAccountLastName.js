import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import '../popUpWindow.css';
import React,{useState} from 'react';
import {userEditLastName} from "../../services/mazalStoreApi";

function EditAccountLastName({accountToEdit,setShow,show}){
    const [lastName,setLastName] = useState(accountToEdit.lastName);
    
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'lastName':
                setLastName(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            lastName,
            email: accountToEdit.email
        }
        if(lastName!==''){
            userEditLastName(setShow,user);
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
            <input placeholder='lastName' name = {'lastName'} onChange={updateInputs} value={lastName} maxLength={'20'}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccountLastName;
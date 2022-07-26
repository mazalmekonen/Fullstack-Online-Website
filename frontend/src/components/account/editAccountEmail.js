import { Modal,Button } from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import '../popUpWindow.css';
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {userEditEmail} from "../../services/mazalStoreApi";


function EditAccountEmail({accountToEdit,setShow,show}){
    const [email,setEmail] = useState(accountToEdit.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'email':
                setEmail(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            email,
            emailToEdit: accountToEdit.email
        }
        if(email!==''){
          userEditEmail(setShow,user,dispatch,navigate);
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
            <input placeholder='email' name = {'email'} onChange={updateInputs} value={email} maxLength={'20'}/>
            <p>You'll be logged out after</p>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccountEmail;
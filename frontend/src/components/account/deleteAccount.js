import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import '../popUpWindow.css';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userDeleteAccount} from "../../services/mazalStoreApi";





function DeleteAccount({show,setShow,accountToEdit}){
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'password':
                setPassword(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            password,
            email: accountToEdit.email
        }
        if(password!==''){
          userDeleteAccount(setShow,user,dispatch,navigate);
        }   
    }
    return(
    <Modal show={show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt={'logo'}/>
            <h1>Delete {accountToEdit.email}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='password' name = {'password'} onChange={updateInputs} value={password} maxLength={'12'} type={'password'}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default DeleteAccount;
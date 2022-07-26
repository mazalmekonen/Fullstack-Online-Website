import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import '../popUpWindow.css';
import React,{useState} from 'react';
import {userEditCity, userEditFirstName} from "../../services/mazalStoreApi";

function EditAccountCity({accountToEdit,setShow,show}){
    const [city,setCity] = useState(accountToEdit.city);
    
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'city':
                setCity(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            city,
            email: accountToEdit.email
        }
        if(city!==''){
            userEditCity(setShow,user);
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
            <input placeholder='city' name = {'city'} onChange={updateInputs} value={city} maxLength={'20'}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccountCity;
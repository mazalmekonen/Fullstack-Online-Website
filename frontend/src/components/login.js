import {Modal,Button} from 'react-bootstrap';
import logo from '../assets/images/logo.jpg';
import React,{useState} from 'react';
import './popUpWindow.css';
import { ToastAlert } from '../utils';
import {loginIntoAccount} from "../services/mazalStoreApi";

function Login({show,onHide}){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [currentAlert,setCurrentAlert] = useState('');
  const [currentHeader,setCurrentHeader] = useState('');
  const [showAlert,setShowAlert] = useState(false);

  const login = (e) =>{
    const user = {
      email:email,
      password:password
    }
    if((e.key === 'Enter' || e.key === undefined )&& password !== '' && email !== ''){
      loginIntoAccount(user,setCurrentAlert,setCurrentHeader,setShowAlert,email);
    }
  }
  const updateInputs =(e) =>{
    let value = e.target.value;
    let name = e.target.name;
    switch (name){
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
          break;
    }
  }
    return(
      <Modal show = {show} size="md" centered  className='pop-screen-container'>
      <Modal.Header>
        <Modal.Title className='pop-screen-header'>
          <img src={logo} alt='logo'/>
          <h1>Account Login</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='pop-screen-body'>
          <input placeholder='Email' type={'email'} value={email} name = {'email'} onChange={updateInputs} onKeyUp={login}/>
          <input placeholder='Password' type={'password'} value={password} name = {'password'} onChange={updateInputs} onKeyUp={login}/>
        </form>
      </Modal.Body>
      <Modal.Footer className='pop-screen-footer'>
        <Button variant="success" onClick={login} disabled={email === '' || password ===''}>Login</Button>
        <Button variant="danger" onClick={onHide}>Close</Button>
      </Modal.Footer>
      <ToastAlert alert = {currentAlert} show={showAlert} setShow = {setShowAlert} header={currentHeader}/>
    </Modal>
    );
}
export default Login;
import { useState } from 'react';
import {Modal,Button} from 'react-bootstrap';
import logo from '../../assets/images/logo.jpg';
import { ToastAlert } from '../../utils';
import {NavLink} from 'react-router-dom';


function AdminLogin () {
    const [showModal,setShowModal] = useState(true);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [currentAlert,setCurrentAlert] = useState('');
    const [currentHeader,setCurrentHeader] = useState('');
    const [showAlert,setShowAlert] = useState(false);
    const updateInputs =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        switch(name){
            case 'username':
                setUsername(value);
                break;
            case  'password':
                setPassword(value);
                break;
            default:
                  break;
        }


    }
    const adminLogin =(e) =>{
        if(username !== '' && password !== ''){
            if(e.key === 'Enter' || e.key === undefined){
                if(username === 'mazal@gmail.com' && password === '123456'){
                    setCurrentHeader('Success');
                    setCurrentAlert('Admin login successful!');
                    setShowAlert(true);
                    setTimeout(()=>{
                      setShowModal(false);
                    },1500);
                }else{
                  setCurrentHeader('Fail');
                  setCurrentAlert('Admin login failed!');
                  setShowAlert(true);
                }
            }
        }
    }
    return(
        <Modal show={showModal} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt='logo'/>
            <h1>Admin Login</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
          <input placeholder='Email' value={username} name = {'username'} onChange={updateInputs} onKeyUp={adminLogin}/>
          <input placeholder='Password' type={'password'} value={password} name = {'password'} onChange={updateInputs} onKeyUp={adminLogin}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={adminLogin} disabled={username === '' || password === ''}>Login</Button>
          <NavLink to={'/'} id={'admin-cancel'}>Cancel</NavLink>
        </Modal.Footer>
        <ToastAlert alert = {currentAlert} show={showAlert} setShow = {setShowAlert} header={currentHeader}/>
      </Modal>
        );
}
export default AdminLogin;
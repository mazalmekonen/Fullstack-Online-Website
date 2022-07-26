import DeleteAccount from "./deleteAccount";
import EditAccountEmail from "./editAccountEmail";
import EditAccountPassword from "./editAccountPassword";
import React,{useState} from 'react';
import EditAccountFirstName from "./editAccountFirstName";
import EditAccountLastName from "./editAccountLastName";
import EditAccountCity from "./editAccountCity";
import EditAccountStreet from "./editAccountStreet";

function Security({userData, setAccount}){
    const [showEditEmail,setShowEditEmail] = useState(false);
    const [showDeleteAccount,setShowDeleteAccount] = useState(false);
    const [showEditPassword,setShowEditPassword] = useState(false);
    const [showEditFullName,setShowEditFullName] = useState(false);
    const [showEditFirstName,setShowEditFirstName] = useState(false);
    const [showEditLastName,setShowEditLastName] = useState(false);
    const [showEditCity,setShowEditCity] = useState(false);
    const [showEditStreet,setShowEditStreet] = useState(false);




    return(
        <div id={'my-account-security-outer'}>
            <section className={'my-account-security-info-container'}>
                <h2 className={'my-account-security-section-title'}>CREDENTIALS</h2>
                <div className={'my-account-security-section-body'}>
                    <h5>First Name</h5>
                    <div>
                        <p className={'my-account-security-section-body-p'}>{userData.firstName}</p>
                        <p className={'my-account-security-section-body-edit'} onClick={()=>{setShowEditFirstName(true)}}>Edit</p>
                    </div>
                    <h5>Last Name</h5>
                    <div>
                        <p className={'my-account-security-section-body-p'}>{userData.lastName}</p>
                        <p className={'my-account-security-section-body-edit'} onClick={()=>{setShowEditLastName(true)}}>Edit</p>
                    </div>
                    <h5>City</h5>
                    <div>
                        <p className={'my-account-security-section-body-p'}>{userData.city}</p>
                        <p className={'my-account-security-section-body-edit'} onClick={()=>{setShowEditCity(true)}}>Edit</p>
                    </div>
                    <h5>Street</h5>
                    <div>
                        <p className={'my-account-security-section-body-p'}>{userData.street}</p>
                        <p className={'my-account-security-section-body-edit'} onClick={()=>{setShowEditStreet(true)}}>Edit</p>
                    </div>
                    <h5>Account Email</h5>
                    <div>
                        <p className={'my-account-security-section-body-p'}>{userData.email}</p>
                        <p className={'my-account-security-section-body-edit'}onClick={()=>{setShowEditEmail(true)}}>Edit</p>
                    </div>
                    <div>
                        <h5>Change Password</h5>
                        <p className={'my-account-security-section-body-edit'}onClick={()=>{setShowEditPassword(true)}}>Edit</p>
                    </div>
                </div>
            </section>
            <section className={'my-account-security-danger-container'}>
                <h2 className={'my-account-security-section-title'}>Danger</h2>
                <div className={'my-account-security-section-body'}>
                    <div>
                        <h5>Delete Account</h5>
                        <p className={'my-account-security-section-body-delete'} onClick={()=>{setShowDeleteAccount(true)}}>Delete</p>
                    </div>
                </div>
            </section>
            <EditAccountFirstName show ={showEditFirstName} setShow={setShowEditFirstName} accountToEdit={userData}/>
            <EditAccountLastName show ={showEditLastName} setShow={setShowEditLastName} accountToEdit={userData}/>
            <EditAccountCity show ={showEditCity} setShow={setShowEditCity} accountToEdit={userData}/>
            <EditAccountStreet show ={showEditStreet} setShow={setShowEditStreet} accountToEdit={userData}/>
            <EditAccountPassword show ={showEditPassword} setShow={setShowEditPassword} accountToEdit={userData}/>
            <EditAccountEmail show ={showEditEmail} setShow={setShowEditEmail} accountToEdit={userData}/>
            <DeleteAccount show ={showDeleteAccount} setShow={setShowDeleteAccount} accountToEdit={userData}/>
        </div>
    )
}
export default Security;
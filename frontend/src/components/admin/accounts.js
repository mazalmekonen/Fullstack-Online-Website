import {Button, ButtonGroup, Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import EditAccount from './editAccount';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';
import {sortDown,sortUp} from '../../utils';
import {adminRemoveAccount, getAllAccounts} from '../../services/mazalStoreApi';
import PaginationComp from '../pagination';


function Accounts(){
    const [accounts,setAccounts] = useState([]);
    const [showEditModal,setShowEditModal] = useState(false);
    const [emailUp,setEmailUp] = useState(false);
    const [firstNameUp,setFirstNameUp] = useState(false);
    const [lastNameUp,setLastNameUp] = useState(false);
    const [cityUp,setCityUp] = useState(false);
    const [streetUp,setStreetUp] = useState(false);
    const [accountToEdit,setAccountToEdit] = useState();
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    var counter = 1;
    useEffect(()=>{
        getAllAccounts(setAccounts);
    },[]);
    
    const sortByElemnt = (accountElement) =>{
        var tempAccounts = accounts;
        switch(accountElement){
            case 'email':
                if(emailUp){
                    tempAccounts.sort(function(a,b){
                        return sortUp(a,b,accountElement);
                    });
                    setEmailUp(false);
                }else{
                    tempAccounts.sort(function(a,b){
                        return sortDown(a,b,accountElement);
                    });
                    setEmailUp(true);  
                }
                break;
            case 'firstName':
                if(firstNameUp){
                    tempAccounts.sort(function(a,b){
                        return sortUp(a,b,accountElement);
                    });
                    setFirstNameUp(false);
                }else{
                    tempAccounts.sort(function(a,b){
                        return sortDown(a,b,accountElement);
                    });
                    setFirstNameUp(true);  
                }
                break;
            case 'lastName':
                if(lastNameUp){
                    tempAccounts.sort(function(a,b){
                        return sortUp(a,b,accountElement);
                    });
                    setLastNameUp(false);
                }else{
                    tempAccounts.sort(function(a,b){
                        return sortDown(a,b,accountElement);
                    });
                    setLastNameUp(true);  
                }
                break;
            case 'city':
                if(cityUp){
                    tempAccounts.sort(function(a,b){
                        return sortUp(a,b,accountElement);
                    });
                    setCityUp(false);
                }else{
                    tempAccounts.sort(function(a,b){
                        return sortDown(a,b,accountElement);
                    });
                    setCityUp(true);  
                }
                break;
            case 'street':
                if(streetUp){
                    tempAccounts.sort(function(a,b){
                        return sortUp(a,b,accountElement);
                    });
                    setStreetUp(false);
                }else{
                    tempAccounts.sort(function(a,b){
                        return sortDown(a,b,accountElement);
                    });
                    setStreetUp(true);  
                }
                break;
            default:
                break;
        }
        setAccounts(tempAccounts);
    }
    const indexOfLastAccount = currentPage * postsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - postsPerPage;
    const currentAccounts = accounts.slice(indexOfFirstAccount,indexOfLastAccount);
    const paginate = (number) =>{
        setCurrentPage(number);
    }
return(
    <div className={'admin-accounts-container'}>
        <Table variant={"dark"} striped hover id='products-table'>
            <thead>
                <tr>
                <th>#</th>
                <th onClick={()=>{sortByElemnt('firstName')}}>First Name {firstNameUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElemnt('lastName')}}>Last Name {lastNameUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElemnt('city')}}>City {cityUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElemnt('street')}}>Street {streetUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElemnt('email')}}>Email {emailUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th >Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentAccounts.map((account)=>{
                    return(   
                    account.role=="admin"?"":
                    <tr key={account.email}>
                        <td>{counter++}</td>
                        <td>{account.firstName}</td>
                        <td>{account.lastName}</td>
                        <td>{account.city}</td>
                        <td>{account.street}</td>
                        <td>{account.email}</td>
                        <td><ButtonGroup className="d-grid gap-2">
                                <Button variant="warning" onClick={()=>{setShowEditModal(true); setAccountToEdit(account)}}>Edit</Button>
                                <Button variant="danger" onClick={()=>{adminRemoveAccount(account.email,setAccounts)}}>Remove</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
        <div style={{background:'#555555',width:'100%',borderBottomRightRadius:'50px',borderBottomLeftRadius:'50px'}}> <PaginationComp postsPerPage = {postsPerPage} totalPosts = {accounts.length} paginate={paginate} currentPage={currentPage} className={'pagination'}/></div>
        <EditAccount show ={showEditModal} setShow={setShowEditModal} updateAccounts={setAccounts} accountToEdit={accountToEdit}/>
    </div>
)
}
export default Accounts;
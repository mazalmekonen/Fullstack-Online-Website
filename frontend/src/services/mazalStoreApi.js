import axios from "axios";
import { isLoggedIn, isLoggedOut, removeAll } from '../store/actions';


export function imageExists(image_url){

    let http = new XMLHttpRequest();
        http.open('GET', image_url, true);
        http.send();
        return http.status!== 404;
}
export const getUserData = (email,setState) =>{
    axios.post("http://localhost:8080/user/getData",{email})
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}
export const getUserTransactions = (email,setState) =>{
    axios.post("http://localhost:8080/transactions/getAllByEmail",{email})
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}
export const getUserProducts = (email,setState) =>{
    axios.post("http://localhost:8080/product/getUserProducts",{email})
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}
export const getTopFiveSells = (setState) =>{
    axios.get('http://localhost:8080/transactions/topSells')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getUniqueSells = (setState) =>{
    axios.get('http://localhost:8080/transactions/uniqueSells')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getRecentSells = (setState) =>{
    axios.get('http://localhost:8080/transactions/recentSells')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getAllAccounts = (setState) =>{
    axios.get('http://localhost:8080/user/getAll')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getAllProducts =(setState) =>{
    axios.get('http://localhost:8080/product/getAll')
    .then(res=>{
        setState(data=>{
            return (res.data)
        });
    }).catch(err=>{
        console.log(err);
    })
}

export const userAuthenticated = (setUserData,dispatch) =>{
    let userEmail = localStorage.getItem('userEmail');
    axios.get("http://localhost:8080/user/userAuth",{
        headers:{
            "x-access-token":localStorage.getItem("token")
        }}).then(res=>{
            dispatch(isLoggedIn());
            getUserData(userEmail,setUserData);
        }).catch(err=>{
            dispatch(isLoggedOut());
        })
}

export const payCart = (loggedIn, cartList, totalCost, userData, setCurrentAlert,setCurrentHeader,setShowAlert,dispatch) =>{
    if(loggedIn){
        let newTransaction = {
            items:cartList,
            price:totalCost,
            city:userData.city,
            street:userData.street,
            buyer:userData.email
            
        }
        axios.post('http://localhost:8080/transactions/addNew',newTransaction)
            .then(res=>{
                setCurrentHeader('Transction success');
                setCurrentAlert('Transaction succeeded!, Thanks for buying ;)');
                setShowAlert(true);
                dispatch(removeAll());
            }).catch(err=>{
                console.log(err);
            })
    }else{
        setCurrentHeader('Transaction failed');
        setCurrentAlert('Not logged in!');
        setShowAlert(true);
    }
}
export const createNewAccount = (setCurrentAlert,setCurrentHeader,setShowAlert,setEmail,newUser) =>{
    axios.post(`http://localhost:8080/user/addNew`, { newUser })
          .then(res => {
            setCurrentHeader('Success');
            setCurrentAlert('User created!');
            setShowAlert(true);
            setTimeout(()=>{
              window.location.href='http://localhost:3000'
            },1500)
          }).catch(err=>{
            setCurrentHeader('Fail');
            setCurrentAlert('Email exists already');
            setShowAlert(true);
            setEmail('');
          })
}
export const loginIntoAccount = (user,setCurrentAlert,setCurrentHeader,setShowAlert,email) =>{
    axios.post(`http://localhost:8080/user/login`, { user })
      .then(res => {
        setCurrentAlert('user logged In!');
        setCurrentHeader('Success');
        setShowAlert(true);
        setTimeout(()=>{
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userEmail", email);
          window.location.href='http://localhost:3000';
        },1500)
      }).catch(err=>{
        setCurrentAlert('Login failed');
        setCurrentHeader('Fail');
        setShowAlert(true);
      })
} 
export const saveProductAndUpdate = (newProduct,setShow,email,updateProducts) =>{
    axios.post('http://localhost:8080/product/edit',{newProduct})
            .then(res=>{
                setShow(false);
                if(email!== undefined){
                    getUserProducts(email,updateProducts);
                }else{
                    axios.get('http://localhost:8080/product/getAll').then(res=>{
                        updateProducts(res.data);
                    });
                }
            }).catch(err=>{
                console.log(err);
            })
}
export const addNewProduct = (newProduct,setShow,email,updateProducts) =>{
    axios.post('http://localhost:8080/product/addNew',{newProduct})
            .then(res=>{
                setShow(false);
                if(email!== undefined){
                    getUserProducts(email,updateProducts);
                }else{
                    axios.get('http://localhost:8080/product/getAll').then(res=>{
                        updateProducts(res.data);
                    });
                }
            }).catch(err=>{
                console.log(err);
            })
}
export const addNewTransaction = (newTransaction,setCurrentAlert,setCurrentHeader,setShowAlert) =>{
    axios.post('http://localhost:8080/transactions/addNew',newTransaction)
              .then(res=>{
                  setCurrentHeader('Transaction success');
                  setCurrentAlert('Transaction succeeded!, Thanks for buying ;)');
                  setShowAlert(true);
              }).catch(err=>{
                  console.log(err);
    })
}
export const adminRemoveProduct = (titleToRemove,setProducts) =>{
    axios.post('http://localhost:8080/product/delete',{titleToRemove})
    .then(res=>{
        getAllProducts(setProducts);
    }).catch(err=>{
        console.log(err);
    })
}
export const userRemoveProduct = (titleToRemove,userData,setUserProducts)=>{
    axios.post('http://localhost:8080/product/delete',{titleToRemove:titleToRemove})
        .then(res=>{
            getUserProducts(userData.email,setUserProducts);
        }).catch(err=>{
            console.log(err);
        })
}
export const adminRemoveAccount = (emailToRemove,setAccounts) =>{
    const user = {
        email : emailToRemove
    }
    axios.post('http://localhost:8080/user/admin/delete',{user})
    .then(res=>{
        getAllAccounts(setAccounts);
    }).catch(err=>{
        console.log(err);
    })
}
export const adminUpdateAccountAndReload = (newAccount,setShow,updateAccounts) =>{
    axios.post('http://localhost:8080/user/edit',{newAccount})
            .then(res=>{
                setShow(false);
                axios.get('http://localhost:8080/user/getAll').then(res=>{
                    updateAccounts(res.data);
                })
            }).catch(err=>{
                console.log(err);
            })
}
export const userEditPassword = (setShow,user) =>{
    axios.post('http://localhost:8080/user/editPassword',{user})
    .then(res=>{
        setShow(false);
    }).catch(err=>{
        alert('Old password is not Correct');
    })
}
export const userEditFirstName = (setShow,user) =>{
    axios.post('http://localhost:8080/user/editFirstName',{user})
    .then(res=>{
        setShow(false);
        window.location.href="http://localhost:3000";
    }).catch(err=>{
        console.log(err);
    })
}
export const userEditLastName = (setShow,user) =>{
    axios.post('http://localhost:8080/user/editLastName',{user})
    .then(res=>{
        setShow(false);
        window.location.href="http://localhost:3000";
    }).catch(err=>{
        console.log(err);
    })
}
export const userEditCity = (setShow,user) =>{
    axios.post('http://localhost:8080/user/editCity',{user})
    .then(res=>{
        setShow(false);
        window.location.href="http://localhost:3000";
    }).catch(err=>{
        console.log(err);
    })
}
export const userEditStreet = (setShow,user) =>{
    axios.post('http://localhost:8080/user/editStreet',{user})
    .then(res=>{
        setShow(false);
        window.location.href="http://localhost:3000";
    }).catch(err=>{
        console.log(err);
    })
}
export const userEditEmail = (setShow,user,dispatch,navigate) =>{
    axios.post('http://localhost:8080/user/editEmail',{user})
    .then(res=>{
        setShow(false);
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
        dispatch(isLoggedOut());
        navigate('/',{replace: true});
    }).catch(err=>{
        console.log(err);
    })
}
export const userDeleteAccount = (setShow,user,dispatch,navigate) =>{
    axios.post('http://localhost:8080/user/delete',{user})
    .then(res=>{
        setShow(false);
        dispatch(isLoggedOut());
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate('/',{replace: true});
    }).catch(err=>{
        alert('Old password is not Correct');
    })
}
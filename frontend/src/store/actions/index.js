export const isLoggedIn = () =>{
    return {
        type:'LOGIN'
    }
} 
export const isLoggedOut = () =>{
    return {
        type:'LOGOUT'
    }
} 
export const updateProducts = (newProducts)=>{
    return {
        type:'setState',
        payload: newProducts
    }
}
export const appendToCart = (newProduct) =>{
    return {
        type:'appendCart',
        payload: newProduct
    }
}
export const removeOneProduct = (productToRemove) =>{
    return {
        type:'removeOneProduct',
        payload: productToRemove
    }
}
export const removeAll = ()=>{
    return {
        type:'removeAll',
    }
}
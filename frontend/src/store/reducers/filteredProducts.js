const filteredProductsReducer = (state = [{}], action)=>{
    switch(action.type){
        case 'setState':
            state = action.payload;
            return state;
        default:
            return  state;
    }
}
export default filteredProductsReducer;
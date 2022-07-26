const cartReducer = (state = [], action)=>{
    switch(action.type){
        case 'appendCart':
            state = [...state,action.payload];
            return state;
        case 'removeOneProduct':
                var count=0;
                var tempArr = state.filter((product)=>{
                    if(product.title===action.payload){
                        count++;
                    }
                    if(count===1 && product.title===action.payload){
                        return false;
                    }
                    return true;
                })
                state = tempArr;
                return state;
        case 'removeAll':
                state = [];
                return state;
        default:
            return  state;
    }
}
export default cartReducer;
import loggedReducer from './isLogged';
import FilteredProducts from './filteredProducts';
import cart from './cart';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged:loggedReducer,
    filteredProducts:FilteredProducts,
    cart:cart
})
export default allReducers;
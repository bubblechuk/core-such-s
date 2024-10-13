import { combineReducers } from 'redux';
import { catalogReducer, cartReducer, sortedReducer} from './listsSlice';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  cart: cartReducer,
  sorted: sortedReducer
});

export default rootReducer;

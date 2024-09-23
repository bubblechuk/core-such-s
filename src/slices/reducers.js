// reducers.js
import { combineReducers } from 'redux';
import { listsReducer, productsReducer } from './listsSlice'; // Import productsReducer

const rootReducer = combineReducers({
  lists: listsReducer,
  products: productsReducer, // Include the productsReducer here
  // Other reducers go here if you have them
});

export default rootReducer;

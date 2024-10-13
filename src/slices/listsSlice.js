import { createSlice } from '@reduxjs/toolkit';
var json = require('../catalog/list.json');
let sortName = true;
let sortOrder = true;
let sortArtist = true;
let sortGenre = true;
let sortYear = true;
const initialState = {
  catalog: json,
  sorted: [],
  cart: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // addList: (state, action) => {
    //   state.lists.push(action.payload);
    // },
    // removeList: (state, action) => {
    //   state.lists = state.lists.filter((list) => list.id !== action.payload);
    // },
    // cartList: (state, action) => {
    //   state.lists.forEach((list) => {
    //     if (list.id === action.payload) {
    //       list.cart = !list.cart;
    //     }
    //   });
    // },
    // buyerList: (state, action) => {
    //   state.lists.forEach((list) => {
    //     if (list.id === action.payload[0]) {
    //       list.buyer = action.payload[1];
    //     }
    //   });
    // },
  },
});
const sortedSlice = createSlice({
  name: 'sorted',
  initialState,
  reducers: {
      setSorted: (state, action) => {
        state.sorted = action.payload;
      },
      sortList: (state, action) => {
      if (sortOrder === true) {
        state.sorted.sort(
          (a, b) =>
            a.price - b.price
        );
        sortOrder = false;
      } else {
        state.sorted.sort(
          (a, b) =>
            b.price - a.price
        );
        sortOrder = true;
      }
    },
    sortListByName: (state, action) => {
      if (sortName === true) {
        state.sorted.sort((a, b) => {
          const nameA = a.title.toLowerCase();
          const nameB = b.title.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        sortName=false;
      } else {
        state.sorted.sort((a, b) => {
          const nameA = a.title.toLowerCase();
          const nameB = b.title.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        sortName=true;
      }
    },
    sortByArtist: (state) => {
      if (sortArtist === true) {
        state.sorted.sort((a, b) => {
          const nameA = a.title.toLowerCase();
          const nameB = b.title.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        sortArtist=false;
      } else {
        state.sorted.sort((a, b) => {
          const nameA = a.artist.toLowerCase();
          const nameB = b.artist.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        sortArtist=true;
      }
    },
    sortByGenre: (state, action) => {
      if (sortGenre === true) {
        state.sorted.sort((a, b) => {
          const nameA = a.genre.toLowerCase();
          const nameB = b.genre.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        sortGenre=false;
      } else {
        state.sorted.sort((a, b) => {
          const nameA = a.genre.toLowerCase();
          const nameB = b.genre.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        sortGenre=true;
      }
    },
    sortByYear: (state) => {
      if (sortYear === true) {
        state.sorted.sort(
          (a, b) =>
            a.year - b.year
        );
        sortYear = false;
      } else {
        state.sorted.sort(
          (a, b) =>
            b.year - a.year
        );
        sortYear = true;
      }
    }
  }
});
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  //   addProduct: (state, action) => {
  //     state.products = [...state.products, action.payload];
  //   },
  //   removeProduct: (state, action) => {
  //     state.products = state.products.filter((product) => product.id !== action.payload);
  //   },


  //   sortListByQuantity: (state, action) => {
  //     if (sortQuantity === true) {
  //           state.products.sort((a, b) => a.amount - b.amount);
  //           sortQuantity=false;
  //         } else {
  //           state.products.sort((a, b) => b.amount - a.amount);
  //           sortQuantity=true;
  //         }
  //   },
  //   sortListByDiscount: (state, action) => {
  //     if (sortDiscount === true) {
  //           state.products.sort((a, b) => a.dsc - b.dsc);
  //           sortDiscount=false;
  //         } else {
  //           state.products.sort((a, b) => b.dsc - a.dsc);
  //           sortDiscount=true;
  //         }
  //   },
  //   Discount1: (state, action) => {
  //     state.products.sort((a, b) => {
  //   if (a.new === "true" && b.new === "true") {
  //     return 0;
  //   }
  //   if (a.new === "true" && b.new === "false") return -1;
  //   if (a.new === "false" && b.new === "true") return 1;
  // });
  //   }
  },
});

export const {  } = catalogSlice.actions;
export const {  } = cartSlice.actions;
export const { setSorted, sortListByName, sortList, sortByArtist, sortByGenre, sortByYear } = sortedSlice.actions;

export const catalogReducer = catalogSlice.reducer; 
export const cartReducer = cartSlice.reducer; 
export const sortedReducer = sortedSlice.reducer;

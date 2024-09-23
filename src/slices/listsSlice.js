import { createSlice } from '@reduxjs/toolkit';
let sortName = true;
let sortOrder = true;
let sortQuantity = true;
let sortDiscount = true;
const initialState = {
  lists: [],
  products: [],
  sum: 0, 
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    cartList: (state, action) => {
      state.lists.forEach((list) => {
        if (list.id === action.payload) {
          list.cart = !list.cart;
        }
      });
    },
    buyerList: (state, action) => {
      state.lists.forEach((list) => {
        if (list.id === action.payload[0]) {
          list.buyer = action.payload[1];
        }
      });
    },
  },
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    sortListByName: (state, action) => {
      if (sortName === true) {
        state.products.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        sortName=false;
      } else {
        state.products.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        sortName=true;
      }
    },
    sortList: (state, action) => {
      if (sortOrder === true) {
        state.products.sort(
          (a, b) =>
            a.price -
            (a.price / 100) * a.dsc -
            (b.price - (b.price / 100) * b.dsc)
        );
        sortOrder = false;
      } else {
        state.products.sort(
          (a, b) =>
            b.price -
            (b.price / 100) * b.dsc -
            (a.price - (a.price / 100) * a.dsc)
        );
        sortOrder = true;
      }
    },
    sortListByQuantity: (state, action) => {
      if (sortQuantity === true) {
            state.products.sort((a, b) => a.amount - b.amount);
            sortQuantity=false;
          } else {
            state.products.sort((a, b) => b.amount - a.amount);
            sortQuantity=true;
          }
    },
    sortListByDiscount: (state, action) => {
      if (sortDiscount === true) {
            state.products.sort((a, b) => a.dsc - b.dsc);
            sortDiscount=false;
          } else {
            state.products.sort((a, b) => b.dsc - a.dsc);
            sortDiscount=true;
          }
    },
    Discount1: (state, action) => {
      state.products.sort((a, b) => {
    if (a.new === "true" && b.new === "true") {
      return 0;
    }
    if (a.new === "true" && b.new === "false") return -1;
    if (a.new === "false" && b.new === "true") return 1;
  });
    }
  },
});

export const { addList, removeList, cartList, buyerList } = listsSlice.actions;
export const { addProduct, removeProduct, sortListByName, sortList, sortListByQuantity, sortListByDiscount, Discount1 } = productsSlice.actions;

export const listsReducer = listsSlice.reducer; 
export const productsReducer = productsSlice.reducer; 

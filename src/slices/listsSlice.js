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
    addList: (state, action) => {}

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
    addCart: (state, action) => {
      state.cart = [...state.cart, action.payload[0]];
    },
    delCart: (state, action) => {
      state.cart = state.cart.filter(elem => elem.title !== action.payload)
    },
    truncateCart: (state, action) => {
      state.cart = [];
    }
  },
});

export const {  addList } = catalogSlice.actions;
export const { addCart, delCart, truncateCart } = cartSlice.actions;
export const { setSorted, sortListByName, sortList, sortByArtist, sortByGenre, sortByYear } = sortedSlice.actions;

export const catalogReducer = catalogSlice.reducer; 
export const cartReducer = cartSlice.reducer; 
export const sortedReducer = sortedSlice.reducer;

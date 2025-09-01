import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import likedProductsReducer from '../features/likedProducts';
import addedToCartProductsReducer from '../features/addedToCartProducts';
import cartQuantitiesReducer from '../features/cartQuantities';
import authReducer from '../features/auth';

const reducer = combineReducers({
  likedProducts: likedProductsReducer,
  addedToCartProducts: addedToCartProductsReducer,
  cartQuantities: cartQuantitiesReducer,
  auth: authReducer,
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;

export default store;

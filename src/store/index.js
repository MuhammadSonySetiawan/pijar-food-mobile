/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redusers/counterSlice';
import recipeReducer from './redusers/recipeSlice';
import userReducer from './redusers/user';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    recipe: recipeReducer,
    userData: userReducer,
  },
});
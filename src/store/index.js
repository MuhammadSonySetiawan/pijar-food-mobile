/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redusers/counterSlice';
import recipeReducer from './redusers/recipeSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        recipe: recipeReducer,
    },
})
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipeList: [],
  currentRecipe: null,
  nameCategory:[],
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const check = state.recipeList.find(res => res.id == action.payload.id);

      if (!check) {
        state.recipeList.push(action.payload);
      }
    },
    getSelectRecipe: (state, action) => {
      const check = state.recipeList.find(res => res.id == action.payload);
      if (check) {
        state.currentRecipe = action.payload;
      } else {
        state.currentRecipe = null;
      }
    },
    category: (state, action) => {
      const name = action.payload;
      return {...state, nameCategory: name};
    },
  },
});

// Action creators are generated for each case reducer function
export const {addRecipe, getSelectRecipe, category} = recipeSlice.actions;

export default recipeSlice.reducer;
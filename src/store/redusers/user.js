/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  login: true,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user =  action.payload;
      return {...state, userData:user, login:false};
    },
    removeUser: (state, action) => {
      return {...state, userData:{},login:false};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {isSign: false},
  reducers: {
    setIsSign: (state, action) => {
      state.isSign = action.payload;
    },
  },
});

export const {setIsSign} = authSlice.actions;
export const selectIsSign = (state: any) => state.auth.isSign;
export default authSlice.reducer;

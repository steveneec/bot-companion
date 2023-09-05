import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    settings: null,
    contacts: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setUser, setSettings, setContacts, setToken} = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export const selectSettings = (state: any) => state.user.settings;
export const selectContacts = (state: any) => state.user.contacts;
export const selectToken = (state: any) => state.user.token;
export default userSlice.reducer;

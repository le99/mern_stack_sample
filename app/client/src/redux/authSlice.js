import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    username: null,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('auth', state.username);
    },
    logout: (state, action) => {
      state.username = null;
      localStorage.clear('auth');
    },
    init: (state, action) => {
      const username = localStorage.getItem('auth');
      if(username){
        state.username = username;
      }
    }
  },
});

export const { login, logout, init } = authSlice.actions;

export const loginAsync = (username, password) => dispatch => {
  setTimeout(() => {
    dispatch(login(username));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsername = state => state.auth.username;

export default authSlice.reducer;

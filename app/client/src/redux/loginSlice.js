import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'counter',
  initialState: {
    username: null,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    login: (state, action) => {
      state.username = action.payload;
    },
    logout: (state, action) => {
      state.username = null;
    },
  },
});

export const { increment, decrement, login, logout } = loginSlice.actions;

export const loginAsync = (username, password) => dispatch => {
  setTimeout(() => {
    dispatch(login(username));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsername = state => state.login.username;

export default loginSlice.reducer;

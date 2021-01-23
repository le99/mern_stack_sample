import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    metamaskEnabled: false,
    account: null
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('auth', state.username);
    },
    logout: (state) => {
      state.username = null;
      localStorage.clear('auth');
    },
    init: (state, action) => {
      state.username = action.payload.username;
      state.metamaskEnabled = action.payload.metamaskEnabled;
      state.account = action.payload.account;
    },
    setAccount: (state, action) =>{
      state.account = action.payload
    }
  },
});

export const { login, logout, init, setAccount } = authSlice.actions;

export const loginAsync = (username) => dispatch => {
  setTimeout(() => {
    dispatch(login(username));
  }, 1000);
};

export const initAsync = () => async (dispatch) =>{
  const username = localStorage.getItem('auth');
  let metamaskEnabled = false
  if (typeof window.ethereum !== 'undefined') {
    metamaskEnabled = true;
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  dispatch(init({username, metamaskEnabled, account}))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsername = state => state.auth.username;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import _ from 'underscore';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    metamaskEnabled: false,
    accounts: {},
    currentAccount: null
  },
  reducers: {
    init: (state, action) => {
      state.metamaskEnabled = action.payload.metamaskEnabled;
      state.accounts = action.payload.accounts;
      state.currentAccount = action.payload.currentAccount;
    },
    setAccounts: (state, action) =>{
      state.accounts = action.payload.accounts
      state.currentAccount = action.payload.currentAccount
    }
  },
});

function localSaveAccounts(accounts, currentAccount){
  if(_.keys(accounts).length == 0){
    return localStorage.clear('auth');
  }
  localStorage.setItem('auth', JSON.stringify({currentAccount, accounts}));
}

function localGetAccounts(){
  let r = localStorage.getItem('auth');
  if(!r){
    return {accounts: {}, currentAccount: null};
  }
  return JSON.parse(r);
}

function localRemoveAccount(account){
  let r = localStorage.getItem('auth');
  if(!r){
    return;
  }
  let {accounts, currentAccount} = localGetAccounts();

  if(account === currentAccount){
    currentAccount = null;
  }
  delete accounts[account];
  localSaveAccounts(accounts, currentAccount);
}

export const { init, setAccounts } = authSlice.actions;

export const signupAsync = (email, username, password) => async (dispatch, getState) => {
  let {accounts, currentAccount} = getState().auth;
  accounts = _.clone(accounts);
  if(!currentAccount){
    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    currentAccount = _accounts[0];
  }
  accounts[currentAccount] = {email, username, password};

  localSaveAccounts(accounts, currentAccount)
  dispatch(setAccounts({accounts, currentAccount}));
} 

export const signinAsync = (email, password) => async (dispatch, getState) => {
  let {accounts, currentAccount} = getState().auth;
  accounts = _.clone(accounts);

  if(!currentAccount){
    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    currentAccount = _accounts[0];
  }
  accounts[currentAccount] = {email, username:"user?", password};

  localSaveAccounts(accounts, currentAccount);
  dispatch(setAccounts({accounts, currentAccount}));
};

export const signoutAsync = () => async (dispatch, getState) => {
  let {accounts, currentAccount} = getState().auth;
  accounts = _.clone(accounts);

  delete accounts[currentAccount];
  if(!currentAccount){
    return;
  }
  currentAccount = null;
  localRemoveAccount(currentAccount);
  dispatch(setAccounts({accounts, currentAccount}));
}; 

export const initAsync = () => async (dispatch) =>{
  let {accounts, currentAccount} = localGetAccounts();
  accounts = _.clone(accounts);

  let metamaskEnabled = false
  if (typeof window.ethereum !== 'undefined') {
    metamaskEnabled = true;
  }

  dispatch(init({metamaskEnabled, accounts, currentAccount}))
}

export const setCurrentAccountAsync = (account) => async (dispatch, getState) =>{
  let {accounts} = getState().auth;
  accounts = _.clone(accounts);

  dispatch(setAccounts({accounts, currentAccount: account}));
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsername = state => state.auth.currentAccount;

export default authSlice.reducer;

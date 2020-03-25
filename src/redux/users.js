import {
  domain,
  jsonHeaders,
  handleJsonResponse,
  getInitStateFromStorage,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer
} from "./helpers";
import { login, logout } from "./auth";
//import { create } from "domain";

const url = domain + "/users";

const GETUSER = createActions("getuser");
export const getuser = username => dispatch => {
  dispatch(GETUSER.START());
  return fetch(url + `/${username}`)
    .then(handleJsonResponse)
    .then(result => dispatch(GETUSER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(GETUSER.FAIL(err))));
};
const EDITUSER = createActions("edituser");
export const edituser = userData => (dispatch, getState) => {
  dispatch(EDITUSER.START());
  const token = getState().auth.login.result.token;
  const username = getState().auth.login.result.username;
  return fetch(url + `/${username}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify(userData)
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(EDITUSER.SUCCESS(result));
      dispatch(getuser(username));
    })
    .catch(err => Promise.reject(dispatch(EDITUSER.FAIL(err.toString()))));
};
const DELETEUSER = createActions("deleteuser");
export const deleteuser = username => (dispatch, getState) => {
  dispatch(DELETEUSER.START());
  const token = getState().auth.login.result.token;
  const username = getState().auth.login.result.username;
  dispatch(logout());
  return fetch(url + `/${username}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => dispatch(DELETEUSER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(DELETEUSER.FAIL(err.toString()))));
};

const GETUSERPICTURE = createActions("getuserpicture");
export const getuserpicture = username => dispatch => {
  dispatch(GETUSERPICTURE.START());
  return fetch(url + `/${username}/picture`)
    .then(handleJsonResponse)
    .then(result => dispatch(GETUSERPICTURE.SUCCESS(result)))
    .catch(err =>
      Promise.reject(dispatch(GETUSERPICTURE.FAIL(err.toString())))
    );
};

const GETUSERLIST = createActions("getuserslist");
export const getuserlist = () => dispatch => {
  dispatch(GETUSERLIST.START());
  return fetch(url + `?limit=200&offset=0`)
    .then(handleJsonResponse)
    .then(result => {
      result = Object.keys(result.users).map(key => result.users[key]);
      dispatch({
        type: GETUSERLIST.SUCCESS,
        payload: result
      });
    })
    .catch(err => Promise.reject(dispatch(GETUSERLIST.FAIL(err.toString()))));
};
const SIGNUP = createActions("signup");
export const signup = signupData => dispatch => {
  dispatch(SIGNUP.START());

  return fetch(url, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(signupData)
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(SIGNUP.SUCCESS(result));
      dispatch(
        login({ username: signupData.username, password: signupData.password })
      );
    })
    .catch(err => Promise.reject(dispatch(SIGNUP.FAIL(err.toString()))));
};

export const reducers = {
  getuser: createReducer(
    getInitStateFromStorage("getuser", asyncInitialState),
    {
      ...asyncCases(GETUSER)
    }
  ),
  getuserlist: createReducer(
    getInitStateFromStorage("getuserlist", asyncInitialState),
    {
      ...asyncCases(GETUSERLIST)
    }
  ),
  getuserpicture: createReducer(
    getInitStateFromStorage("getuserpicture", asyncInitialState),
    {
      ...asyncCases(GETUSERPICTURE)
    }
  ),
  signup: createReducer(getInitStateFromStorage("signup", asyncInitialState), {
    ...asyncCases(SIGNUP)
  }),
  edituser: createReducer(
    getInitStateFromStorage("edituser", asyncInitialState),
    {
      ...asyncCases(EDITUSER)
    }
  ),
  deleteuser: createReducer(
    getInitStateFromStorage("deleteuser", asyncInitialState),
    {
      ...asyncCases(DELETEUSER)
    }
  )
};

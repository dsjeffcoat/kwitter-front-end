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

import { login } from "./auth";

const url = domain + "/users";

const GETUSER = createActions("getUser");
export const getUser = username => dispatch => {
  dispatch(GETUSER.START());

  return fetch(url + `/${username}`, {
    method: "GET"
  })
    .then(handleJsonResponse)
    .then(result => dispatch(GETUSER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(GETUSER.FAIL(err))));
};

// const LOGOUT = createActions("logout");
// export const logout = () => (dispatch, getState) => {
//   dispatch(LOGOUT.START());

//   const token = getState().auth.login.result.token;

//   return fetch(url + "/logout", {
//     method: "GET",
//     headers: { Authorization: "Bearer " + token, ...jsonHeaders }
//   })
//     .then(handleJsonResponse)
//     .then(result => dispatch(LOGOUT.SUCCESS(result)))
//     .catch(err => Promise.reject(dispatch(LOGOUT.FAIL(err))));
// };

    // [LOGOUT.SUCCESS.toString()]: (state, action) => asyncInitialState
//   }),
//   logout: createReducer(asyncInitialState, {
//     ...asyncCases(LOGOUT)


const SIGNUP = createActions("signup");
export const _signup = signupData => dispatch => {
  dispatch(SIGNUP.START());

  return fetch(url, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(signupData)
  })
    .then(handleJsonResponse)
    .then(result => dispatch(SIGNUP.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(SIGNUP.FAIL(err))));
};

export const signup = signupData => dispatch => {
  dispatch(_signup(signupData)).then(() =>
    dispatch(
      login({ username: signupData.username, password: signupData.password })
    )
  );
};

export const reducers = {
  signup: createReducer(getInitStateFromStorage("signup", asyncInitialState), {
    ...asyncCases(SIGNUP),
    [SIGNUP.SUCCESS.toString()]: (state, action) => asyncInitialState
  }),
  getUser: createReducer(getInitStateFromStorage("getUser", asyncInitialState), {
    ...asyncCases(GETUSER),
};

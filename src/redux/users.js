import {
  domain,
 // jsonHeaders,
  handleJsonResponse,
  getInitStateFromStorage,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer
} from "./helpers";

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

export const reducers = {
  getUser: createReducer(getInitStateFromStorage("getUser", asyncInitialState), {
    ...asyncCases(GETUSER),
    // [LOGOUT.SUCCESS.toString()]: (state, action) => asyncInitialState
//   }),
//   logout: createReducer(asyncInitialState, {
//     ...asyncCases(LOGOUT)
  })
};

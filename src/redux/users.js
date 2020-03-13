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
  })
};

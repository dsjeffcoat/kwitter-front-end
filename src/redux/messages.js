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

const url = domain + "/messages";

const MESSAGELIST = createActions("messagelist");
export const messagelist = () => dispatch => {
  dispatch(MESSAGELIST.START());
  return fetch(url + "?limit=200&offset=0")
    .then(handleJsonResponse)
    .then(result => {
      result = Object.keys(result.messages).map(key => result.messages[key]);
      dispatch({
        type: MESSAGELIST.SUCCESS,
        payload: result
      });
    })
    .catch(err => Promise.reject(dispatch(MESSAGELIST.FAIL(err))));
};

const GETUSERMESSAGES = createActions("getusermessages");
export const getusermessages = username => dispatch => {
  dispatch(GETUSERMESSAGES.START());
  return fetch(url + `?limit=200&offset=0&username=${username}`)
    .then(handleJsonResponse)
    .then(result => {
      result = Object.keys(result.messages).map(key => result.messages[key]);
      dispatch(GETUSERMESSAGES.SUCCESS(result));
    })
    .catch(err => Promise.reject(dispatch(GETUSERMESSAGES.FAIL(err))));
};

const CREATEMESSAGE = createActions("createmessage");
const _createMessage = postMessageData => (dispatch, getState) => {
  dispatch({
    type: CREATEMESSAGE.START
  });

  const token = getState().auth.login.result.token;

  return fetch(url, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify(postMessageData)
  })
    .then(handleJsonResponse)
    .then(result => dispatch(CREATEMESSAGE.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(CREATEMESSAGE.FAIL(err))));
};

export const createmessage = postMessageData => (dispatch, getState) => {
  const username = getState().auth.login.result.username;
  return dispatch(_createMessage(postMessageData)).then(() =>
    dispatch(getusermessages(username))
  );
};

const DELETEMESSAGE = createActions("deletemessage");
const _deletemessage = messageId => (dispatch, getState) => {
  dispatch({
    type: DELETEMESSAGE.START
  });

  const token = getState().auth.login.result.token;

  return fetch(url + "/" + messageId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => dispatch(DELETEMESSAGE.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(DELETEMESSAGE.FAIL(err))));
};

export const deletemessage = messageId => (dispatch, getState) => {
  return dispatch(_deletemessage(messageId)).then(() => {
    const username = getState().auth.login.result.username;
    const pathname = getState().router.location.pathname;
    if (pathname === "/messagefeed/" + username) {
      dispatch(getusermessages());
    }
    dispatch(getusermessages(username));
  });
};

export const reducers = {
  messagelist: createReducer(
    getInitStateFromStorage("messagelist", asyncInitialState),
    {
      ...asyncCases(MESSAGELIST)
    }
  ),
  getusermessages: createReducer(
    getInitStateFromStorage("getusermessages", asyncInitialState),
    {
      ...asyncCases(GETUSERMESSAGES)
    }
  ),
  createmessage: createReducer(
    getInitStateFromStorage("createmessage", asyncInitialState),
    {
      ...asyncCases(CREATEMESSAGE)
    }
  ),
  deletemessage: createReducer(
    getInitStateFromStorage("deletemessage", asyncInitialState),
    {
      ...asyncCases(DELETEMESSAGE)
    }
  )
}; //

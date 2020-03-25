import {
  domain,
  handleJsonResponse,
  getInitStateFromStorage,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer,
  jsonHeaders
} from "./helpers";

import { messagelist, getusermessages } from "./messages";

const url = domain;

export const ADDLIKE = createActions("addlike");

export const addlike = messageId => (dispatch, getState) => {
  dispatch(ADDLIKE.START);
  const token = getState().auth.login.result.token;
  const username = getState().auth.login.result.username;
  return fetch(url + "/likes", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({ messageId: messageId })
  })
    .then(handleJsonResponse)
    .then(result => {
      if (result.statusCode === 200) {
        dispatch(messagelist());
        dispatch(getusermessages(username));
      } else if (result.statusCode === 400) {
        dispatch(removelike(messageId));
      }
      dispatch(ADDLIKE.SUCCESS(result));
    })
    .catch(err => {
      if (err.statusCode === 400) {
        dispatch(removelike(messageId));
      }
      Promise.reject(dispatch(ADDLIKE.FAIL(err)));
    });
};

export const REMOVELIKE = createActions("removelike");
export const removelike = messageID => (dispatch, getState) => {
  dispatch(REMOVELIKE.START);

  const token = getState().auth.login.result.token;
  const username = getState().auth.login.result.username;
  return fetch(url + "/messages/" + messageID, {
    method: "GET"
  })
    .then(handleJsonResponse)
    .then(result => {
      result.message.likes.map(each => {
        if (each.username === username) {
          const likeID = each.id;
          fetch(url + "/likes/" + likeID, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token, ...jsonHeaders }
          })
            .then(handleJsonResponse)
            .then(result => {
              dispatch(messagelist());
              dispatch(getusermessages(username));
              dispatch(REMOVELIKE.SUCCESS(result));
            });
        }
        return each.id;
      });
    });
};

export const reducers = {
  addlike: createReducer(
    getInitStateFromStorage("addlike", asyncInitialState),
    {
      ...asyncCases(ADDLIKE)
    }
  ),
  removelike: createReducer(
    getInitStateFromStorage("removelike", asyncInitialState),
    {
      ...asyncCases(REMOVELIKE)
    }
  )
};

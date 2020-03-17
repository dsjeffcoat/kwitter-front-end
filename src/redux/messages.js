import {
    domain,
    
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

      result=Object.keys(result.messages).map(key=>result.messages[key])
      dispatch({
        type: MESSAGELIST.SUCCESS, 
        payload: result
      })})
     .catch(err => Promise.reject(dispatch(MESSAGELIST.FAIL(err))));
  };
  const GETUSERMESSAGES = createActions("getusermessages");
  export const getusermessages = (username) => dispatch => {
     dispatch(GETUSERMESSAGES.START());
     return fetch(url + `?limit=200&offset=0&username=${username}`)
     .then(handleJsonResponse)
     .then(result => {

      result=Object.keys(result.messages).map(key=>result.messages[key])
      dispatch({
        type: GETUSERMESSAGES.SUCCESS, 
        payload: result
      })})
     .catch(err => Promise.reject(dispatch(GETUSERMESSAGES.FAIL(err))));
  };
  // const CREATENEWMESSAGE = createActions("createnewmessage");
  // export const createnewmessage = messageData => (dispatch, getState) => {
  //    dispatch(CREATENEWMESSAGE.START());
  //    const token = getState().auth.login.result.token;
  //    console.log(token)
  //    return fetch(url, {
  //     method: "POST",
  //     headers: { Authorization: "Bearer-" + token, ...jsonHeaders},
  //     body: JSON.stringify({ text: messageData})
  //    } )
  //    .then(handleJsonResponse)
  //    .then(result => {
  //     console.log(result)
  //     dispatch(CREATENEWMESSAGE.SUCCESS(result))
  //     // dispatch(getusermessages())
  //     })
  //    .catch(err => Promise.reject(dispatch(CREATENEWMESSAGE.FAIL(err))));
  // };

  export const reducers = {
    messagelist: createReducer(getInitStateFromStorage("messagelist", asyncInitialState), {
      ...asyncCases(MESSAGELIST)
    }),
    getusermessages: createReducer(getInitStateFromStorage("getusermessages", asyncInitialState), {
        ...asyncCases(GETUSERMESSAGES)
    })
  //   createnewmessage: createReducer(getInitStateFromStorage("createnewmessage", asyncInitialState), {
  //     ...asyncCases(CREATENEWMESSAGE)
  // })
    
};//
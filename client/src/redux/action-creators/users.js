import axios from 'axios';

const setUserListStart = () => {
  return {
    type: 'SET_USER_LIST_START',
    payload: {}
  };
};

const setUserListSuccess = data => {
  // data: Array of user obj
  //   console.log(data[0]);
  return {
    type: 'SET_USER_LIST_SUCCESS',
    payload: { users: data }
  };
};

const setUserListError = err => {
  return {
    type: 'SET_USER_LIST_ERROR',
    payload: { error: err }
  };
};

export const setUserList = () => dispatch => {
  dispatch(setUserListStart());
  axios
    .get('http://localhost:5000/api/users')
    .then(res => dispatch(setUserListSuccess(res.data)))
    .catch(err => dispatch(setUserListError(err)));
};

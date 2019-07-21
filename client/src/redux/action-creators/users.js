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

// --------------

const createUserStart = () => {
  return {
    type: 'CREATE_USER_START',
    payload: {}
  };
};

const createUserSuccess = userData => {
  // data: user obj: {fn, ln, sex, age, pw}
  return {
    type: 'CREATE_USER_SUCCESS',
    payload: userData
  };
};

const createUserError = err => {
  return {
    type: 'CREATE_USER_ERROR',
    payload: { error: err }
  };
};

export const createUser = userData => dispatch => {
  dispatch(createUserStart());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .post('http://localhost:5000/api/users', userData, config)
    .then(res => dispatch(createUserSuccess(res.data)))
    .catch(err => dispatch(createUserError(err)));
};

export const initUser = () => dispatch => {
  dispatch({
    type: 'INIT_USER',
    payload: {
      firstname: null,
      lastname: null,
      sex: null,
      age: null,
      password: null,
      createSuccess: false
    }
  });
};

// ---------

const editUserStart = () => {
  return {
    type: 'EDIT_USER_START',
    payload: {}
  };
};

const editUserSuccess = userData => {
  // data: user obj: {fn, ln, sex, age, pw}
  return {
    type: 'EDIT_USER_SUCCESS',
    payload: userData
  };
};

const editUserError = err => {
  return {
    type: 'EDIT_USER_ERROR',
    payload: { error: err }
  };
};

export const editUser = userData => dispatch => {
  dispatch(editUserStart());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .put(`http://localhost:5000/api/users/${userData.id}`, userData, config)
    .then(res => dispatch(editUserSuccess(res.data)))
    .catch(err => dispatch(editUserError(err)));
};

// -------

export const initEdit = () => dispatch => {
  console.log('init dispatch');
  dispatch({
    type: 'INIT_EDIT',
    payload: {
      firstname: null,
      lastname: null,
      sex: null,
      age: null,
      password: null,
      editSuccess: false
    }
  });
};

// const getUserStart = () => {
//   return {
//     type: 'GET_USER_START',
//     payload: {}
//   };
// };

// const getUserSuccess = userData => {
//   // data: Array of user obj
//   console.log(userData);
//   return {
//     type: 'GET_USER_SUCCESS',
//     payload: userData
//   };
// };

// const getUserError = err => {
//   return {
//     type: 'GET_USER_ERROR',
//     payload: { error: err }
//   };
// };

// export const getUser = id => dispatch => {
//   dispatch(getUserStart());
//   axios
//     .get(`http://localhost:5000/api/users/${id}`)
//     .then(res => dispatch(getUserSuccess(res.data)))
//     .catch(err => dispatch(getUserError(err)));
// };

// export const getInit = () => dispatch => {
//   dispatch({
//     type: 'GET_INIT',
//     payload: {
//       firstname: null,
//       lastname: null,
//       sex: null,
//       age: null,
//       password: null,
//       //   user: {},
//       isLoading: false,
//       getSuccess: false
//     }
//   });
// };

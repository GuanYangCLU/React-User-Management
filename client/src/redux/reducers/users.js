//   const users = [
//     { firstname: 'a', lastname: 'b', sex: 'm', age: 1 },
//     { firstname: 'a', lastname: 'b', sex: 'm', age: 1 },
//     { firstname: 'a', lastname: 'b', sex: 'm', age: 1 },
//     { firstname: 'a', lastname: 'b', sex: 'm', age: 1 }
//   ];

const initState = {
  users: [],
  error: null,
  isLoading: false
};

const users = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER_LIST_START':
      return { ...state, isLoading: true };
    case 'SET_USER_LIST_SUCCESS':
      return { ...state, ...payload, isLoading: false };
    case 'SET_USER_LIST_ERROR':
      return { ...state, ...payload, isLoading: false };
    default:
      return state;
  }
};

export default users;

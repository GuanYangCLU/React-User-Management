const initState = {
  firstname: null,
  lastname: null,
  sex: null,
  age: null,
  password: null,
  error: null,
  isLoading: false
};

const user = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CREATE_USER_START':
      return { ...state, isLoading: true };
    case 'CREATE_USER_SUCCESS':
      return { ...state, ...payload, isLoading: false };
    case 'CREATE_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    default:
      return state;
  }
};

export default user;

const initState = {
  user: null,
  isLoading: false
};

const getUser = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_USER_START':
      return { ...state, isLoading: true };
    case 'GET_USER_SUCCESS':
      return { ...state, ...payload, isLoading: false };
    case 'GET_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    default:
      return state;
  }
};

export default getUser;

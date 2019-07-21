const initState = {
  firstname: null,
  lastname: null,
  sex: null,
  age: null,
  password: null,
  error: null,
  isLoading: false,
  editSuccess: false
};

const editUser = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'EDIT_USER_START':
      return { ...state, isLoading: true };
    case 'EDIT_USER_SUCCESS':
      return { ...state, ...payload, isLoading: false, editSuccess: true };
    case 'EDIT_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'INIT_EDIT':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default editUser;

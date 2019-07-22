const initState = {
  error: null,
  deleteIds: [],
  isLoading: false
};

const deleteUser = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'DELETE_USER_START':
      return { ...state, isLoading: true };
    case 'DELETE_USER_SUCCESS':
      // console.log(payload._id, ' in reducer');
      return {
        ...state,
        deleteIds: [...state.deleteIds, payload._id],
        isLoading: false
      };
    case 'DELETE_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    // case 'INIT_DELETE':
    //   return { ...state, ...payload };
    default:
      return state;
  }
};

export default deleteUser;

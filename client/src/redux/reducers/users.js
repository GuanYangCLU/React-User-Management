const initState = {};

const users = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_ALL_USERS':
      return state;

    default:
      return state;
  }
};

export default users;

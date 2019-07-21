// const initState = {
//   firstname: null,
//   lastname: null,
//   sex: null,
//   age: null,
//   password: null,
//   //   user: {},
//   isLoading: false,
//   getSuccess: false
// };

// const getUser = (state = initState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case 'GET_USER_START':
//       return { ...state, isLoading: true };
//     case 'GET_USER_SUCCESS':
//       //   console.log(payload, 'haha');
//       return { ...state, ...payload, isLoading: false, getSuccess: true };
//     case 'GET_USER_ERROR':
//       return { ...state, ...payload, isLoading: false };
//     case 'GET_INIT':
//       return { ...state, ...payload };
//     default:
//       return state;
//   }
// };

// export default getUser;

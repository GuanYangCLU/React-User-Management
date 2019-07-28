import { combineReducers } from 'redux';
import users from './users';
import createUser from './createuser';
import editUser from './edituser';
// import deleteUser from './deleteuser';
import alert from './alert';
import getUser from './getuser';

const reducer = combineReducers({
  users,
  createUser,
  editUser,
  // deleteUser,
  getUser,
  alert
});

export default reducer;

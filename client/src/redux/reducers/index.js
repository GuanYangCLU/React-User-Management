import { combineReducers } from 'redux';
import users from './users';
import createUser from './createuser';
import editUser from './edituser';
import getUser from './getuser';
import alert from './alert';

const reducer = combineReducers({
  users,
  createUser,
  alert,
  editUser,
  getUser
});

export default reducer;

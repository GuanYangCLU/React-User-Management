import { combineReducers } from 'redux';
import users from './users';
import createUser from './createuser';
import editUser from './edituser';
import deleteUser from './deleteuser';
import alert from './alert';

const reducer = combineReducers({
  users,
  createUser,
  editUser,
  deleteUser,
  alert
});

export default reducer;

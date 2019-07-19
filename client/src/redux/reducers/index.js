import { combineReducers } from 'redux';
import users from './users';
import user from './user';
import alert from './alert';

const reducer = combineReducers({ users, user, alert });

export default reducer;

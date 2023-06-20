import { combineReducers, configureStore } from '@reduxjs/toolkit';

import castings from './slices/castings';
import user from './slices/user';
import enrolled from './slices/enrolled';
import contact from './slices/contact';
import admin from './slices/admin'
const reducer = combineReducers({
	castings,
	user,
	enrolled,
	contact,
	admin,
});

export default configureStore({
	reducer,
});

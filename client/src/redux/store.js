import {combineReducers, configureStore} from "@reduxjs/toolkit"

import castings from './slices/castings'
import user from "./slices/user"
import enrolled from './slices/enrolled'

const reducer = combineReducers({
    castings, 
    user,
    enrolled
})

export default configureStore({
    reducer
})
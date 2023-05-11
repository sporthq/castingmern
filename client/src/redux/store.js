import {combineReducers, configureStore} from "@reduxjs/toolkit"

import castings from './slices/castings'
import user from "./slices/user"

const reducer = combineReducers({
    castings, 
    user
})

export default configureStore({
    reducer
})
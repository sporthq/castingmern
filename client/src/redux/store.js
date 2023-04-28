import {combineReducers, configureStore} from "@reduxjs/toolkit"

import castings from './slices/castings'
const reducer = combineReducers({
    castings
})

export default configureStore({
    reducer
})
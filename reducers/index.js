import { combineReducers } from 'redux'

import chat from './chatReducer'

// Start with two routes: The Main screen, with the Login screen on top.


const AppReducer = combineReducers({
  chat
})

export default AppReducer

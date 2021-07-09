import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import profileReducer from './reducers/profileReducer'
import alartReducer from './reducers/alertReducer'
import postReducer from './reducers/postReducer'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const middlewareEnhancer = applyMiddleware(...middlewares)
const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers)
const rootReducer = combineReducers({ userReducer, profileReducer, alartReducer, postReducer })

const store = createStore(rootReducer, composedEnhancers)

export default store;
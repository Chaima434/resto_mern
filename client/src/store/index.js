import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {persistStore,persistCombineReducers} from 'redux-persist';

const reducers = { reducer:reducer}
const reducerMain = persistCombineReducers({ key : 'root',storage },reducers);
const middlewares = [thunk];
let store = createStore(reducerMain,{},composeWithDevTools(
  applyMiddleware(...middlewares),
  // other store enhancers if any
));
let persistor = persistStore(store);
 
export  {persistor,store}

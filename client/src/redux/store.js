import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import uiReducer from './reducers/ui';
import dataReducer from './reducers/data';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  data: dataReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

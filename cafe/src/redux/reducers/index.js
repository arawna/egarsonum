import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import authReducer from './AuthNew';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    authNew: authReducer,
  });

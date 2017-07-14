'use strict';

import {Map} from 'immutable';
import {ReduceStore} from 'reduce-flux';
import get from 'get-object-value';
import {ajaxDispatch} from 'organism-react-ajax';

import dispatcher, {userDispatch} from '../actions/userDispatcher';

class userStore extends ReduceStore
{

  getInitialState()
  {
      return Map();
  }

  loginReturn(state, action)
  {
    const params = action.params;
    ajaxDispatch({
        type: 'ajaxPost',
        params: {
            path: '/auth/login-return/'+params.providerId, 
            query: {
                code: params.code
            },
            callback: (json, text) => {
                userDispatch({
                    type: 'login/home'
                });
            }
        }
    });
    return state;
  }

  goToHome(state, action)
  {
    ajaxDispatch({
        type: 'ajaxGet',
        params: {
            path: '/user', 
        }
    });
    return state;
  }

  reduce (state, action)
  {
      switch (action.type)
      {
          case 'login/return':
              return this.loginReturn(state, action); 
          case 'login/home':
              return this.goToHome(state, action); 
          case 'config/set':
              return state.merge(action.params);
          default:
              return state;
      }
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new userStore(dispatcher);
export default instance;

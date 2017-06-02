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
    ajaxDispatch({
        type: 'ajaxPost',
        params: {
            path: '/auth/login-return', 
            query: {
                code: action.params.code
            },
            callback: (json, text) => {
                console.log('login return callback');
                userDispatch({
                    type: 'login/is-user-exists'
                });
            }
        }
    });
    return state;
  }

  isUserExists(state, action)
  {
    ajaxDispatch({
        type: 'ajaxPost',
        params: {
            path: '/user/is-exists', 
            callback: (json, text) => {
                  if (json.isExists) {
                        userDispatch({
                            type: 'config/set',
                            params: {
                                loginStep: 'success' 
                            }
                        });
                  } else {
                        userDispatch({
                            type: 'config/set',
                            params: {
                                loginStep: 'register' 
                            }
                        });
                  }
            }
        }
    });
    return state;
  }

  register(state, action)
  {

    return state;
  }

  reduce (state, action)
  {
      switch (action.type)
      {
          case 'login/register':
              return this.register(state, action); 
          case 'login/return':
              return this.loginReturn(state, action); 
          case 'login/is-user-exists':
              return this.isUserExists(state, action); 
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

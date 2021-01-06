import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class signUpEpic {
  static signUp = action$ =>
    action$.pipe(
      ofType(SIGN_UP),
      switchMap(
        async ({ payload: { name, lastName, email, password, buyerNews, to, props } }) => {
          try {
            await firebase.register(name, email, password)
            try {
              const { id } = firebase.getCurrentUser()
              const response = await RestClient.post(API_ENDPOINTS.createAccount, {
                id,
                name,
                lastName,
                email,
                buyerNews
              });
              const { status, data: resObj, problem } = response;
              if (status && status === 200) {
                return customisedAction(SIGN_UP_SUCCESS, {
                  user: firebase.getCurrentUser(),
                  toast: { message: resObj.msg, type: 'success'}
                }, { to, props })
              }
              if (status && (status === 401 || status === 422 || status === 503)) {
                firebase.delete()
                return customisedAction(SIGN_UP_FAILURE, { message: resObj.msg, type: 'error'})
              }
              if (problem && problem === 'NETWORK_ERROR') {
                firebase.delete()
                return customisedAction(SIGN_UP_FAILURE, { message: 'Network Error while Signing Up!', type: 'error'})
              }
              firebase.delete()
              return customisedAction(SIGN_UP_FAILURE, { message: 'Unknown Error while Signing Up!', type: 'error'})
            } catch (error) {
              console.log('SignUp Unknown Error', error);
              firebase.delete()
              return customisedAction(SIGN_UP_FAILURE, { message: error.message, type: 'error'})
            }
          } catch (error) {
            firebase.delete()
            console.log('SignUp Unknown Error', error);
            return customisedAction(SIGN_UP_FAILURE, { message: error.message, type: 'error'})
          }
        }
      )
    );
}

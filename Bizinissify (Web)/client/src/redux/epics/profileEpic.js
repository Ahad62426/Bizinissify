import { switchMap, filter } from 'rxjs/operators'
// import CryptoJS from 'crypto-js'

import { customisedAction } from '../actions'
import {
  SET_SESSION,
  SIGN_UP_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class profileEpic {
  static profile = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case SIGN_UP_SUCCESS:
            return true;
          case SET_SESSION:
            return true;
          case UPDATE_PROFILE_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ extras: { to, props } }) => {
          // const encryptedToken = CryptoJS.AES.encrypt(firebase.getCurrentUser().id, '62426!').toString();
          RestClient.setHeader('Authorization', firebase.getCurrentUser().id);
          try {
            const response = await RestClient.get(API_ENDPOINTS.getProfile);
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              if (to) setTimeout(() => props.history.replace(to), 500)
              return customisedAction(GET_PROFILE_SUCCESS, { profile: resObj.profile })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) firebase.delete()
              firebase.logout()
              return customisedAction(GET_PROFILE_FAILURE, { message: resObj.msg, type: 'error' })
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(GET_PROFILE_FAILURE, { message: 'Network Error while Fetching Profile!', type: 'error' })
            }
            firebase.logout()
            return customisedAction(GET_PROFILE_FAILURE, { message: 'Unknown Error while Fetching Profile!', type: 'error' })
          } catch (error) {
            firebase.logout()
            console.log('GetProfile Unknown Error', error);
            return customisedAction(GET_PROFILE_FAILURE, { message: error.message, type: 'error' })
          }
        }
      )
    );
}

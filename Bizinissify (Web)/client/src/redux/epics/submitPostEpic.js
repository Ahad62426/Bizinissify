import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  SUBMIT_POST,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class submitPostEpic {
  static submitPost = action$ =>
    action$.pipe(
      ofType(SUBMIT_POST),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.addPost, payload );
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(SUBMIT_POST_SUCCESS, {
                submittedPost: payload,
                toast: { message: resObj.msg, type: 'success'}
              })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) firebase.delete()
              return customisedAction(SUBMIT_POST_FAILURE, { message: resObj.msg, type: 'error'})
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(SUBMIT_POST_FAILURE, { message: 'Network Error while Submitting Post', type: 'error'})
            }
            return customisedAction(SUBMIT_POST_FAILURE, { message: 'Unknown Error while Submitting Post', type: 'error'})
          } catch (error) {
            console.log('Submit Post Unknown Error', error);
            return customisedAction(SUBMIT_POST_FAILURE, { message: error.message, type: 'error'})
          }
        }
      )
    );
}

import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class editPostEpic {
  static editPost = action$ =>
    action$.pipe(
      ofType(EDIT_POST),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.editPost, payload );
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(EDIT_POST_SUCCESS, {
                postToEdit: payload,
                toast: { message: resObj.msg, type: 'success'}
              })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) firebase.delete()
              return customisedAction(EDIT_POST_FAILURE, { message: resObj.msg, type: 'error'})
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(EDIT_POST_FAILURE, { message: 'Network Error while Editing Post', type: 'error'})
            }
            return customisedAction(EDIT_POST_FAILURE, { message: 'Unknown Error while Editing Post', type: 'error'})
          } catch (error) {
            console.log('Edit Post Unknown Error', error);
            return customisedAction(EDIT_POST_FAILURE, { message: error.message, type: 'error'})
          }
        }
      )
    );
}

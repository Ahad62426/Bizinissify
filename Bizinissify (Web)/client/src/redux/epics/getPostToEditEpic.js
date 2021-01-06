import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  GET_POST_TO_EDIT,
  GET_POST_TO_EDIT_SUCCESS,
  GET_POST_TO_EDIT_FAILURE,
  API_ENDPOINTS,
} from '../../constants'
import { RestClient } from '../../services/network'

export class getPostToEditEpic {
  static getPostToEdit = action$ =>
    action$.pipe(
      ofType(GET_POST_TO_EDIT),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.getPostToEdit, payload);
            const { status, data, problem } = response;
            if (status && status === 200) {
              return customisedAction(GET_POST_TO_EDIT_SUCCESS, data);
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(GET_POST_TO_EDIT_FAILURE, { message: data.msg, type: 'error' });
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(GET_POST_TO_EDIT_FAILURE, { message: 'Network Error while Fetching Post To Edit!', type: 'error' });
            }
            return customisedAction(GET_POST_TO_EDIT_FAILURE, { message: 'Unknown Error while Fetching Post To Edit!', type: 'error' });
          } catch (error) {
            console.log('Post To Edit Unknown Error', error)
            return customisedAction(GET_POST_TO_EDIT_FAILURE, { message: error.message, type: 'error' });
          }
        }
      )
    );
}

import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  GET_OWN_POSTS,
  GET_OWN_POSTS_SUCCESS,
  GET_OWN_POSTS_FAILURE,
  API_ENDPOINTS,
} from '../../constants'
import { RestClient } from '../../services/network'

export class getOwnPostsEpic {
  static getOwnPosts = action$ =>
    action$.pipe(
      ofType(GET_OWN_POSTS),
      switchMap(
        async () => {
          try {
            const response = await RestClient.get(API_ENDPOINTS.getOwnPosts);
            const { status, data, problem } = response;
            if (status && status === 200) {
              const { ownPosts } = data;
              return customisedAction(GET_OWN_POSTS_SUCCESS, { ownPosts });
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(GET_OWN_POSTS_FAILURE, { message: data.msg, type: 'error' });
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(GET_OWN_POSTS_FAILURE, { message: 'Network Error while Fetching Own Posts!', type: 'error' });
            }
            return customisedAction(GET_OWN_POSTS_FAILURE, { message: 'Unknown Error while Fetching Own Posts!', type: 'error' });
          } catch (error) {
            console.log('Own Posts Unknown Error', error)
            return customisedAction(GET_OWN_POSTS_FAILURE, { message: error.message, type: 'error' });
          }
        }
      )
    );
}

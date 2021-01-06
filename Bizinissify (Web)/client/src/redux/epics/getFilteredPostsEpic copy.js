import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  GET_FILTERED_POSTS,
  GET_FILTERED_POSTS_SUCCESS,
  GET_FILTERED_POSTS_FAILURE,
  API_ENDPOINTS,
} from '../../constants'
import { RestClient } from '../../services/network'

export class getFilteredPostsEpic {
  static getFilteredPosts = action$ =>
    action$.pipe(
      ofType(GET_FILTERED_POSTS),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.getFilteredPosts, payload);
            const { status, data, problem } = response;
            if (status && status === 200) {
              const { posts } = data;
              return customisedAction(GET_FILTERED_POSTS_SUCCESS, { posts });
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(GET_FILTERED_POSTS_FAILURE, { message: data.msg, type: 'error' });
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(GET_FILTERED_POSTS_FAILURE, { message: 'Network Error while Fetching Filtered Posts!', type: 'error' });
            }
            return customisedAction(GET_FILTERED_POSTS_FAILURE, { message: 'Unknown Error while Fetching Filtered Posts!', type: 'error' });
          } catch (error) {
            console.log('Filtered Posts Unknown Error', error)
            return customisedAction(GET_FILTERED_POSTS_FAILURE, { message: error.message, type: 'error' });
          }
        }
      )
    );
}

import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  API_ENDPOINTS,
} from '../../constants'
import { RestClient } from '../../services/network'

export class getAllPostsEpic {
  static getAllPosts = action$ =>
    action$.pipe(
      ofType(GET_ALL_POSTS),
      switchMap(
        async () => {
          try {
            const response = await RestClient.get(API_ENDPOINTS.getAllPosts);
            const { status, data, problem } = response;
            if (status && status === 200) {
              const { posts } = data;
              return customisedAction(GET_ALL_POSTS_SUCCESS, { posts });
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(GET_ALL_POSTS_FAILURE, { message: data.msg, type: 'error' });
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(GET_ALL_POSTS_FAILURE, { message: 'Network Error while Fetching Posts!', type: 'error' });
            }
            return customisedAction(GET_ALL_POSTS_FAILURE, { message: 'Unknown Error while Fetching Posts!', type: 'error' });
          } catch (error) {
            console.log('Posts Unknown Error', error)
            return customisedAction(GET_ALL_POSTS_FAILURE, { message: error.message, type: 'error' });
          }
        }
      )
    );
}

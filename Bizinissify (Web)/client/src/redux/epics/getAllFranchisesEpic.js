import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  GET_ALL_FRANCHISES,
  GET_ALL_FRANCHISES_SUCCESS,
  GET_ALL_FRANCHISES_FAILURE,
  API_ENDPOINTS
} from '../../constants'
import { RestClient } from '../../services/network'

export class getAllFranchisesEpic {
  static getAllFranchises = action$ =>
    action$.pipe(
      ofType(GET_ALL_FRANCHISES),
      switchMap(
        async () => {
          try {
            const response = await RestClient.get(API_ENDPOINTS.getAllfranchises);
            const { status, data, problem } = response;
            if (status && status === 200) {
              const { franchises } = data;
              return customisedAction(GET_ALL_FRANCHISES_SUCCESS, { franchises });
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(GET_ALL_FRANCHISES_FAILURE, { message: data.msg, type: 'error' });
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(GET_ALL_FRANCHISES_FAILURE, { message: 'Network Error while Fetching Franchises!', type: 'error' });
            }
            return customisedAction(GET_ALL_FRANCHISES_FAILURE, { message: 'Unknown Error while Fetching Franchises!', type: 'error' });
          } catch (error) {
            console.log('Franchises Unknown Error', error)
            return customisedAction(GET_ALL_FRANCHISES_FAILURE, { message: error.message, type: 'error' });
          }
        }
      )
    );
}

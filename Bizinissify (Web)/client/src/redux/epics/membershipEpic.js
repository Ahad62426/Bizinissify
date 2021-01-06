import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  MEMBERSHIP,
  MEMBERSHIP_SUCCESS,
  MEMBERSHIP_FAILURE,
  API_ENDPOINTS,
} from '../../constants'

import { RestClient } from '../../services/network'

export class membershipEpic {
  static membership = action$ =>
    action$.pipe(
      ofType(MEMBERSHIP),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.membershipPayment, payload);
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(MEMBERSHIP_SUCCESS, {
                toast: { message: resObj.msg, type: 'success'}
              }, {
                subscription: payload.subscription
              })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(MEMBERSHIP_FAILURE, { message: resObj.msg, type: 'error' })
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(MEMBERSHIP_FAILURE, { message: 'Network Error while payment in progress!', type: 'error' })
            }
            return customisedAction(MEMBERSHIP_FAILURE, { message: 'Unknown Error while payment in progress', type: 'error' })
          } catch (error) {
            console.log('Payment Unknown Error', error);
            return customisedAction(MEMBERSHIP_FAILURE, { message: error.message, type: 'error' })
          }
        }
      )
    );
}

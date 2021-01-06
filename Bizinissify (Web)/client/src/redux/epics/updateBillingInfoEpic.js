import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  UPDATE_BILLING_INFO,
  UPDATE_BILLING_INFO_SUCCESS,
  UPDATE_BILLING_INFO_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import { RestClient } from '../../services/network'

export class updateBillingInfoEpic {
  static updateBillingInfo = action$ =>
    action$.pipe(
      ofType(UPDATE_BILLING_INFO),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.updateBillingInfo, payload);
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(UPDATE_BILLING_INFO_SUCCESS, { message: resObj.msg, type: 'success' })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(UPDATE_BILLING_INFO_FAILURE, { message: resObj.msg, type: 'error' })
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(UPDATE_BILLING_INFO_FAILURE, { message: 'Network Error while Updating BillingInfo!', type: 'error' })
            }
            return customisedAction(UPDATE_BILLING_INFO_FAILURE, { message: 'Unknown Error while Updating BillingInfo!', type: 'error' })
          } catch (error) {
            console.log('UpdateBillingInfo Unknown Error', error);
            return customisedAction(UPDATE_BILLING_INFO_FAILURE, { message: error.message, type: 'error' })
          }
        }
      )
    );
}

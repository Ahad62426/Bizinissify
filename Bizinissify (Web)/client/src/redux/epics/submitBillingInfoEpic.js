import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  SUBMIT_BILLING_INFO,
  SUBMIT_BILLING_INFO_SUCCESS,
  SUBMIT_BILLING_INFO_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class submitBillingInfoEpic {
  static submitBillingInfo = action$ =>
    action$.pipe(
      ofType(SUBMIT_BILLING_INFO),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.addBillingInfo, payload );
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(SUBMIT_BILLING_INFO_SUCCESS, {
                billingInfo: payload,
                toast: { message: resObj.msg, type: 'success'}
              })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) firebase.delete()
              return customisedAction(SUBMIT_BILLING_INFO_FAILURE, { message: resObj.msg, type: 'error'})
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(SUBMIT_BILLING_INFO_FAILURE, { message: 'Network Error while Submitting Billing Info', type: 'error'})
            }
            return customisedAction(SUBMIT_BILLING_INFO_FAILURE, { message: 'Unknown Error while Submitting Billing Info', type: 'error'})
          } catch (error) {
            console.log('Submit Billing Info Unknown Error', error);
            return customisedAction(SUBMIT_BILLING_INFO_FAILURE, { message: error.message, type: 'error'})
          }
        }
      )
    );
}

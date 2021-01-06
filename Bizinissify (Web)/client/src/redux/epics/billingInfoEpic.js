import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../actions'
import {
  GET_BILLING_INFO,
  UPDATE_BILLING_INFO_SUCCESS,
  GET_BILLING_INFO_SUCCESS,
  GET_BILLING_INFO_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class billingInfoEpic {
  static billingInfo = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_BILLING_INFO:
            return true;
          case UPDATE_BILLING_INFO_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          try {
            const response = await RestClient.get(API_ENDPOINTS.getBillingInfo);
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(GET_BILLING_INFO_SUCCESS, { billingInfo: resObj.billingInfo })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) firebase.delete()
              return customisedAction(GET_BILLING_INFO_FAILURE, { message: resObj.msg, type: 'error' })
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(GET_BILLING_INFO_FAILURE, { message: 'Network Error while Fetching BillingInfo!', type: 'error' })
            }
            return customisedAction(GET_BILLING_INFO_FAILURE, { message: 'Unknown Error while Fetching BillingInfo!', type: 'error' })
          } catch (error) {
            console.log('GetBillingInfo Unknown Error', error);
            return customisedAction(GET_BILLING_INFO_FAILURE, { message: error.message, type: 'error' })
          }
        }
      )
    );
}

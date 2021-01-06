import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  SUBMIT_FRANCHISE,
  SUBMIT_FRANCHISE_SUCCESS,
  SUBMIT_FRANCHISE_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class submitFranchiseEpic {
  static submitFranchise = action$ =>
    action$.pipe(
      ofType(SUBMIT_FRANCHISE),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.addFranchise, payload );
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(SUBMIT_FRANCHISE_SUCCESS, {
                submittedFranchise: payload,
                toast: { message: resObj.msg, type: 'success'}
              })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) firebase.delete()
              return customisedAction(SUBMIT_FRANCHISE_FAILURE, { message: resObj.msg, type: 'error'})
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(SUBMIT_FRANCHISE_FAILURE, { message: 'Network Error while Submitting Franchise', type: 'error'})
            }
            return customisedAction(SUBMIT_FRANCHISE_FAILURE, { message: 'Unknown Error while Submitting Franchise', type: 'error'})
          } catch (error) {
            console.log('Submit Franchise Unknown Error', error);
            return customisedAction(SUBMIT_FRANCHISE_FAILURE, { message: error.message, type: 'error'})
          }
        }
      )
    );
}

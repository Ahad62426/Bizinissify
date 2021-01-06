import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  EDIT_FRANCHISE,
  EDIT_FRANCHISE_SUCCESS,
  EDIT_FRANCHISE_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import firebase from '../../services/firebase'
import { RestClient } from '../../services/network'

export class editFranchiseEpic {
  static editFranchise = action$ =>
    action$.pipe(
      ofType(EDIT_FRANCHISE),
      switchMap(
        async ({ payload }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.editFranchise, payload );
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(EDIT_FRANCHISE_SUCCESS, {
                franchiseToEdit: payload,
                toast: { message: resObj.msg, type: 'success'}
              })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) firebase.delete()
              return customisedAction(EDIT_FRANCHISE_FAILURE, { message: resObj.msg, type: 'error'})
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(EDIT_FRANCHISE_FAILURE, { message: 'Network Error while Editing Franchise', type: 'error'})
            }
            return customisedAction(EDIT_FRANCHISE_FAILURE, { message: 'Unknown Error while Editing Franchise', type: 'error'})
          } catch (error) {
            console.log('Edit Franchise Unknown Error', error);
            return customisedAction(EDIT_FRANCHISE_FAILURE, { message: error.message, type: 'error'})
          }
        }
      )
    );
}

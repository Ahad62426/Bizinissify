import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../actions'
import {
  UPDATE_PROFILE,
  MEMBERSHIP_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  API_ENDPOINTS
} from '../../constants'

import { RestClient } from '../../services/network'

export class updateProfileEpic {
  static updateProfile = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case UPDATE_PROFILE:
            return true;
          case MEMBERSHIP_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload, extras: { subscription } }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.updateProfile, subscription ? { subscription } : payload);
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              return customisedAction(UPDATE_PROFILE_SUCCESS, { message: resObj.msg, type: 'success' })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(UPDATE_PROFILE_FAILURE, { message: resObj.msg, type: 'error' })
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(UPDATE_PROFILE_FAILURE, { message: 'Network Error while Updating Profile!', type: 'error' })
            }
            return customisedAction(UPDATE_PROFILE_FAILURE, { message: 'Unknown Error while Updating Profile!', type: 'error' })
          } catch (error) {
            console.log('GetProfile Unknown Error', error);
            return customisedAction(UPDATE_PROFILE_FAILURE, { message: error.message, type: 'error' })
          }
        }
      )
    );
}

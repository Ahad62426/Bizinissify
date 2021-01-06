import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  SIGN_IN,
  SET_SESSION,
  SIGN_IN_FAILURE,
} from '../../constants'

import firebase from '../../services/firebase'

export class signInEpic {
  static signIn = action$ =>
    action$.pipe(
      ofType(SIGN_IN),
      switchMap(
        async ({ payload: { email, password, to, props } }) => {
          try {
            await firebase.login(email, password)
            return customisedAction(SET_SESSION, firebase.getCurrentUser(), { to, props })
          } catch (error) {
            return customisedAction(SIGN_IN_FAILURE, { message: error.message, type: 'error'})
          }
        }
      )
    );
}

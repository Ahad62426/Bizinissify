import { SET_SESSION, SIGN_UP_SUCCESS, RESET_SESSION, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../../constants'

export default (state = { checkingSession: true, fetchingProfile: false, user: null, profile: null }, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, checkingSession: false, fetchingProfile: true, user: payload, profile: null }
    case RESET_SESSION:
      return { ...state, checkingSession: false, fetchingProfile: false, user: null, profile: null }
    case SIGN_UP_SUCCESS:
      return { ...state, checkingSession: false, fetchingProfile: true, user: payload.user, profile: null }
    case GET_PROFILE_SUCCESS:
      return { ...state, checkingSession: false, fetchingProfile: false, profile: payload.profile }
    case GET_PROFILE_FAILURE:
      return { ...state, checkingSession: false, fetchingProfile: false, user: null, profile: null }
    default:
      return state;
  }
};

import { SHOW_SIGN_IN, HIDE_SIGN_IN, SIGN_IN, SIGN_IN_FAILURE, GET_PROFILE_SUCCESS } from '../../constants'

export default (state = { signInDisplay: 'none', loading: false }, { type, payload }) => {
  switch (type) {
    case SHOW_SIGN_IN:
      return { ...state, signInDisplay: 'block', to: payload.from || null }
    case HIDE_SIGN_IN:
      return { ...state, signInDisplay: 'none' }
    case SIGN_IN:
      return { ...state, loading: true }
    case GET_PROFILE_SUCCESS:
      return { ...state, signInDisplay: 'none', loading: false }
    case SIGN_IN_FAILURE:
      return { ...state, loading: false }
    default:
      return state;
  }
};

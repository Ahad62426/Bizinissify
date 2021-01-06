import { SHOW_SIGN_UP, HIDE_SIGN_UP, SIGN_UP, SIGN_UP_FAILURE, GET_PROFILE_SUCCESS } from '../../constants'

export default (state = { signUpDisplay: 'none' }, { type }) => {
  switch (type) {
    case SHOW_SIGN_UP:
      return { ...state, signUpDisplay: 'block' }
    case HIDE_SIGN_UP:
      return { ...state, signUpDisplay: 'none' }
    case SIGN_UP:
      return { ...state, loading: true }
    case GET_PROFILE_SUCCESS:
      return { ...state, signUpDisplay: 'none', loading: false }
    case SIGN_UP_FAILURE:
      return { ...state, loading: false }
    default:
      return state;
  }
};

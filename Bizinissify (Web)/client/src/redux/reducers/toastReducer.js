import { 
  SET_TOAST, RESET_TOAST,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_BILLING_INFO_FAILURE,
  SUBMIT_BILLING_INFO_SUCCESS,
  SUBMIT_BILLING_INFO_FAILURE,
  UPDATE_BILLING_INFO_SUCCESS,
  UPDATE_BILLING_INFO_FAILURE,
  GET_ALL_POSTS_FAILURE,
  GET_POST_DETAILS_FAILURE,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE,
  GET_OWN_POSTS_FAILURE,
  GET_POST_TO_EDIT_FAILURE,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  GET_FILTERED_POSTS_FAILURE,
  MEMBERSHIP_SUCCESS,
  MEMBERSHIP_FAILURE,
  GET_ALL_FRANCHISES_FAILURE,
  GET_FRANCHISE_DETAILS_FAILURE,
  GET_FILTERED_FRANCHISES_FAILURE,
  SUBMIT_FRANCHISE_SUCCESS,
  SUBMIT_FRANCHISE_FAILURE,
  GET_FRANCHISE_TO_EDIT_FAILURE,
  EDIT_FRANCHISE_SUCCESS,
  EDIT_FRANCHISE_FAILURE
} from '../../constants'

export default (state = { toast: null }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case SIGN_IN_FAILURE:
      return { ...state, toast: payload }
    case SIGN_UP_SUCCESS:
      return { ...state, toast: payload.toast }
    case SIGN_UP_FAILURE:
      return { ...state, toast: payload }
    case GET_PROFILE_FAILURE:
      return { ...state, toast: payload }
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, toast: payload }
    case UPDATE_PROFILE_FAILURE:
      return { ...state, toast: payload }
    case GET_BILLING_INFO_FAILURE:
      return { ...state, toast: payload }
    case SUBMIT_BILLING_INFO_SUCCESS:
      return { ...state, toast: payload.toast }
    case SUBMIT_BILLING_INFO_FAILURE:
      return { ...state, toast: payload }
    case UPDATE_BILLING_INFO_SUCCESS:
      return { ...state, toast: payload }
    case UPDATE_BILLING_INFO_FAILURE:
      return { ...state, toast: payload }
    case GET_ALL_POSTS_FAILURE:
      return { ...state, toast: payload }
    case GET_ALL_FRANCHISES_FAILURE:
      return { ...state, toast: payload }
    case GET_FILTERED_POSTS_FAILURE:
      return { ...state, toast: payload }
    case GET_FILTERED_FRANCHISES_FAILURE:
      return { ...state, toast: payload }
    case GET_POST_DETAILS_FAILURE:
      return { ...state, toast: payload }
    case GET_FRANCHISE_DETAILS_FAILURE:
      return { ...state, toast: payload }
    case SUBMIT_POST_SUCCESS:
      return { ...state, toast: payload.toast }
    case SUBMIT_POST_FAILURE:
      return { ...state, toast: payload }
    case SUBMIT_FRANCHISE_SUCCESS:
      return { ...state, toast: payload.toast }
    case SUBMIT_FRANCHISE_FAILURE:
      return { ...state, toast: payload }
    case GET_OWN_POSTS_FAILURE:
      return { ...state, toast: payload }
    case GET_POST_TO_EDIT_FAILURE:
      return { ...state, toast: payload }
    case GET_FRANCHISE_TO_EDIT_FAILURE:
      return { ...state, toast: payload }
    case EDIT_POST_SUCCESS:
      return { ...state, toast: payload.toast }
    case EDIT_POST_FAILURE:
      return { ...state, toast: payload }
    case EDIT_FRANCHISE_SUCCESS:
      return { ...state, toast: payload.toast }
    case EDIT_FRANCHISE_FAILURE:
      return { ...state, toast: payload }
    case MEMBERSHIP_SUCCESS:
      return { ...state, toast: payload.toast }
    case MEMBERSHIP_FAILURE:
      return { ...state, toast: payload }
    default:
      return state;
  }
};

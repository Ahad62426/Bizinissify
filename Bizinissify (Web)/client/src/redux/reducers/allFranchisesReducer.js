import {
  GET_ALL_FRANCHISES,
  GET_ALL_FRANCHISES_SUCCESS,
  GET_ALL_FRANCHISES_FAILURE,
  GET_FRANCHISE_DETAILS,
  GET_FRANCHISE_DETAILS_SUCCESS,
  GET_FRANCHISE_DETAILS_FAILURE,
  SUBMIT_FRANCHISE,
  SUBMIT_FRANCHISE_SUCCESS,
  SUBMIT_FRANCHISE_FAILURE,
  GET_FRANCHISE_TO_EDIT,
  GET_FRANCHISE_TO_EDIT_SUCCESS,
  GET_FRANCHISE_TO_EDIT_FAILURE,
  EDIT_FRANCHISE,
  EDIT_FRANCHISE_SUCCESS,
  EDIT_FRANCHISE_FAILURE,
  GET_FILTERED_FRANCHISES,
  GET_FILTERED_FRANCHISES_SUCCESS,
  GET_FILTERED_FRANCHISES_FAILURE
} from '../../constants'

export default (state = { loading: false }, { type, payload }) => {
  switch (type) {
    case GET_ALL_FRANCHISES:
      return { ...state, loading: true }
    case GET_ALL_FRANCHISES_SUCCESS:
      return { ...state, loading: false, franchises: payload.franchises }
    case GET_ALL_FRANCHISES_FAILURE:
      return { ...state, loading: false, franchises: null}
    case GET_FILTERED_FRANCHISES:
      return { ...state, loading: true }
    case GET_FILTERED_FRANCHISES_SUCCESS:
      return { ...state, loading: false, franchises: payload.franchises }
    case GET_FILTERED_FRANCHISES_FAILURE:
      return { ...state, loading: false, franchises: null}
    case GET_FRANCHISE_DETAILS:
      return { ...state, loading: true }
    case GET_FRANCHISE_DETAILS_SUCCESS:
      return { ...state, loading: false, franchiseDetails: payload.franchiseDetails, sellerDetails: payload.sellerDetails }
    case GET_FRANCHISE_DETAILS_FAILURE:
      return { ...state, loading: false }
    case SUBMIT_FRANCHISE:
      return { ...state, loading: true, submittedFranchise: null }
    case SUBMIT_FRANCHISE_SUCCESS:
      return { ...state, loading: false, submittedFranchise: payload.submittedFranchise }
    case SUBMIT_FRANCHISE_FAILURE:
      return { ...state, loading: false }
    case GET_FRANCHISE_TO_EDIT:
      return { ...state, loading: true }
    case GET_FRANCHISE_TO_EDIT_SUCCESS:
      return { ...state, loading: false, franchiseToEdit: payload.franchiseToEdit }
    case GET_FRANCHISE_TO_EDIT_FAILURE:
      return { ...state, loading: false, franchiseToEdit: null}
    case EDIT_FRANCHISE:
      return { ...state, submitting: true }
    case EDIT_FRANCHISE_SUCCESS:
      return { ...state, submitting: false, franchiseToEdit: payload.franchiseToEdit }
    case EDIT_FRANCHISE_FAILURE:
      return { ...state, submitting: false}
    default:
      return state;
  }
};

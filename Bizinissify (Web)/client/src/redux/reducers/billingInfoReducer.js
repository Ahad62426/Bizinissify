import { GET_BILLING_INFO, GET_BILLING_INFO_SUCCESS, GET_BILLING_INFO_FAILURE, SUBMIT_BILLING_INFO, SUBMIT_BILLING_INFO_SUCCESS, SUBMIT_BILLING_INFO_FAILURE } from '../../constants'

export default (state = { loading: false, submitting: false }, { type, payload }) => {
  switch (type) {
    case GET_BILLING_INFO:
      return { ...state, loading: true }
    case GET_BILLING_INFO_SUCCESS:
      return { ...state, loading: false, billingInfo: payload.billingInfo }
    case GET_BILLING_INFO_FAILURE:
      return { ...state, loading: false }
    case SUBMIT_BILLING_INFO:
      return { ...state, submitting: true }
    case SUBMIT_BILLING_INFO_SUCCESS:
      return { ...state, submitting: false, billingInfo: payload.billingInfo }
    case SUBMIT_BILLING_INFO_FAILURE:
      return { ...state, submitting: false }
    default:
      return state;
  }
};

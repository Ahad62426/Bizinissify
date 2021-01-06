import { SHOW_MEMBERSHIP, HIDE_MEMBERSHIP, MEMBERSHIP, MEMBERSHIP_SUCCESS, MEMBERSHIP_FAILURE } from '../../constants'

export default (state = { membershipDisplay: 'none', loading: false }, { type, payload }) => {
  switch (type) {
    case SHOW_MEMBERSHIP:
      return { ...state, membershipDisplay: 'block', selectedMembership: payload.membership }
    case HIDE_MEMBERSHIP:
      return { ...state, membershipDisplay: 'none' }
    case MEMBERSHIP:
      return { ...state, loading: true }
    case MEMBERSHIP_SUCCESS:
      return { ...state, membershipDisplay: 'none', loading: false }
    case MEMBERSHIP_FAILURE:
      return { ...state, loading: false }
    default:
      return state;
  }
};

import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAILURE,
  SUBMIT_POST,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE,
  GET_OWN_POSTS,
  GET_OWN_POSTS_SUCCESS,
  GET_OWN_POSTS_FAILURE,
  GET_POST_TO_EDIT,
  GET_POST_TO_EDIT_SUCCESS,
  GET_POST_TO_EDIT_FAILURE,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  GET_FILTERED_POSTS,
  GET_FILTERED_POSTS_SUCCESS,
  GET_FILTERED_POSTS_FAILURE
} from '../../constants'

export default (state = { loading: false }, { type, payload }) => {
  switch (type) {
    case GET_ALL_POSTS:
      return { ...state, loading: true }
    case GET_ALL_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload.posts }
    case GET_ALL_POSTS_FAILURE:
      return { ...state, loading: false, posts: null}
    case GET_FILTERED_POSTS:
      return { ...state, loading: true }
    case GET_FILTERED_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload.posts }
    case GET_FILTERED_POSTS_FAILURE:
      return { ...state, loading: false, posts: null}
    case GET_OWN_POSTS:
      return { ...state, loading: true }
    case GET_OWN_POSTS_SUCCESS:
      return { ...state, loading: false, ownPosts: payload.ownPosts }
    case GET_OWN_POSTS_FAILURE:
      return { ...state, loading: false, ownPosts: null}
    case GET_POST_DETAILS:
      return { ...state, loading: true }
    case GET_POST_DETAILS_SUCCESS:
      return { ...state, loading: false, postDetails: payload.postDetails, sellerDetails: payload.sellerDetails }
    case GET_POST_DETAILS_FAILURE:
      return { ...state, loading: false }
    case SUBMIT_POST:
      return { ...state, loading: true, submittedPost: null }
    case SUBMIT_POST_SUCCESS:
      return { ...state, loading: false, submittedPost: payload.submittedPost }
    case SUBMIT_POST_FAILURE:
      return { ...state, loading: false }
    case GET_POST_TO_EDIT:
      return { ...state, loading: true }
    case GET_POST_TO_EDIT_SUCCESS:
      return { ...state, loading: false, postToEdit: payload.postToEdit }
    case GET_POST_TO_EDIT_FAILURE:
      return { ...state, loading: false, postToEdit: null}
    case EDIT_POST:
      return { ...state, submitting: true }
    case EDIT_POST_SUCCESS:
      return { ...state, submitting: false, postToEdit: payload.postToEdit }
    case EDIT_POST_FAILURE:
      return { ...state, submitting: false}
    default:
      return state;
  }
};

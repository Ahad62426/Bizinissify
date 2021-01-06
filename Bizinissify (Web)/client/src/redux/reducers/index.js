import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import sigUpReducer from './sigUpReducer';
import membershipReducer from './membershipReducer';
import sessionReducer from './sessionReducer';
import toastReducer from './toastReducer';
import billingInfoReducer from './billingInfoReducer';
import allPostsReducer from './allPostsReducer';
import allFranchisesReducer from './allFranchisesReducer';

export default combineReducers({
    signInReducer,
    sigUpReducer,
    membershipReducer,
    sessionReducer,
    toastReducer,
    billingInfoReducer,
    allPostsReducer,
    allFranchisesReducer
});

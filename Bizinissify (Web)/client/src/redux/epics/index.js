import { combineEpics } from 'redux-observable';
import { signInEpic } from './signInEpic'
import { signUpEpic } from './signUpEpic'
import { profileEpic } from './profileEpic'
import { updateProfileEpic } from './updateProfileEpic'
import { billingInfoEpic } from './billingInfoEpic'
import { submitBillingInfoEpic } from './submitBillingInfoEpic'
import { updateBillingInfoEpic } from './updateBillingInfoEpic'
import { getAllPostsEpic } from './getAllPostsEpic'
import { getAllFranchisesEpic } from './getAllFranchisesEpic'
import { getFilteredPostsEpic } from './getFilteredPostsEpic'
import { getPostDetailsEpic } from './getPostDetailsEpic'
import { getFranchiseDetailsEpic } from './getFranchiseDetailsEpic'
import { submitPostEpic } from './submitPostEpic'
import { submitFranchiseEpic } from './submitFranchiseEpic'
import { getOwnPostsEpic } from './getOwnPostsEpic'
import { getPostToEditEpic } from './getPostToEditEpic'
import { getFranchiseToEditEpic } from './getFranchiseToEditEpic'
import { editPostEpic } from './editPostEpic'
import { editFranchiseEpic } from './editFranchiseEpic'
import { membershipEpic } from './membershipEpic'

export const epics = combineEpics(
    signInEpic.signIn,
    signUpEpic.signUp,
    profileEpic.profile,
    updateProfileEpic.updateProfile,
    billingInfoEpic.billingInfo,
    submitBillingInfoEpic.submitBillingInfo,
    updateBillingInfoEpic.updateBillingInfo,
    getAllPostsEpic.getAllPosts,
    getAllFranchisesEpic.getAllFranchises,
    getFilteredPostsEpic.getFilteredPosts,
    getPostDetailsEpic.getPostDetails,
    getFranchiseDetailsEpic.getFranchiseDetails,
    submitPostEpic.submitPost,
    submitFranchiseEpic.submitFranchise,
    getOwnPostsEpic.getOwnPosts,
    getPostToEditEpic.getPostToEdit,
    getFranchiseToEditEpic.getFranchiseToEdit,
    editPostEpic.editPost,
    editFranchiseEpic.editFranchise,
    membershipEpic.membership
);

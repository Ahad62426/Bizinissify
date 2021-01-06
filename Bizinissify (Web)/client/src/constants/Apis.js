export const LOCAL_URL = 'http://localhost:8000/'
export const PUBLIC_URL = 'https://bizinissify.herokuapp.com/'
export const BASE_URL = PUBLIC_URL

export const API_ENDPOINTS = {
    createAccount: 'createAccount',
    getProfile: 'getProfile',
    updateProfile: 'updateProfile',
    addBillingInfo: 'addBillingInfo',
    getBillingInfo: 'getBillingInfo',
    updateBillingInfo: 'updateBillingInfo',
    getAllPosts: 'getAllPosts',
    getFilteredPosts: 'getFilteredPosts',
    getPostDetails: 'getPostDetails',
    addPost: 'addPost',
    getOwnPosts: 'getOwnPosts',
    getPostToEdit: 'getPostToEdit',
    editPost: 'editPost',
    getAllfranchises: 'getAllfranchises',
    getFilteredFranchises: 'getFilteredFranchises',
    getFranchiseDetails: 'getFranchiseDetails',
    addFranchise: 'addFranchise',
    getOwnFranchises: 'getOwnFranchises',
    getFranchiseToEdit: 'getFranchiseToEdit',
    editFranchise: 'editFranchise',
    membershipPayment: 'stripe/charge'
}
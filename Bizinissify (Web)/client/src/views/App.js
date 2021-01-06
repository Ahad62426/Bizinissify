import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications';

import firebase from '../services/firebase'

import { customisedAction } from '../redux/actions'
import { SET_SESSION, RESET_SESSION } from '../constants/App'

import Header from './Header'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Checkout from './Checkout'
import Footer from './Footer'

import Home from './Home'
import AllPosts from './AllPosts'
import AllFranchises from './AllFranchises'
import PostDetails from './AllPosts/PostDetails'
import FranchiseDetails from './AllFranchises/FranchiseDetails'
import AddPost from './AllPosts/AddPost'
import AddFranchise from './AllFranchises/AddFranchise'
import EditPost from './AllPosts/EditPost'
import EditFranchise from './AllFranchises/EditFranchise'
import Membership from './Membership'
import Profile from './Profile'
import NoRoute from './NoRoute'
import './styles.css'

export default function App() {

  const user = useSelector(({ sessionReducer }) => sessionReducer.user)
  const checkingSession = useSelector(({ sessionReducer }) => sessionReducer.checkingSession)
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.isInitialized().then(() => {
        if (firebase.getCurrentUser())
            dispatch(customisedAction(SET_SESSION, firebase.getCurrentUser()))
        else
            dispatch(customisedAction(RESET_SESSION, firebase.getCurrentUser()))
    })
  }, [dispatch])

const ProtectedRoute = ({ component: Component, ...rest }) => (
   <Route {...rest} render={(props) => (
    !!user === true ? 
         <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location.pathname } }} />
   )} />
);

    return !checkingSession ? (
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}>
            <Router>
                <Header />
                <SignIn />
                <SignUp />
                <Checkout />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/allBusiness' component={AllPosts} />
                    <Route exact path='/allFranchises' component={AllFranchises} />
                    <Route exact path='/postDetails' component={PostDetails} />
                    <Route exact path='/franchiseDetails' component={FranchiseDetails} />
                    <ProtectedRoute path='/membership' component={Membership} />
                    <ProtectedRoute path='/profile' component={Profile} />
                    <ProtectedRoute path='/sellBusiness' component={AddPost} />
                    <ProtectedRoute path='/sellFranchise' component={AddFranchise} />
                    <ProtectedRoute path='/editPost' component={EditPost} />
                    <ProtectedRoute path='/editFranchise' component={EditFranchise} />
                    <Route component={NoRoute} />
                </Switch>
                <Footer />
            </Router>
        </ToastProvider>
    ) : 
    <div className='loaderContainer'>
        <div className='loaderInnerContainer'>
        <img src={require('../assets/logo/logo_large.svg')} className="Logo" alt="logo" />
        </div>
    </div>
}

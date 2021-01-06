import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import firebase from '../../services/firebase'

import { customisedAction } from '../../redux/actions'
import { SHOW_SIGN_IN, RESET_SESSION, SET_TOAST, RESET_TOAST } from '../../constants/App'

import './styles.css'

function Header(props) {

  const [transparent, setTransparent] = useState('')

  const user = useSelector(({ sessionReducer }) => sessionReducer.user)
  const profile = useSelector(({ sessionReducer }) => sessionReducer.profile)
  const fetchingProfile = useSelector(({ sessionReducer }) => sessionReducer.fetchingProfile)
  const toast = useSelector(({ toastReducer }) => toastReducer.toast)
  const dispatch = useDispatch()
  const { addToast } = useToasts()

  useEffect(() => {
    const { pathname } = props.location
    setTransparent(pathname === '/')

    if (toast) {
      addToast(toast.message, { appearance: toast.type })
      dispatch(customisedAction(RESET_TOAST))
    }
  }, [props.location, toast, addToast, dispatch])

  async function logout() {
    await firebase.logout()
    props.history.replace('/')
    dispatch(customisedAction(RESET_SESSION, null))
    dispatch(customisedAction(SET_TOAST, { message: 'Logged Out!', type: 'success' }))
  }

  return (
    <div className={transparent ? "Header" : "WhiteHeader LightShadow"}>
      <div className="LogoContainer">
        <Link to='/'>
          <img src={transparent ?
            require('../../assets/logo/logo_white.svg')
            : require('../../assets/logo/logo.svg')
          } className="Logo" alt="logo" />
        </Link>
      </div>
      <div className="TabsContainer">
        <Link to='/allBusiness' style={styles.TabsLinks}>
          <p className={transparent ? "Tabs" : "TabsDark"}>Buy a Business</p>
        </Link>
        <Link to='/allFranchises' style={styles.TabsLinks}>
          <p className={transparent ? "Tabs" : "TabsDark"}>Buy a Franchise</p>
        </Link>
        <Link to='/sellBusiness' style={styles.TabsLinks}>
          <p className={transparent ? "Tabs" : "TabsDark"}>Sell a Business</p>
        </Link>
        <Link to='/sellFranchise' style={styles.TabsLinks}>
          <p className={transparent ? "Tabs" : "TabsDark"}>Sell a Franchise</p>
        </Link>
        <Link to='/membership' style={styles.TabsLinks}>
          <p className={transparent ? "Tabs" : "TabsDark"}>Membership</p>
        </Link>
        {user ?
          <Link to='' style={styles.TabsLinks}>
            <p onClick={() => logout()} className={transparent ? "Tabs" : "TabsDark"}>Logout</p>
          </Link>
          : null
        }
      </div>
      {!user ?
        <div className="HeaderLoginButtonContainer">
            <button
              className={transparent ? "HeaderLoginButton" : "HeaderLoginButtonOrange"}
              onClick={() => dispatch(customisedAction(SHOW_SIGN_IN))}>
              <p className="HeaderLoginText" style={{ color: transparent ? 'white' : 'orange' }}>Login</p>
            </button>
        </div>
        : <div className="LogoContainer" style={{ alignItems: 'center' }}>
          <Link to='/profile'>
            {profile && profile.profileImage ?
              <div style={{ width: '30%', backgroundColor: 'black', borderRadius: '50px', overflow: 'hidden' }}>
                <img style={{ width: '100%' }} src={profile.profileImage} className="Logo" alt="profileImage" />
              </div>
              : <img src={require(`../../assets/SVG/account_dashboard${fetchingProfile ? '' : '_fill'}.svg`)} className="Logo" alt="profileImage" />
            }
          </Link>
        </div>
      }
    </div>
  )
}

const styles = {
  TabsLinks: {
    textDecoration: 'none',
    margin: '2.5%'
  },
  LoginText: {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: '0 0 10px #719ECE'
  }
}

export default withRouter(Header)

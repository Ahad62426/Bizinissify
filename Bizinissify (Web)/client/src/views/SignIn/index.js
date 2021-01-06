import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { withRouter, Link } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { HIDE_SIGN_IN, SHOW_SIGN_UP, SIGN_IN } from '../../constants/App'

import { Modal, AuthContainer, Input, OrangeButton, TextButton } from '../../components'
import './styles.css'

function SignIn(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signInDisplay = useSelector(({ signInReducer }) => signInReducer.signInDisplay)
  const to = useSelector(({ signInReducer }) => signInReducer.to)
  const dispatch = useDispatch()

  async function signIn() {
    dispatch(customisedAction(SIGN_IN, { email, password, to, props }))
    setPassword('')
  }

  return (
    <Modal display={signInDisplay} close={true}>
      <AuthContainer onClick={() => dispatch(customisedAction(HIDE_SIGN_IN))}>
        <div className="AuthInnerContainer">
          <img src={require('../../assets/logo/logo_large.svg')} alt="logo" />
          <div className="LoginContainer">
            <div className="LoginSection">
              <p className="AuthTitle"><span>Login</span></p>
              <div className="AuthInputContainer">
                <Input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={ev => setEmail(ev.target.value)}
                />
                <Input
                  type="password" 
                  placeholder="Enter Password"
                  value={password}
                  onChange={ev => setPassword(ev.target.value)}
                />
                <div className="ForgotPasswordContainer">
                  <Link to=''><p className="ForgotPassword">Forgot password?</p></Link>
                </div>
                <div className="AuthButtonContainer">
                  <OrangeButton 
                    onClick={() => signIn()}
                    text="Login"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthContainer>
      <div className="ModalBottomSection">
        <div className="ModalBottomButtons" 
          style={{
            justifyContent: 'flex-end',
            borderRight: '1px solid rgba(0, 0, 0, 0.3)'
          }}>
          <TextButton
            className="BlackTextButton"
            text="Login"
          />
        </div>
        <div className="ModalBottomButtons">
          <TextButton
            className="OrangeTextButton"
            text="Signup"
            onClick={() => {
              dispatch(customisedAction(HIDE_SIGN_IN))
              dispatch(customisedAction(SHOW_SIGN_UP))
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(SignIn)

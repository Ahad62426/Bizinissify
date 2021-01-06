import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { withRouter, Link } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { HIDE_SIGN_UP, SHOW_SIGN_IN, SIGN_UP } from '../../constants/App'

import { Modal, AuthContainer, Input, OrangeButton, TextButton } from '../../components'
import './styles.css'

function SignUp(props) {

  const [name, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [buyerNews, setBuyerNews] = useState(0)

  const signUpDisplay = useSelector(({ sigUpReducer }) => sigUpReducer.signUpDisplay)
  const to = useSelector(({ signInReducer }) => signInReducer.to)
  const dispatch = useDispatch()

  async function signUp() {
    dispatch(customisedAction(SIGN_UP, { name, lastName, email, password, buyerNews, to, props }))
    setPassword('')
  }

  return (
    <Modal display={signUpDisplay} close={true}>
      <AuthContainer onClick={() => dispatch(customisedAction(HIDE_SIGN_UP))}>
        <div className="SignUpContainer">
          <div className="SignUpSections"
            style={{
              borderRight: '0.5px solid rgba(0, 0, 0, 0.3)'
            }}>
            <div className="SignUpSectionLeft">
              <img src={require('../../assets/logo/logo_large.svg')} className="LogoLarge" alt="logo" />
              <p className="SignUpSectionLeftTitle">Free services for members:</p>
              <div className="TextWithOrangeArrowContainer">
                <img src={require('../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
                <p className="TextWithOrangeArrow">Get the Guide to Selling Your Small Business</p>
              </div>
              <div className="TextWithOrangeArrowContainer">
                <img src={require('../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
                <p className="TextWithOrangeArrow">Set-up New email alerts</p>
              </div>
              <div className="TextWithOrangeArrowContainer">
                <img src={require('../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
                <p className="TextWithOrangeArrow">Save Your Searches</p>
              </div>
              <div className="TextWithOrangeArrowContainer">
                <img src={require('../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
                <p className="TextWithOrangeArrow">Save Listings</p>
              </div>
              <div className="TextWithOrangeArrowContainer">
                <img src={require('../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
                <p className="TextWithOrangeArrow">Contact Business for Sale Sellers</p>
              </div>
              <div className="TextWithOrangeArrowContainer">
                <img src={require('../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
                <p className="TextWithOrangeArrow">Optionally Receive the BizBuySell BuyerNewsletter</p>
              </div>
            </div>
          </div>
          <div className="SignUpSections"
            style={{
              borderLeft: '0.5px solid rgba(0, 0, 0, 0.3)'
            }}>
              <div className="SignUpSectionRight">
                <p className="AuthTitle"><span>Create Account</span></p>
                <div className="AuthInputContainer">
                  <Input
                    type="text"
                    placeholder="Enter First Name"
                    value={name}
                    onChange={ev => setFirstName(ev.target.value)}
                  />
                  <Input
                    type="text" 
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={ev => setLastName(ev.target.value)}
                  />
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
                  <div className="BusinessLetterTextContainer">
                    <input 
                      defaultChecked={buyerNews}
                      type="checkbox"
                      onChange={() => setBuyerNews(!buyerNews)}
                    />
                    <p className="BusinessLetterText">Yes, send me the Buyer Newsletter for popular businesses, tips & email promotions.</p>
                  </div>
                  <div className="AuthButtonContainer">
                    <OrangeButton 
                      onClick={() => signUp()}
                      text="Create Account"
                      />
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="SignUpBottomTextContainer">
          <p className="SignUpBottomText">
            By clicking the button, you agree to BizBuySell’s&nbsp;
            <Link to='' style={{ textDecoration: 'none' }} ><span className="SignUpBottomTextOrange">Terms of Use</span></Link>
              &nbsp;and&nbsp;
            <Link to='' style={{ textDecoration: 'none' }}><span className="SignUpBottomTextOrange">Privacy Policy</span></Link>
          </p>
        </div>
      </AuthContainer>
      <div className="ModalBottomSection">
        <div className="ModalBottomButtons" 
          style={{
            justifyContent: 'flex-end',
            borderRight: '1px solid rgba(0, 0, 0, 0.3)'
          }}>
          <TextButton
            className="OrangeTextButton"
            text="Login"
            onClick={() => {
              dispatch(customisedAction(HIDE_SIGN_UP))
              dispatch(customisedAction(SHOW_SIGN_IN))
            }}
          />
        </div>
        <div className="ModalBottomButtons">
          <TextButton
            className="BlackTextButton"
            text="Signup"
          />
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(SignUp)

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Title, ProfileInputs, OrangeButton } from '../../../../components'

import { customisedAction } from '../../../../redux/actions'
import { SET_TOAST, UPDATE_PROFILE } from '../../../../constants/App'

function MyAccount(props) {

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [altEmail, setAltEmail] = useState('')
  const [keysToUpdate, setKeysToUpdate] = useState({})

  const profile = useSelector(({ sessionReducer }) => sessionReducer.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile) {
      setName(profile.name)
      setLastName(profile.lastName)
      setEmail(profile.email)
      setAltEmail(profile.altEmail)
    }
  }, [profile])

  function addKeysToUpdate (key, value, callback) {
    const tempObject = keysToUpdate
    if (value === profile[key]) delete tempObject[key]
    else tempObject[key] = value
    setKeysToUpdate(tempObject)
    return callback
  }

  function updateProfile () {
    if (!name) {
      setName(profile.name)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'First Name can\'t be blank!', type: 'warning'
      }))
    }
    if (altEmail === profile.email)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'Primary and Alternate email can\'t be same!', type: 'warning'
      }))
    return dispatch(customisedAction(UPDATE_PROFILE, keysToUpdate))
  }

  return (
    <div style={{ flex: 1 }}>
      <Title text="My Account" style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 'bold' }} />
      <p className="ProfileRightSubText">Is My Information Safe?</p>
      <p className="ProfileRightSubText" style={{ fontWeight: 100 }}>Absolutely. We work very hard to earn and keep your trust. Bizinissify will never send you spam or sell your personal information. It’s all in our
        &nbsp;
        <span className="Orange">
          Privacy Policy.
        </span>
      </p>
      <div className="ProfileInputsContainer">
        <ProfileInputs
          placeholder="Enter Your First Name"
          title="First Name"
          value={name}
          onChange={ev => addKeysToUpdate('name', ev.target.value, setName(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your Last Name"
          title="Last Name"
          value={lastName}
          onChange={ev => addKeysToUpdate('lastName', ev.target.value, setLastName(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your Primary Email"
          title="Email (Primary)"
          value={email}
          onClick={() => dispatch(customisedAction(SET_TOAST, { message: 'Unable to edit primary email!', type: 'warning'}))}
        />
        <ProfileInputs
          placeholder="Enter Your Alternate Email"
          title="Email (Alternate)"
          value={altEmail}
          onChange={ev => addKeysToUpdate('altEmail', ev.target.value, setAltEmail(ev.target.value))}
        />
        <ProfileInputs
          type="password"
          placeholder="Enter Your Password"
          title="Change Password"
          value="----------"
          onClick={() => dispatch(customisedAction(SET_TOAST, { message: 'Unable to change password', type: 'warning'}))}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <OrangeButton
          text="Save Changes"
          disabled={profile 
            && name === profile.name
            && lastName === profile.lastName
            && altEmail === profile.altEmail
          }
          onClick={() => updateProfile()}
        />
      </div>
    </div>
  )
}

export default MyAccount

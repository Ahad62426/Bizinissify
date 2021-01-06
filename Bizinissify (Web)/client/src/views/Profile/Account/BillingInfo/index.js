import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Title, ProfileInputs, OrangeButton } from '../../../../components'

import { customisedAction } from '../../../../redux/actions'
import { SET_TOAST, SUBMIT_BILLING_INFO, UPDATE_BILLING_INFO } from '../../../../constants/App'

function BillingInfo(props) {

  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [streetAddress, setstreetAddress] = useState('')
  const [country, setcountry] = useState('')
  const [city, setcity] = useState('')
  const [zipcode, setzipcode] = useState('')
  const [keysToUpdate, setKeysToUpdate] = useState({})
  const [alwaysEdit, setAlwaysEdit] = useState(true)

  const profile = useSelector(({ sessionReducer }) => sessionReducer.profile)
  const billingInfo = useSelector(({ billingInfoReducer }) => billingInfoReducer.billingInfo)
  const submitting = useSelector(({ billingInfoReducer }) => billingInfoReducer.submitting)
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile && billingInfo === null) {
      setfirstName(profile.name)
      setlastName(profile.lastName)
    }
    if (billingInfo) {
      setfirstName(billingInfo.firstName)
      setlastName(billingInfo.lastName)
      setphoneNumber(billingInfo.phoneNumber)
      setstreetAddress(billingInfo.streetAddress)
      setcountry(billingInfo.country)
      setcity(billingInfo.city)
      setzipcode(billingInfo.zipcode)
    }
    setAlwaysEdit(!submitting)
  }, [profile, billingInfo, submitting])

  function addKeysToUpdate (key, value, callback) {
    if (billingInfo) {
      const tempObject = keysToUpdate
      if (value === billingInfo[key]) delete tempObject[key]
      else tempObject[key] = value
      setKeysToUpdate(tempObject)
    }
    return callback
  }

  function updateBillingInfo () {
    if (!firstName) {
      setfirstName(billingInfo.firstName)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'First Name can\'t be blank!', type: 'warning'
      }))
    }
    if (!lastName) {
      setlastName(billingInfo.lastName)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'Last Name can\'t be blank!', type: 'warning'
      }))
    }
    if (!phoneNumber) {
      setphoneNumber(billingInfo.phoneNumber)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'Phone Number can\'t be blank!', type: 'warning'
      }))
    }
    if (!streetAddress) {
      setstreetAddress(billingInfo.streetAddress)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'Street Address can\'t be blank!', type: 'warning'
      }))
    }
    if (!country) {
      setcountry(billingInfo.country)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'Country can\'t be blank!', type: 'warning'
      }))
    }
    if (!city) {
      setcity(billingInfo.city)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'City can\'t be blank!', type: 'warning'
      }))
    }
    if (!zipcode) {
      setzipcode(billingInfo.zipcode)
      return dispatch(customisedAction(SET_TOAST, {
        message: 'Zipcode can\'t be blank!', type: 'warning'
      }))
    }
    return dispatch(customisedAction(UPDATE_BILLING_INFO, keysToUpdate))
  }

  function submitBillingInfo () {
    return dispatch(customisedAction(SUBMIT_BILLING_INFO, { firstName, lastName, phoneNumber, streetAddress, country, city, zipcode}))
  }

  return (
    <div style={{ flex: 1 }}>
      <Title text="Billing Information" style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 'bold' }} />
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
          alwaysEdit={alwaysEdit && !billingInfo}
          value={firstName}
          onChange={ev => addKeysToUpdate('firstName', ev.target.value, setfirstName(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your Last Name"
          title="Last Name"
          alwaysEdit={alwaysEdit && !billingInfo}
          value={lastName}
          onChange={ev => addKeysToUpdate('lastName', ev.target.value, setlastName(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your Phone Number"
          title="Phone Number"
          alwaysEdit={alwaysEdit && !billingInfo}
          value={phoneNumber}
          onChange={ev => addKeysToUpdate('phoneNumber', ev.target.value, setphoneNumber(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your Street Address"
          title="Street Address"
          alwaysEdit={alwaysEdit && !billingInfo}
          value={streetAddress}
          onChange={ev => addKeysToUpdate('streetAddress', ev.target.value, setstreetAddress(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your Country"
          title="Country"
          alwaysEdit={alwaysEdit && !billingInfo}
          value={country}
          onChange={ev => addKeysToUpdate('country', ev.target.value, setcountry(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your City"
          title="City"
          alwaysEdit={alwaysEdit && !billingInfo}
          value={city}
          onChange={ev => addKeysToUpdate('city', ev.target.value, setcity(ev.target.value))}
        />
        <ProfileInputs
          placeholder="Enter Your Zip Code"
          title="Zip Postal Code"
          alwaysEdit={alwaysEdit && !billingInfo}
          value={zipcode}
          onChange={ev => addKeysToUpdate('zipcode', ev.target.value, setzipcode(ev.target.value))}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <OrangeButton
          text="Save Changes"
          disabled={((!firstName || !lastName || !phoneNumber || !streetAddress || !country || !city || !zipcode) && !billingInfo)
            || (billingInfo
              && firstName === billingInfo.firstName
              && lastName === billingInfo.lastName
              && phoneNumber === billingInfo.phoneNumber
              && streetAddress === billingInfo.streetAddress
              && country === billingInfo.country
              && city === billingInfo.city
              && zipcode === billingInfo.zipcode
              )
          }
          onClick={() => !billingInfo ? submitBillingInfo() : updateBillingInfo()}
        />
      </div>
    </div>
  )
}

export default BillingInfo

import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import { useDispatch } from "react-redux"

import { customisedAction } from '../../redux/actions'
import { MEMBERSHIP, SET_TOAST } from '../../constants'
import './stripe.scss'

function StripeForm(props) {

  const dispatch = useDispatch()

  async function getMembership(event) {
    event.preventDefault()

    const { token, error } = await props.stripe.createToken()

    const { amount, id } = props.selectedMembership

    if (token) {
      dispatch(customisedAction(MEMBERSHIP, {
        amount: (amount*100).toString().replace('.', ''),
        subscription: id,
        source: token.id,
        receipt_email: 'ahads62426@gmail.com'
      }))
    }
    if (error) dispatch(customisedAction(SET_TOAST, { message: error.message, type: 'error'}))
  }

  return (
      <form className="stripe-form" onSubmit={(event) => getMembership(event)}>
        <label>
          Card details
          <CardNumberElement />
        </label>
        <label>
          Expiration date
          <CardExpiryElement />
        </label>
        <label>
          CVC
          <CardCVCElement />
        </label>
        <div className="AuthButtonContainer">
          <button type="submit" className="OrangeButton">
            <p className="OrangeButtonText">Pay</p>
          </button>
        </div>
        {/* <Input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
        /> */}
      </form>
  )
}

export default injectStripe(StripeForm)

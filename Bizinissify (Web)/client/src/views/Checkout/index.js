import React, { useState, useEffect } from 'react'
import { 
  StripeProvider,
  Elements, 
} from 'react-stripe-elements'
import { useSelector, useDispatch } from "react-redux"
import { withRouter } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { HIDE_MEMBERSHIP } from '../../constants/App'

import { Modal, AuthContainer } from '../../components'
import { loadScript } from '../../helpers/preLoaders'
import StripeForm from './StripeForm'

function Checkout(props) {

  const [stripeLoaded, setStripeLoaded] = useState({})

  const membershipDisplay = useSelector(({ membershipReducer }) => membershipReducer.membershipDisplay)
  const selectedMembership = useSelector(({ membershipReducer }) => membershipReducer.selectedMembership)
  const dispatch = useDispatch()

  useEffect(() => {
    loadScript('https://js.stripe.com/v3/').then(result => setStripeLoaded(result))
  }, [])

  return (
    <Modal display={membershipDisplay} close={true}>
      <AuthContainer style={{ height: '100%' }} onClick={() => dispatch(customisedAction(HIDE_MEMBERSHIP))}>
        <div className="AuthInnerContainer">
          <img src={require('../../assets/logo/logo_large.svg')} alt="logo" />
          <div className="LoginContainer">
            <div className="LoginSection" style={{ border: 'none', marginTop: '-100px' }}>
              {stripeLoaded.successful ?
                  <StripeProvider apiKey="pk_test_51H9xglDKOwc28a4HcSoyZqqJZb2ymy78gfoVuIXzKca6gqkmFZIvWz4xmNuZwpoXZ2NBZmSuM1VWgqavp44NKUPj00MwfbALOu">
                    <Elements>
                      <StripeForm selectedMembership={selectedMembership} />
                    </Elements>
                  </StripeProvider>
                : null
              }
            </div>
          </div>
        </div>
      </AuthContainer>
    </Modal>
  )
}

export default withRouter(Checkout)

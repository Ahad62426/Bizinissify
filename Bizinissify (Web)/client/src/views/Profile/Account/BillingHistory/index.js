import React from 'react'

import { Title } from '../../../../components'

function BillingHistory(props) {

  return (
    <div style={{ width: '100%' }}>
      <Title text="Billing History" style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 'bold' }} />
      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <p style={{ flex: 1, padding: '10px 30px' }}>Product</p>
        <p style={{ padding: '10px 30px' }}>Amount</p>
        <p style={{ padding: '10px 30px' }}>Tax</p>
        <p style={{ padding: '10px 30px' }}>Card Use</p>
        <p style={{ padding: '10px 30px' }}>Date</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '70px 0px' }}>
        <img src={require('../../../../assets/SVG/no_billing_history.svg')} alt="no_billing_history" />
      </div>
    </div>
  )
}

export default BillingHistory

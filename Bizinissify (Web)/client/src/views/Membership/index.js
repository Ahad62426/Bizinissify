import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'
import { memberships, MORE_LIGHT_ORANGE, SHOW_MEMBERSHIP, LIGHT_ORANGE } from '../../constants'
import { Title, OrangeButton, WhiteButton } from '../../components'
import { customisedAction } from '../../redux/actions'

function Membership(props) {

  const profile = useSelector(({ sessionReducer }) => sessionReducer.profile)
  
  const dispatch = useDispatch()
  
  const renderMemberships = () => {
    return memberships.map((membership) => {
      const details = membership.details.split('\n')
      return (
        <div className="LightShadow" key={membership.id}
          style={{ backgroundColor: profile && profile.subscription === membership.id ? LIGHT_ORANGE : MORE_LIGHT_ORANGE, padding: '15px', borderRadius: '10px' }}>
            <p style={{ textAlign: 'center', width: '100%', marginBottom: '20px', fontSize: '20px', color: 'orange' }}>{membership.title}</p>
            <p style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>Duration:</p>
            <p style={{ marginTop: '5px', fontSize: '14px' }}>{membership.duration}</p>
            <p style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>Posting Limit:</p>
            <p style={{ marginTop: '5px', fontSize: '14px' }}>{membership.postsLimit || 'Unlimited'}</p>
            <p style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>Contact Limit:</p>
            <p style={{ marginTop: '5px', fontSize: '14px' }}>{membership.contactsLimit || 'Unlimited'}</p>
            <p style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>Price:</p>
            <p style={{ marginTop: '5px', fontSize: '14px' }}>{'$ ' + membership.amount}</p>
            <p style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>Details:</p>
            {details.map((detail) => {
              return <div key={detail} style={{ marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
                <img src={require('../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
                <p style={{ marginLeft: '7px', fontSize: '14px' }}>{detail}</p>
              </div>
            })}
            <div style={{ marginTop: '20px' }}>
              {profile && profile.subscription === membership.id ?
                <WhiteButton
                  text="Cancel"
                  onClick={() => null}
                /> : <OrangeButton
                  text="Select"
                  onClick={() => dispatch(customisedAction(SHOW_MEMBERSHIP, { membership }))}
                />
              }
            </div>
          </div>
      )
    })
  }

  return (
    <div className="Container">
      <div className="Body">
        <div><Title text='Membership Plans' /></div>
        <div className="GridColumns" style={{ width: '100%', display: 'grid', marginTop: '10px', fontFamily: 'sans-serif' }}>
          {memberships && renderMemberships()}
        </div>
      </div>
    </div>
  )
}

export default Membership

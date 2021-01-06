import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProfileSectionsContainer } from '../../../components'

import MyAccount from './MyAccount'
import BillingInfo from './BillingInfo'
import BillingHistory from './BillingHistory'

import { customisedAction } from '../../../redux/actions'
import { GET_BILLING_INFO } from '../../../constants/App'

function Account(props) {

  const [selectedTab, setSelectedTab] = useState('myAccount')
  const [showBillingOptions, setShowBillingOptions] = useState(false)
  const [selectedSubTab, setSelectedSubTab] = useState('')

  const billingInfo = useSelector(({ billingInfoReducer }) => billingInfoReducer.billingInfo)
  const dispatch = useDispatch()

  const renderComponent = () => {
    switch (selectedTab) {
      case 'myAccount':
        return <MyAccount />
      case 'billingInfo': {
        switch (selectedSubTab) {
          case 'billingHistory':
            return <BillingHistory />
          default:
            return <BillingInfo />
        }
      }
      default:
        return <div />
    }
  }

  return (
    <ProfileSectionsContainer>
      <div className="ProfileLeftSectionContainer">
        <div className="ProfileLeftSections ProfileLeftSectionsSeparator">
          <p className={`ProfileLeftSectionsText ${selectedTab === 'myAccount' ? 'selectedTab' : ''}`}
            onClick={() => {
              setSelectedTab('myAccount')
              setSelectedSubTab('')
            }}>
            My Account
          </p>
        </div>
        <div className="ProfileLeftSections">
          <p className={`ProfileLeftSectionsText ${selectedTab === 'billingInfo' ? 'selectedTab' : ''}`}
            onClick={() => {
              if (!showBillingOptions && !selectedSubTab) {
                if (billingInfo === undefined) dispatch(customisedAction(GET_BILLING_INFO))
                setSelectedTab('billingInfo')
              }
              if (selectedTab !== 'billingInfo') setShowBillingOptions(!showBillingOptions)
              setSelectedSubTab('')
            }}>
            My Billing Information
          </p>
          {showBillingOptions ?
            <div className="ProfileLeftSubSectionsContainer">
              <div className="ProfileLeftSubSection">
                <img className="ProfileLeftSubSectionArrow" src={require('../../../assets/SVG/grey_arrow.svg')} alt="Grey Arrow" />
                <p className={`ProfileLeftSectionsSubText ${selectedSubTab === 'billingHistory' ? 'selectedSubTab' : ''}`}
                  onClick={() => {
                    setSelectedSubTab('billingHistory')
                    setSelectedTab('billingInfo')
                  }}>
                  Billing History
                </p>
              </div>
            </div>
            : null
          }
        </div>
      </div>
      <div className="ProfileRightSectionContainer">
        {renderComponent()}
      </div>
    </ProfileSectionsContainer>
  )
}

export default Account

import React, { useState, useEffect } from 'react'

import { ProfileSectionsContainer } from '../../../components'

import Leads from './Leads'
import MyEmailPreferences from './MyEmailPreferences'

function MessageCentre(props) {

  const [selectedTab, setSelectedTab] = useState('myMailbox')
  const [showMyMailboxOptions, setShowMyMailboxOptions] = useState(true)
  const [selectedSubTab, setSelectedSubTab] = useState('leads')

  const renderComponent = () => {
    switch (selectedTab) {
      case 'myMailbox': {
        switch (selectedSubTab) {
          case 'leads':
            return <Leads chatID={props.chatID} sellerDetails={props.sellerDetails} />
          default:
            return <div />
        }
      }
      case 'myEmailPreferences':
        return <MyEmailPreferences />
      default:
        return <div />
    }
  }

  return (
    <ProfileSectionsContainer>
      <div className="ProfileLeftSectionContainer">
        <div className="ProfileLeftSections ProfileLeftSectionsSeparator">
          <p className={`ProfileLeftSectionsText ${selectedTab === 'myMailbox' ? 'selectedTab' : ''}`}
            onClick={() => {
              if (!showMyMailboxOptions && !selectedSubTab) {
                setSelectedTab('myMailbox')
                setSelectedSubTab('leads')
              }
              if (selectedTab !== 'myMailbox') setShowMyMailboxOptions(!showMyMailboxOptions)
            }}>
            My Mailbox
          </p>
          {showMyMailboxOptions ?
            <div className="ProfileLeftSubSectionsContainer">
              <div className="ProfileLeftSubSection">
                <img className="ProfileLeftSubSectionArrow" src={require('../../../assets/SVG/grey_arrow.svg')} alt="Grey Arrow" />
                <p className={`ProfileLeftSectionsSubText ${selectedSubTab === 'leads' ? 'selectedSubTab' : ''}`}
                  onClick={() => {
                    setSelectedSubTab('leads')
                    setSelectedTab('myMailbox')
                  }}>
                  Leads
                </p>
              </div>
              <div className="ProfileLeftSubSection">
                <img className="ProfileLeftSubSectionArrow" src={require('../../../assets/SVG/grey_arrow.svg')} alt="Grey Arrow" />
                <p className={`ProfileLeftSectionsSubText ${selectedSubTab === 'messagesForSeller' ? 'selectedSubTab' : ''}`}
                  onClick={() => {
                    setSelectedSubTab('messagesForSeller')
                    setSelectedTab('myMailbox')
                  }}>
                  Notifications
                </p>
              </div>
            </div>
            : null
          }
        </div>
        <div className="ProfileLeftSections">
          <p className={`ProfileLeftSectionsText ${selectedTab === 'myEmailPreferences' ? 'selectedTab' : ''}`}
            onClick={() => {
              setSelectedTab('myEmailPreferences')
              setSelectedSubTab('')
            }}>
            My Email Preference
          </p>
        </div>
      </div>
      <div className="ProfileRightSectionContainer">
        {renderComponent()}
      </div>
    </ProfileSectionsContainer>
  )
}

export default MessageCentre

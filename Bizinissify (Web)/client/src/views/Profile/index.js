import React, { useState, useEffect } from 'react'

import Dashboard from './Dashboard'
import Selling from './Selling'
import MessageCentre from './MessageCentre'
import Account from './Account'
import './styles.css'

function Profile(props) {

  const [selectedTab, setSelectedTab] = useState('dashboard')
  const [chatID, setChatID] = useState(null)
  const [sellerDetails, setSellerDetails] = useState(null)

  useEffect(() => {
    const { state } = props.location
    if (state && state.chatID) {
      setChatID(state.chatID)
      setSellerDetails(state.sellerDetails)
      setSelectedTab('msgCenter')
    } 
  }, [props.location])

  const renderComponent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return <Dashboard />
      case 'selling':
        return <Selling />
      case 'msgCenter':
        return <MessageCentre chatID={chatID} sellerDetails={sellerDetails} />
      case 'account':
        return <Account />
      default:
        return <div />
    }
  }

  return (
    <div className="Container">
      <div className="Body">
        <div className="ProfileTabsContainer LightShadow">
          <button className="ProfileTabs"
            onClick={() => setSelectedTab('dashboard')}>
            <img className="ProfileTabIcon" src={selectedTab === 'dashboard' ?
              require('../../assets/SVG/dashboard_fill.svg')
              : require('../../assets/SVG/dashboard.svg')
            } alt="DashboardIcon" />
            <p className="ProfileTabText" style={selectedTab === 'dashboard' ? { fontWeight: 600 } : {}}>Dashboard</p>
          </button>
          <button className="ProfileTabs"
            onClick={() => setSelectedTab('selling')}>
            <img className="ProfileTabIcon" src={selectedTab === 'selling' ?
              require('../../assets/SVG/dollar_dashboard_fill.svg')
              : require('../../assets/SVG/dollar_dashboard.svg')
            } alt="DashboardIcon" />
            <p className="ProfileTabText" style={selectedTab === 'selling' ? { fontWeight: 600 } : {}}>Selling</p>
          </button>
          <button className="ProfileTabs"
            onClick={() => props.history.push('/allBusiness')}>
            <img className="ProfileTabIcon" src={selectedTab === 'searching' ?
              require('../../assets/SVG/search_dashboard_fill.svg')
              : require('../../assets/SVG/search_dashboard.svg')
            } alt="DashboardIcon" />
            <p className="ProfileTabText" style={selectedTab === 'searching' ? { fontWeight: 600 } : {}}>Searching</p>
          </button>
          <button className="ProfileTabs"
            onClick={() => {
              setSelectedTab('msgCenter')
              setChatID(null)
              setSellerDetails(null)
            }}>
            <img className="ProfileTabIcon" src={selectedTab === 'msgCenter' ?
              require('../../assets/SVG/message_dashboard_fill.svg')
              : require('../../assets/SVG/message_dashboard.svg')
            } alt="DashboardIcon" />
            <p className="ProfileTabText" style={selectedTab === 'msgCenter' ? { fontWeight: 600 } : {}}>Message Centre</p>
          </button>
          <button className="ProfileTabs"
            onClick={() => setSelectedTab('account')}>
            <img className="ProfileTabIcon" src={selectedTab === 'account' ?
              require('../../assets/SVG/account_dashboard_fill.svg')
              : require('../../assets/SVG/account_dashboard.svg')
            } alt="DashboardIcon" />
            <p className="ProfileTabText" style={selectedTab === 'account' ? { fontWeight: 600 } : {}}>Account</p>
          </button>
        </div>
        <div className={`ProfileContentContainer ${selectedTab === 'selling' ? '' : 'LightShadow'}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default Profile

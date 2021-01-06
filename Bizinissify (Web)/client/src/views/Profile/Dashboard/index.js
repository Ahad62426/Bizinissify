import React from 'react'
import { useSelector } from 'react-redux'
import { Title } from '../../../components'

function Dashboard(props) {

  const profile = useSelector(({ sessionReducer }) => sessionReducer.profile)

  return (
    <div className="" style={{ padding: '20px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '95%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.3)', padding: '0px 10px 20px 10px', marginBottom: '10px' }}>
        <p style={{ fontSize: '24px', fontFamily: 'sans-serif' }}>
          Welcome Back<span style={{ fontSize: '16px', fontWeight: '300' }}>{profile ? `, ${profile.name}` : null}</span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontFamily: 'sans-serif', marginTop: '20px' }}>
          <div style={{ width: '30%', padding: '15px 0px', border: '0.5px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ padding: '10px', marginBottom: '10px', backgroundColor: 'orange', color: 'white', borderRadius: '5px', fontSize: '28px' }}>75</p>
            <p style={{ fontWeight: '100' }}>New A-Z Listing</p>
          </div>
          <div style={{ width: '30%', padding: '15px 0px', border: '0.5px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ padding: '10px', marginBottom: '10px', backgroundColor: 'orange', color: 'white', borderRadius: '5px', fontSize: '28px' }}>75+</p>
            <p style={{ fontWeight: '100' }}>Recommendation</p>
          </div>
          <div style={{ width: '30%', padding: '15px 0px', border: '0.5px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ padding: '10px', marginBottom: '10px', backgroundColor: 'orange', color: 'white', borderRadius: '5px', fontSize: '28px' }}>04</p>
            <p style={{ fontWeight: '100' }}>Videos to view</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontFamily: 'sans-serif', marginTop: '20px' }}>
          <div style={{ width: '30%', padding: '15px 0px', border: '0.5px solid rgba(0, 0, 0, 0.3)', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
              <img src={require('../../../assets/SVG/search_small.svg')} alt="search_small" />
              <p style={{ marginLeft: '10px' }}>My Saved Search</p>
            </div>
              <p style={{ fontSize: '16px', fontWeight: 100, margin: '0px 70px', color: 'rgba(0, 0, 0, 0.5)' }}>Quickly find businesses each time you search.</p>
          </div>
          <div style={{ width: '30%', padding: '15px 0px', border: '0.5px solid rgba(0, 0, 0, 0.3)', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
              <img src={require('../../../assets/SVG/heart_small.svg')} alt="heart_small" />
              <p style={{ marginLeft: '10px' }}>My Saved Listing</p>
            </div>
              <p style={{ fontSize: '16px', fontWeight: 100, margin: '0px 70px', color: 'rgba(0, 0, 0, 0.5)' }}>Have a listing you want to keep an eye on? Add it to your Saved Listings for easy access to it at any time.</p>
          </div>
          <div style={{ width: '30%', padding: '15px 0px', border: '0.5px solid rgba(0, 0, 0, 0.3)', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
              <img src={require('../../../assets/SVG/mail_small.svg')} alt="mail_small" />
              <p style={{ marginLeft: '10px' }}>Manage Email</p>
            </div>
              <p style={{ fontSize: '16px', fontWeight: 100, margin: '0px 70px', color: 'rgba(0, 0, 0, 0.5)' }}>Choose how often you receive BizAlerts, listings alerts, newsletters, and marketing emails.</p>
          </div>
        </div>
      </div>


      {/* <div style={{ width: '95%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.3)', paddingBottom: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title text="Recommended Business Brokers" style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 'bold' }} />
        <div className="HomeBrokersContainer">
          <div className="HomeBrokers">
            <img className="HomeBrokerImage" src={require('../../../assets/brokers/1.svg')} alt="Home Broker 1" />
            <div className="HomeBrokerTextContainer">
              <p className="HomeBrokerTitle">Vincent Vargas</p>
              <p className="HomeBrokerDesignation">American Business Investor in..</p>
              <p className="HomeBrokerLocation">Marine Country, IN</p>
            </div>
          </div>
          <div className="HomeBrokers">
            <img className="HomeBrokerImage" src={require('../../../assets/brokers/2.svg')} alt="Home Broker 1" />
            <div className="HomeBrokerTextContainer">
              <p className="HomeBrokerTitle">Vincent Vargas</p>
              <p className="HomeBrokerDesignation">American Business Investor in..</p>
              <p className="HomeBrokerLocation">Marine Country, IN</p>
            </div>
          </div>
          <div className="HomeBrokers">
            <img className="HomeBrokerImage" src={require('../../../assets/brokers/3.svg')} alt="Home Broker 1" />
            <div className="HomeBrokerTextContainer">
              <p className="HomeBrokerTitle">Vincent Vargas</p>
              <p className="HomeBrokerDesignation">American Business Investor in..</p>
              <p className="HomeBrokerLocation">Marine Country, IN</p>
            </div>
          </div>
          <div style={{ width: '18%', height: '18vw', backgroundColor: 'rgb(255, 230, 204)', borderRadius: '5px', color: 'orange', fontFamily: 'sans-serif', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>See More</p>
          </div>
        </div>
      </div> */}


      <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title text="Edge Members also get these advanced features" style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 'bold' }} />
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', fontSize: '18px', fontFamily: 'sans-serif', marginTop: '10px' }}>
          <div style={{ width: '30%', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '5px', padding: '10px 15px', textAlign: 'center' }}>
            <img style={{ width: '100%' }} src={require('../../../assets/SVG/daf1.svg')} alt="daf1" />
            <p style={{ color: 'rgba(0, 0, 0, 0.7)', margin: '10px 0px' }}>Video Series Business Buyer</p>
          </div>
          <div style={{ width: '30%', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '5px', padding: '10px 15px', textAlign: 'center' }}>
            <img style={{ width: '100%' }}  src={require('../../../assets/SVG/daf2.svg')} alt="daf2" />
            <p style={{ color: 'rgba(0, 0, 0, 0.7)', margin: '10px 0px' }}>Video Series Business Buyer</p>
          </div>
          <div style={{ width: '30%', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '5px', padding: '10px 15px', textAlign: 'center' }}>
            <img style={{ width: '100%' }}  src={require('../../../assets/SVG/daf3.svg')} alt="daf3" />
            <p style={{ color: 'rgba(0, 0, 0, 0.7)', margin: '10px 0px' }}>Video Series Business Buyer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

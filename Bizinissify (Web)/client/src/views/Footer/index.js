import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

function Footer() {
  return (
    <div className="Footer">
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="FooterLogoAndImagesContainer">
          <div className="FooterLogoContainer">
            <Link to='/'>
              <img src={require('../../assets/logo/logo.svg')} className="Logo" alt="logo" />
            </Link>
          </div>
          <div className="FooterImagesContainer">
            <Link to='/'>
              <img src={require('../../assets/SVG/facebook.svg')} className="FooterImages" alt="logo" />
            </Link>
            <Link to='/'>
              <img src={require('../../assets/SVG/twitter.svg')} className="FooterImages" alt="logo" />
            </Link>
            <Link to='/'>
              <img src={require('../../assets/SVG/linkedin.svg')} className="FooterImages" alt="logo" />
            </Link>
            <Link to='/'>
              <img src={require('../../assets/SVG/youtube.svg')} className="FooterImages" alt="logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="FooterTabsSection">
        <div className="FooterTabsContainer">
          <p className="FooterTabBold">Search</p>
          <p className="FooterTab">Established Business</p>
          <p className="FooterTab">Franchises for Sale</p>
          <p className="FooterTab">Asset Sales</p>
          <p className="FooterTab">Business Real Estate</p>
          <p className="FooterTab">Find a Broker</p>
        </div>
        <div className="FooterTabsContainer">
          <p className="FooterTabBold">Advertise</p>
          <p className="FooterTab">List a Business for Sale</p>
          <p className="FooterTab">Become an Advertiser</p>
          <p className="FooterTab">BrokerWorks</p>
        </div>
        <div className="FooterTabsContainer">
          <p className="FooterTabBold">Resources</p>
          <p className="FooterTab">Value a Business</p>
          <p className="FooterTab">Learning Center</p>
          <p className="FooterTab">Finance Center</p>
          <p className="FooterTab">Blog</p>
          <p className="FooterTab">Insight Report</p>
          <p className="FooterTab">BizBuySell Edge</p>
        </div>
        <div className="FooterTabsContainer">
          <p className="FooterTabBold">Company</p>
          <p className="FooterTab">About Us</p>
          <p className="FooterTab">Contact Us</p>
          <p className="FooterTab">Terms of Use</p>
          <p className="FooterTab">Privacy Policy</p>
          <p className="FooterTab">Sitemap</p>
        </div>
        <div className="FooterTabsContainer">
          <p className="FooterTabBold">Marketplace</p>
          <p className="FooterTab">BizQuest</p>
          <p className="FooterTab">FindaFranchise</p>
          <p className="FooterTab">Apartments.com</p>
          <p className="FooterTab">LoopNet</p>
          <p className="FooterTab">LandsofAmerica</p>
        </div>
      </div>
    </div>
  )
}

export default Footer

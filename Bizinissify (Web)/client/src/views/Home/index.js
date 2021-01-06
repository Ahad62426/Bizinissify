import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { SHOW_SIGN_IN } from '../../constants/App'

import { Title, OrangeButton, DropDown, Input } from '../../components'
import './styles.css'
import { options, countryList, states, rangeArray } from '../../constants'

function Home(props) {

  const [filterKeys, setFilterKeys] = useState({})
  const [showStatesList, setShowStatesList] = useState(true)

  const user = useSelector(({ sessionReducer }) => sessionReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const { state } = props.location
    if (!user && state) {
      const { from } = state
      dispatch(customisedAction(SHOW_SIGN_IN, { from }))
    }
  }, [props.location, user, dispatch])

  function addFilterKeys (key, value) {
    const tempObject = filterKeys
    if (!value) delete tempObject[key]
    else tempObject[key] = value
    setFilterKeys(tempObject)
  }

  return (
    <div className="Container">
      <div className="HomeContainer">
        <div className="HomeUpBody">
          <p className="HomeTitle">The Internet’s Largest Business for Sale Marketplace</p>
          <div className="HomeUpMiddle">
            <p className="HomeTitle">Find a business for sale</p>
            <div className="HomeInputsContainer" style={{ marginBottom: '10px' }}>
              <div className="HomeInputContainer">
                <DropDown
                  placeholder="Select Business Category"
                  style={{ width: '100%' }}
                  options={options}
                  value={filterKeys.category}
                  onChange={({ target }) => addFilterKeys('category', target.value)}
                />
              </div>
              <div className="HomeInputContainer">
                <DropDown
                  placeholder="Select Country"
                  style={{ width: '100%' }}
                  options={countryList}
                  value={filterKeys.country}
                  onChange={({ target }) => addFilterKeys('country', target.value)}
                />
              </div>
            </div>
            <div className="HomeInputsContainer" style={{ marginTop: '10px' }}>
              <div className="HomeInputContainer">
                {showStatesList ? 
                  <DropDown
                    placeholder="Select State & Region"
                    style={{ width: '100%' }}
                    options={states}
                    value={filterKeys.state_city}
                    onChange={({ target: { value } }) =>  {
                      if (value === 'Not Listed ...') {
                        const tempObject = filterKeys
                        if (tempObject['state_city']) delete tempObject['state_city']
                        setFilterKeys(tempObject)
                        setShowStatesList(false)
                      }
                      else addFilterKeys('state_city', value)
                    }}
                  /> : 
                  <Input 
                    placeholder="Enter State or City"
                    style={{ flex: 1, fontSize: '16px', paddingTop: '13px', paddingBottom: '13px' }}
                    value={filterKeys.state_city}
                    onChange={({ target: { value } }) => addFilterKeys('state_city', value)}
                  />
                }
              </div>
              <div className="HomeInputContainer">
                <DropDown
                  placeholder="Select Max Range"
                  style={{ width: '100%' }}
                  options={rangeArray}
                  value={filterKeys.range}
                  onChange={({ target }) => addFilterKeys('range', target.value)}
                />
              </div>
            </div>
            <div className="HomeSearchButtonsContainer">
              <Link to='/allBusiness' style={styles.TabsLinks}>
                <p className="HomeAdvanceSearchText">Advance search</p>
              </Link>
              <OrangeButton 
                text="Apply"
                onClick={() => {
                  if (filterKeys.category || filterKeys.country || filterKeys.state_city || filterKeys.range)
                  props.history.push('/allBusiness', { filterKeys })
                }}
              />
            </div>
          </div>
        </div>
        <div className="HomePartners">
          <img src={require('../../assets/SVG/partners_logos.svg')} style={{ width: '60%' }} alt="Partners Logos" />
        </div>
      </div>
      <div className="HomeBody">
        <div className="SellYourBusinessSection">
          <Title text='Sell Your Business Online' />
          <div className="SellYourBusinessTextContainer">
            <p>BizBuySell has facilitated over 100,000 successful business sales and is visited over 1 Million times each month by potential business buyers.</p>
          </div>
          <OrangeButton
            onClick={() => props.history.push('/sellBusiness')}
            text="Get Started Now"
          />
          <p className="LearnMoreSellBusiness">Learn more about the sales process</p>
        </div>
        <div className="TopFranchise">
          <Title text="Top Franchise Opportunities" />
          <div className="TopFranchiseContainer">
            <p className="Franchise">Seller Financed Businesses</p>
            <p className="Franchise">Home Based Business</p>
            <p className="Franchise">Gas Stations</p>
            <p className="Franchise">Cleaning and Maintenance</p>
            <p className="Franchise">Sports & Recreation Franchises</p>
          </div>
          <div className="TopFranchiseContainer">
            <p className="Franchise">Franchise Opportunities</p>
            <p className="Franchise">Storage and Warehousing</p>
            <p className="Franchise">Restaurants</p>
            <p className="Franchise"> Car Washes</p>
            <p className="Franchise">Pharmacies</p>
            <p className="Franchise">Travel & Lodging Franchises</p>
            <Link to="/allFranchises" style={{ textDecoration: 'none' }}><p className="Franchise Orange" style={{ fontWeight: 600 }}>See all&nbsp;&nbsp;{'>'}</p></Link>
          </div>
        </div>
        {/* <div className="HomeBrokersSection">
          <Title text='Top Business Brokers' />
          <p className="HoneBrokersText">Brokers, get listed here</p>
          <div className="HomeBrokersContainer">
            <div className="HomeBrokers">
              <img className="HomeBrokerImage" src={require('../../assets/brokers/1.svg')} alt="Home Broker 1" />
              <div className="HomeBrokerTextContainer">
                <p className="HomeBrokerTitle">Vincent Vargas</p>
                <p className="HomeBrokerDesignation">American Business Investor in..</p>
                <p className="HomeBrokerLocation">Marine Country, IN</p>
              </div>
            </div>
            <div className="HomeBrokers">
              <img className="HomeBrokerImage" src={require('../../assets/brokers/2.svg')} alt="Home Broker 1" />
              <div className="HomeBrokerTextContainer">
                <p className="HomeBrokerTitle">Vincent Vargas</p>
                <p className="HomeBrokerDesignation">American Business Investor in..</p>
                <p className="HomeBrokerLocation">Marine Country, IN</p>
              </div>
            </div>
            <div className="HomeBrokers">
              <img className="HomeBrokerImage" src={require('../../assets/brokers/3.svg')} alt="Home Broker 1" />
              <div className="HomeBrokerTextContainer">
                <p className="HomeBrokerTitle">Vincent Vargas</p>
                <p className="HomeBrokerDesignation">American Business Investor in..</p>
                <p className="HomeBrokerLocation">Marine Country, IN</p>
              </div>
            </div>
            <div className="HomeBrokers">
              <img className="HomeBrokerImage" src={require('../../assets/brokers/4.svg')} alt="Home Broker 1" />
              <div className="HomeBrokerTextContainer">
                <p className="HomeBrokerTitle">Vincent Vargas</p>
                <p className="HomeBrokerDesignation">American Business Investor in..</p>
                <p className="HomeBrokerLocation">Marine Country, IN</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

const styles = {
  TabsLinks: {
    textDecoration: 'underline',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    color: 'black'
  },
  LoginText: {
    textDecoration: 'none',
  }
}

export default Home

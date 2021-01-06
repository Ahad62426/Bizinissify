import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Title, OrangeButton } from '../../../components'
import './styles.css'
import { GET_FRANCHISE_TO_EDIT } from '../../../constants/App'
import { customisedAction } from '../../../redux/actions'

function FranchiseDetails(props) {

  const user = useSelector(({ sessionReducer }) => sessionReducer.user)
  const franchiseDetails = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.franchiseDetails)
  const sellerDetails = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.sellerDetails)
  const loading = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.loading)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (!franchiseDetails && !loading) props.history.push('/allFranchises')
  }, [franchiseDetails, loading, props.history])

  function editFranchise(id) {
    dispatch(customisedAction(GET_FRANCHISE_TO_EDIT, { id }))
    props.history.push('/editFranchise')
  }

  const renderOffers = (data) => {
    const offers = data.split('\n')
    return offers.map(offer => {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <img src={require('../../../assets/SVG/orange_arrow.svg')} alt="Orange Arrow" />
          <p style={{ fontSize: '16px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5)', marginLeft: '7px' }}>{offer}</p>
        </div>
      )
    })
  }

  return (
    <div className="Container">
      <div className="Body">
        {loading ?
          <div className="NoDataToShow LightShadow" style={{ backgroundColor: 'white' }}>
            <Title text="Loading Details . . ." />
          </div>
          : franchiseDetails ? <div className="PostDetailsViewContainer" style={{ width: '100%', display: 'flex', marginTop: '10px', fontFamily: 'sans-serif' }}>
            <div className="LightShadow" style={{ flex: 7, backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden', padding: '20px 30px' }}>
              <Title text={franchiseDetails.title} style={{ fontWeight: 'bold' }} />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ flex: 1, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5)', lineHeight: '1.5' }}
                  dangerouslySetInnerHTML={{ __html: franchiseDetails.long_description.replace(/\n/g, '<br/>') }} />
                <img style={{ width: '500', borderRadius: '5px' }} src={franchiseDetails.image_url} alt="post_full_image" />
              </div>
              {franchiseDetails.why_us_description ?
                <div>
                  <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', margin: '15px 0px' }} />
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 1)', marginBottom: '10px' }}>Why Choose Us?</p>
                  <p style={{ fontSize: '16px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.8)', marginBottom: '10px' }}>{franchiseDetails.why_us_title}</p>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5)', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: franchiseDetails.why_us_description.replace(/\n/g, '<br/>') }} />
                </div>
                : null
              }
              {franchiseDetails.offers ?
                <div>
                  <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', margin: '15px 0px' }} />
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 1)', marginBottom: '10px' }}>A {franchiseDetails.title.toUpperCase()} FRANCHISE OFFERS YOU</p>
                  {renderOffers(franchiseDetails.offers)}
                </div>
                : null
              }
              {franchiseDetails.ideal_candidate ?
                <div>
                  <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', margin: '15px 0px' }} />
                  <p style={{ fontSize: '20px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 1)', marginBottom: '10px' }}>Ideal Candidate</p>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5)', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: franchiseDetails.ideal_candidate.replace(/\n/g, '<br/>') }} />
                </div>
                : null
              }
              {franchiseDetails.history ?
                <div>
                  <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', margin: '15px 0px' }} />
                  <p style={{ fontSize: '20px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 1)', marginBottom: '10px' }}>History</p>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5)', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: franchiseDetails.history.replace(/\n/g, '<br/>') }} />
                </div>
                : null
              }
              {franchiseDetails.support_n_training ?
                <div>
                  <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', margin: '15px 0px' }} />
                  <p style={{ fontSize: '20px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 1)', marginBottom: '10px' }}>Training And Support</p>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5)', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: franchiseDetails.support_n_training.replace(/\n/g, '<br/>') }} />
                </div>
                : null
              }
            </div>
            <div style={{ flex: 3, marginLeft: '10px' }}>
              <div className="LightShadow" style={{ backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden', padding: '20px' }}>
                <p style={{ fontSize: '22px', color: 'rgba(0, 0, 0, 1)', marginBottom: '10px' }}>Detailed Information</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Capital Required</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>$ {franchiseDetails.capital_required_min} - $ {franchiseDetails.capital_required_max}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Liquid Capital</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.liquid_capital ? '$ '+franchiseDetails.liquid_capital : 'N/A'}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Net Worth</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>$ {franchiseDetails.net_worth}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Financing Assistance</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.financing ? 'Available' : 'N/A'}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Training and Support</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.support_n_training ? 'Available' : 'N/A'}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Initial Franchise Fee</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.initial_franchise_fee ? '$ '+franchiseDetails.initial_franchise_fee : 'N/A'}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Average Sales Last Year</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.avg_sales ? '$ '+franchiseDetails.avg_sales : 'N/A'}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>CEO Name</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.business_owners || 'N/A'}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Company Owned Units</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.company_units}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>Existing Units</p>
                <p style={{ fontSize: '18px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{franchiseDetails.existing_units}</p>
                <div style={{ margin: '15px 0px'}}>
                  <OrangeButton
                    text={user && sellerDetails.email === user.email ? "Edit You Add" : "Contact Seller"}
                    style={{ width: '100%', padding: '10px' }}
                    onClick={() => user && sellerDetails.email === user.email ? editFranchise(franchiseDetails.id) : null}
                  />
                </div>
              </div>
            </div>
          </div>
          : <div className="NoDataToShow LightShadow" style={{ backgroundColor: 'white' }}>
            <Title text="Franchise details not available!" />
          </div>
        }
      </div>
    </div>
  )
}

export default FranchiseDetails

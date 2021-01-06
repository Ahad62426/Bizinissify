import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Title, OrangeButton, WhiteButton } from '../../../components'
import './styles.css'
import { GET_POST_TO_EDIT } from '../../../constants/App'
import { customisedAction } from '../../../redux/actions'

function PostDetails(props) {

  const user = useSelector(({ sessionReducer }) => sessionReducer.user)
  const postDetails = useSelector(({ allPostsReducer }) => allPostsReducer.postDetails)
  const sellerDetails = useSelector(({ allPostsReducer }) => allPostsReducer.sellerDetails)
  const loading = useSelector(({ allPostsReducer }) => allPostsReducer.loading)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (!postDetails && !loading) props.history.push('/allBusiness')
  }, [postDetails, loading, props.history])

  function editPost(id) {
    dispatch(customisedAction(GET_POST_TO_EDIT, { id }))
    props.history.push('/editPost')
  }

  function chatWithSeller() {
    const chatID = buildChatID()
    props.history.push('/profile', { chatID, sellerDetails })
  }

  function buildChatID() {
    return [user.email, sellerDetails.email].sort().join(':')
  }

  return (
    <div className="Container">
      <div className="Body">
        {loading ?
          <div className="NoDataToShow LightShadow" style={{ backgroundColor: 'white' }}>
            <Title text="Loading Details . . ." />
          </div>
          : postDetails ? <div className="PostDetailsViewContainer" style={{ width: '100%', display: 'flex', marginTop: '10px', fontFamily: 'sans-serif' }}>
            <div className="LightShadow" style={{ flex: 7, backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden', padding: '20px 30px' }}>
              <img style={{ width: '100%', borderRadius: '5px' }} src={postDetails.image_url} alt="post_full_image" />
              <Title text={postDetails.title} />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={require('../../../assets/SVG/location_icon.svg')} alt="filter" />
                <p style={{ marginLeft: '10px', fontSize: '18px', fontWeight: '500' }}>{postDetails.state_city}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', borderTop: '1px solid rgba(0, 0, 0, 0.1)', margin: '15px 0px', padding: '15px 0px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)' }}>Asking Price</p>
                  <p style={{ fontSize: '26px', fontWeight: '500', color: 'black', marginTop: '5px' }}>$ {postDetails.price}</p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(0, 0, 0, 0.1)', paddingLeft: '25px' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)' }}>Established</p>
                  <p style={{ fontSize: '28px', fontWeight: '500', color: 'black', marginTop: '5px' }}>{postDetails.established_on || 'N/A'}</p>
                </div>
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.7', marginBottom: '10px' }}>Asset Description</p>
              <p style={{ fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5', lineHeight: '1.5' }}
                dangerouslySetInnerHTML={{ __html: postDetails.long_description.replace(/\n/g, '<br/>') }} />
              <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.5)', margin: '15px 0px' }} />
              <p style={{ fontSize: '20px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.7', marginBottom: '10px' }}>Detailed Information</p>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ flex: 1, fontSize: '18px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>Location:</p>
                <p style={{ flex: 3, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>{postDetails.country}</p>
              </div>
              {postDetails.business_owners ?
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>Business Owners:</p>
                  <p style={{ flex: 3, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5', lineHeight: '1.5', marginBottom: '10px' }}>{postDetails.business_owners}</p>
                </div>
                : null
              }
              {postDetails.facilities ?
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>Facilities:</p>
                  <p style={{ flex: 3, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5', lineHeight: '1.5', marginBottom: '10px' }}>{postDetails.facilities}</p>
                </div>
                : null
              }
              {postDetails.support_n_training ?
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>Support & Training:</p>
                  <p style={{ flex: 3, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>{postDetails.support_n_training}</p>
                </div>
                : null
              }
              {postDetails.reason_for_selling ?
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>Reason for Selling:</p>
                  <p style={{ flex: 3, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>{postDetails.reason_for_selling}</p>
                </div>
                : null
              }
              {postDetails.business_website ?
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>Business Website:</p>
                  <p style={{ flex: 3, fontSize: '18px', fontWeight: 'lighter', marginBottom: '10px', cursor: 'pointer' }}><a style={{ textDecoration: 'none', color: 'orange' }} href={postDetails.business_website} target="blank">{postDetails.business_website}</a></p>
                </div>
                : null
              }
              {postDetails.demographic_information ?
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flex: 1, fontSize: '18px', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>Demographic Information:</p>
                  <p style={{ flex: 3, fontSize: '18px', fontWeight: 'lighter', color: 'rgba(0, 0, 0, 0.5', marginBottom: '10px' }}>{postDetails.demographic_information}</p>
                </div>
                : null
              }
            </div>
            <div style={{ flex: 3, marginLeft: '10px' }}>
              <div className="LightShadow" style={{ backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    {sellerDetails.profileImage ?
                      <img style={{ width: '100%' }} src={sellerDetails.profileImage} alt="profileImage" />
                      : <img style={{ width: '70%' }} src={require('../../../assets/SVG/account_dashboard_fill.svg')} alt="profileImage" />
                    }
                  </div>
                  <div style={{ flex: 1, marginLeft: '10px' }}>
                    <p style={{ color: 'rgba(0, 0, 0, 0.3)', fontWeight: 'lighter' }}>Asset Sale Listed By:</p>
                    <p style={{ fontSize: '24px', fontWeight: '500', margin: '5px 0px' }}>{user && sellerDetails.email === user.email ? 'You' : sellerDetails.name + ' ' + sellerDetails.lastName}</p>
                  </div>
                </div>
                <div style={{ margin: '15px 0px'}}>
                  <OrangeButton
                    text={user && sellerDetails.email === user.email ? "Edit You Add" : "Contact Seller"}
                    style={{ width: '100%', padding: '10px' }}
                    onClick={() => user && sellerDetails.email === user.email ? editPost(postDetails.id) : chatWithSeller()}
                  />
                </div>
                <div style={{ margin: '15px 0px'}}>
                  <WhiteButton
                    text="View My Listings"
                    style={{ width: '100%', padding: '10px' }}
                    onClick={() => null}
                  />
                </div>
              </div>
            </div>
          </div>
          : <div className="NoDataToShow LightShadow" style={{ backgroundColor: 'white' }}>
            <Title text="Post details not available!" />
          </div>
        }
      </div>
    </div>
  )
}

export default PostDetails

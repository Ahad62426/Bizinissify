import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { customisedAction } from '../../../redux/actions'
import { GET_OWN_POSTS, GET_POST_DETAILS } from '../../../constants/App'

function Selling(props) {

  const [postsList, setPostsList] = useState(null)

  const ownPosts = useSelector(({ allPostsReducer }) => allPostsReducer.ownPosts)
  const loading = useSelector(({ allPostsReducer }) => allPostsReducer.loading)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !postsList) dispatch(customisedAction(GET_OWN_POSTS))
    if (!loading && ownPosts) setPostsList(ownPosts)
    else if (ownPosts === null && !postsList) setPostsList([])
  }, [ownPosts, loading, postsList, dispatch])

  function showPostDetails(id) {
    dispatch(customisedAction(GET_POST_DETAILS, { id }))
    props.history.push('/postDetails')
  }
  
  const renderPostsList = () => {
    return postsList.map((post) => {
      return (
        <div className="LightShadow" key={post.id}
          style={{ backgroundColor: 'white', marginBottom: '15px', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
          <img onClick={() => showPostDetails(post.id)} style={{ cursor: 'pointer', height: '130px', width: '200px', borderRadius: '5px' }} src={post.image_url} alt="post_icon_image" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: '15px', height: '130px' }}>
              <div onClick={() => showPostDetails(post.id)} style={{ flex: 1, cursor: 'pointer' }}>
                <p className="PostTitle" style={{ fontSize: '20px', fontWeight: '500', width: '75%' }}>{post.title}</p>
                <p style={{ fontSize: '16px', fontWeight: '300', color: 'orange', margin: '10px 0px' }}>{post.sub_title}</p>
                <p className="ShortDescription">{post.short_description}</p>
              </div>
            </div>
            <div onClick={() => showPostDetails(post.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', cursor: 'pointer' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                <img src={require('../../../assets/SVG/location_icon.svg')} alt="filter" />
                <p style={{ marginLeft: '10px', fontSize: '18px', fontWeight: '500' }}>{post.state_city}</p>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)' }}>
                Cost Required &nbsp;<span style={{ fontSize: '24px', fontWeight: '500', color: 'black' }}>${post.price}</span>
              </p>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="PostsViewContainer" style={{ width: '100%', display: 'flex', marginTop: '10px', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '50px' }}>
          <p style={{ flex: 1, fontSize: '24px', color: 'rgba(0, 0, 0, 0.5)' }}>
            Your Posted Adds&nbsp;&nbsp;<span style={{ fontSize: '16px', fontWeight: '300' }}>{loading ? '(loading . . .)' : `(Total Results: ${postsList ? postsList.length : 0})`}</span>
          </p>
          <div style={{ display: 'flex', borderBottom: '1px solid black', cursor: 'pointer' }}>
            <p style={{ fontSize: '16px', fontWeight: 'lighter', margin: '5px 30px' }}>Sort</p>
            <img src={require('../../../assets/SVG/down_arrow.svg')} alt="down_arrow" />
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          {postsList && renderPostsList()}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Selling)

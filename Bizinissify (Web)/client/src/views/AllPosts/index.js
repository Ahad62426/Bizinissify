import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'
import { DropDown, OrangeButton, Input } from '../../components'
import { customisedAction } from '../../redux/actions'
import { GET_ALL_POSTS, GET_POST_DETAILS, GET_FILTERED_POSTS, options, countryList, states, timesArray } from '../../constants'
import { getCurrentMonthTimeStamp, getTodayTimeStamp, getCurrentYearTimeStamp } from '../../helpers/dateTimeHelpers'

function AllPosts(props) {

  const [postsList, setPostsList] = useState(null)
  const [favourites, setFavourites] = useState([])
  const [showStatesList, setShowStatesList] = useState(true)
  const [pasedFiltersUsed, setPasedFiltersUsed] = useState(false)

  const [filterKeys, setFilterKeys] = useState({})
  const [keyword, setKeyword] = useState('')

  const posts = useSelector(({ allPostsReducer }) => allPostsReducer.posts)
  const loading = useSelector(({ allPostsReducer }) => allPostsReducer.loading)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.history.location.state && !pasedFiltersUsed) {
      setPasedFiltersUsed(true)
      setFilterKeys(props.history.location.state.filterKeys)
      getFilteredPosts(props.history.location.state.filterKeys)
    } else {
      if (!loading && !postsList && !posts) dispatch(customisedAction(GET_ALL_POSTS))
      if (!loading && posts ) setPostsList(posts)
      else if (posts === null && !postsList) setPostsList([])
    }
  }, [posts, loading, postsList, dispatch])

  function showPostDetails(id) {
    dispatch(customisedAction(GET_POST_DETAILS, { id }))
    props.history.push('/postDetails')
  }

  function addFilterKeys (key, value) {
    const tempObject = filterKeys
    if (!value) delete tempObject[key]
    else tempObject[key] = value
    if (key === 'keyword') setKeyword(value)
    setFilterKeys(tempObject)
  }

  function handleTimeChange (time) {
    addFilterKeys('time', time)
    switch (timesArray.indexOf(time)) {
      case 0:
        addFilterKeys('timeStamp', getTodayTimeStamp())
        break
      case 1:
        addFilterKeys('timeStamp', getCurrentMonthTimeStamp())
        break
      case 2:
        addFilterKeys('timeStamp', getCurrentYearTimeStamp())
        break
      default:
        break

    }
  }

  function getFilteredPosts(payload) {
    dispatch(customisedAction(GET_FILTERED_POSTS, payload || filterKeys))
  }

  function markFavourite(id) {
    let tempFavourites = []
    if (favourites.includes(id)) tempFavourites = favourites.filter(value => value !== id)
    else tempFavourites = [ ...favourites, id ]
    setFavourites(tempFavourites)
  }
  
  const renderPostsList = () => {
    return postsList.map((post) => {
      return (
        <div className="LightShadow" key={post.id}
          style={{ backgroundColor: 'white', marginBottom: '15px', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
          <img onClick={() => showPostDetails(post.id)} style={{ cursor: 'pointer', height: '130px', width: '200px', borderRadius: '5px' }} src={post.image_url} alt="post_icon_image" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: '15px', height: '130px' }}>
              <div onClick={() => showPostDetails(post.id)} style={{ flex: 1, cursor: 'pointer', paddingRight: '15px' }}>
                <p className="PostTitle" style={{ fontSize: '20px', fontWeight: '500', width: '75%' }}>{post.title}</p>
                <p style={{ fontSize: '16px', fontWeight: '300', color: 'orange', margin: '10px 0px' }}>{post.sub_title}</p>
                <p className="ShortDescription">{post.short_description}</p>
              </div>
              <img onClick={() => markFavourite(post.id)} style={{ cursor: 'pointer' }} src={require(favourites.includes(post.id) ? '../../assets/SVG/heart_orange.svg' : '../../assets/SVG/heart.svg')} alt="heart" />
            </div>
            <div onClick={() => showPostDetails(post.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', cursor: 'pointer' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                <img src={require('../../assets/SVG/location_icon.svg')} alt="filter" />
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
    <div className="Container">
      <div className="Body">
        <div className="PostsViewContainer" style={{ width: '100%', display: 'flex', marginTop: '10px', fontFamily: 'sans-serif' }}>
          <div style={{ flex: 7 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '50px' }}>
              <p style={{ flex: 1, fontSize: '24px', color: 'rgba(0, 0, 0, 0.5)' }}>
                Search Business Assets For Sale&nbsp;&nbsp;<span style={{ fontSize: '16px', fontWeight: '300' }}>{loading ? '(loading . . .)' : `(Total Results: ${postsList ? postsList.length : 0})`}</span>
              </p>
              <div style={{ display: 'flex', borderBottom: '1px solid black', cursor: 'pointer' }}>
                <p style={{ fontSize: '16px', fontWeight: 'lighter', margin: '5px 30px' }}>Sort</p>
                <img src={require('../../assets/SVG/down_arrow.svg')} alt="down_arrow" />
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              {postsList && renderPostsList()}
            </div>
          </div>
          <div style={{ flex: 3, marginLeft: '10px', borderRadius: '10px', overflow: 'hidden' }}>
            <div className="LightShadow" style={{ backgroundColor: 'white' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <p style={{ fontSize: '24px', fontFamily: 'sans-serif', marginRight: '10px' }}>
                  Filter
                </p>
                <img src={require('../../assets/SVG/filter.svg')} alt="filter" />
              </div>
              <div style= {{ padding: '30px 15px', display: 'flex', flexDirection: 'column',
             }}>
                <Input 
                  placeholder="City or Keyword"
                  style={{ flex: 1, fontSize: '16px', paddingTop: '13px', paddingBottom: '13px' }}
                  value={keyword}
                  onChange={({ target: { value } }) => addFilterKeys('keyword', value)}
                />
                <p style={{ margin: '10px 0px' }}>Select Category</p>
                <DropDown
                  placeholder="All Categories"
                  options={options}
                  value={filterKeys.category}
                  onChange={({ target }) => addFilterKeys('category', target.value)}
                />
                <p style={{ margin: '10px 0px' }}>{showStatesList ? 'Select State' : 'Enter City / State'}</p>
                {showStatesList ? 
                <DropDown
                  placeholder="All States"
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
                <p style={{ margin: '10px 0px' }}>Select Country</p>
                <DropDown
                  placeholder="All Countries"
                  options={countryList}
                  value={filterKeys.country}
                  onChange={({ target: { value } }) => addFilterKeys('country', value)}
                />
                <p style={{ margin: '10px 0px' }}>Added Time</p>
                <DropDown
                  placeholder="Any Time"
                  options={timesArray}
                  value={filterKeys.time}
                  onChange={({ target: { value } }) => handleTimeChange(value)}
                />
                <div style= {{ flex: 1, borderBottom: '0.05px solid black', marginTop: '15px' }} />
                <div style= {{ display: 'flex', flexDirection: 'row', paddingTop: '15px'}}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', cursor: 'pointer' }}>
                    <p style={{ marginTop: '10px', textDecoration: 'underline', fontSize: 18 }}
                      onClick={() => {
                        setFilterKeys({})
                        setKeyword('')
                        setShowStatesList(true)
                        dispatch(customisedAction(GET_ALL_POSTS))
                      }}>Reset</p>
                  </div>
                  <OrangeButton 
                    text="Apply"
                    onClick={() => getFilteredPosts()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPosts

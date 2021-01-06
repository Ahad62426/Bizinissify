import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'
import { DropDown, OrangeButton, Input } from '../../components'
import { customisedAction } from '../../redux/actions'
import { GET_ALL_FRANCHISES, GET_FILTERED_POSTS, franchiseOptions, states, GET_FRANCHISE_DETAILS } from '../../constants'

function AllFranchises(props) {

  const [franchisesList, setFranchisesList] = useState(null)
  const [showStatesList, setShowStatesList] = useState(true)

  const [filterKeys, setFilterKeys] = useState({})
  const [keyword, setKeyword] = useState('')
  const [cash, setCash] = useState('')

  const franchises = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.franchises)
  const loading = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.loading)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !franchisesList) dispatch(customisedAction(GET_ALL_FRANCHISES))
    if (!loading && franchises ) setFranchisesList(franchises)
    else if (franchises === null && !franchisesList) setFranchisesList([])
  }, [franchises, loading, franchisesList, dispatch])

  function showFranchiseDetails(id) {
    dispatch(customisedAction(GET_FRANCHISE_DETAILS, { id }))
    props.history.push('/franchiseDetails')
  }

  function addFilterKeys (key, value) {
    const tempObject = filterKeys
    if (!value) delete tempObject[key]
    else tempObject[key] = value
    if (key === 'keyword') setKeyword(value)
    if (key === 'cash') setCash(value)
    setFilterKeys(tempObject)
  }

  function getFilteredFranchises() {
    dispatch(customisedAction(GET_FILTERED_POSTS, filterKeys))
  }
  
  const renderFranchisesList = () => {
    return franchisesList.map((franchise) => {
      return (
        <div className="LightShadow" key={franchise.id}
          onClick={() => showFranchiseDetails(franchise.id)}
          style={{ cursor: 'pointer', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px'}}>
          <img style={{ height: '80px', width: '100px', borderRadius: '5px' }} src={franchise.image_url} alt="post_icon_image" />
          <p className="PostTitle" style={{ fontSize: '20px', fontWeight: '500', margin: '20px 0px 15px' }}>{franchise.title}</p>
          <div style={{ width: '100%' }}>
            <p className="ShortDescription" style={{ fontSize: 14 }}>{franchise.short_description}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', borderTop: '1px solid rgba(0, 0, 0, 0.5)', marginTop: '20px', paddingTop: '10px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.5)' }}>
                  Cost Required &nbsp;<span style={{ fontSize: '18px', fontWeight: '500', color: 'black' }}>${franchise.price}</span>
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={require('../../assets/SVG/location_icon.svg')} alt="filter" />
                <p style={{ marginLeft: '10px', fontSize: '15px', fontWeight: '500' }}>{franchise.state_city}</p>
              </div>
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
                Search Franchise Opportunities&nbsp;&nbsp;<span style={{ fontSize: '16px', fontWeight: '300' }}>{loading ? '(loading . . .)' : `(Total Results: ${franchisesList ? franchisesList.length : 0})`}</span>
              </p>
              <div style={{ display: 'flex', borderBottom: '1px solid black', cursor: 'pointer' }}>
                <p style={{ fontSize: '16px', fontWeight: 'lighter', margin: '5px 30px' }}>Sort</p>
                <img src={require('../../assets/SVG/down_arrow.svg')} alt="down_arrow" />
              </div>
            </div>
            <div className="GridColumns" style={{ marginTop: '10px', display: 'grid' }}>
              {franchisesList && renderFranchisesList()}
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
                  options={franchiseOptions}
                  value={filterKeys.category}
                  onChange={({ target: { value } }) => addFilterKeys('category', value)}
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
                <p style={{ margin: '10px 0px' }}>Cash to Invest</p>
                <Input 
                  placeholder="0"
                  type='number'
                  style={{ flex: 1, fontSize: '16px', paddingTop: '13px', paddingBottom: '13px' }}
                  value={cash}
                  onChange={({ target: { value } }) => addFilterKeys('cash', value)}
                />
                <div style= {{ flex: 1, borderBottom: '0.05px solid black', marginTop: '15px' }} />
                <div style= {{ display: 'flex', flexDirection: 'row', paddingTop: '15px'}}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', cursor: 'pointer' }}>
                    <p style={{ marginTop: '10px', textDecoration: 'underline', fontSize: 18 }}
                      onClick={() => {
                        setFilterKeys({})
                        setKeyword('')
                        setCash('')
                        setShowStatesList(true)
                      }}>Reset</p>
                  </div>
                  <OrangeButton 
                    text="Apply"
                    onClick={() => getFilteredFranchises()}
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

export default AllFranchises

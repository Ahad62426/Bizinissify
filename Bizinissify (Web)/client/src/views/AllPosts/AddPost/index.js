import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Title, InputWithLabel, DropDownWithLabel } from '../../../components'
import { OrangeButton } from '../../../components'
import { customisedAction } from '../../../redux/actions'
import { SUBMIT_POST, options, countryList, states } from '../../../constants'

function AddPost() {

  const [title, setTitle] = useState('')
  const [sub_title, setSubTitle] = useState('')
  const [state_city, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [established_on, setEstablishedOn] = useState('')
  const [short_description, setShortDescription] = useState('')
  const [long_description, setLongDescription] = useState('')
  const [business_owners, setBusinessOwners] = useState('')
  const [country, setCountry] = useState('')
  const [facilities, setFacilities] = useState('')
  const [support_n_training, setSupport] = useState('')
  const [reason_for_selling, setReason] = useState('')
  const [business_website, setWebsite] = useState('')
  const [demographic_information, setDemInfo] = useState('')
  const [category, setCategory] = useState(0)
  const [showStatesList, setShowStatesList] = useState(true)

  const submittedPost = useSelector(({ allPostsReducer }) => allPostsReducer.submittedPost)
  const loading = useSelector(({ allPostsReducer }) => allPostsReducer.loading)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (submittedPost && !loading) reset()
  }, [submittedPost, loading])

  function reset() {
    setTitle('')
    setSubTitle('')
    setLocation('')
    setEstablishedOn('')
    setShortDescription('')
    setLongDescription('')
    setBusinessOwners('')
    setCountry('')
    setFacilities('')
    setSupport('')
    setReason('')
    setWebsite('')
    setDemInfo('')
    setCategory(0)
  }

  function submit() {
    dispatch(customisedAction(SUBMIT_POST, {
      image_url: 'https://firebasestorage.googleapis.com/v0/b/bizinissify-cea9d.appspot.com/o/post_full_image%402x.png?alt=media',
      title,
      sub_title,
      state_city,
      price,
      established_on,
      short_description,
      long_description,
      business_owners,
      country,
      facilities,
      support_n_training,
      reason_for_selling,
      business_website,
      demographic_information,
      category,
      last_updated: Date.now()
    }))
  }

  return (
    <div className="Container">
      <div className="Body" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px 25px', fontFamily: 'sans-serif' }}>
        <Title text="Provide Details For Buniness / Asset You Want To Sell" />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: 'red', margin: '10px 15px' }}>(*) marked fields are required!</p>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <InputWithLabel
              label="Title"
              placeholder="Enter Title"
              required={true}
              maxLength={100}
              value={title}
              onChange={ev => setTitle(ev.target.value)}
            />
            <InputWithLabel
              label="Sub Title"
              placeholder="Enter Sub Title"
              maxLength={200}
              value={sub_title}
              onChange={ev => setSubTitle(ev.target.value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <DropDownWithLabel
              label="Category"
              placeholder="Select a Category"
              required={true}
              options={options}
              value={category}
              onChange={({ target: { value } }) => setCategory(value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            {showStatesList && states.includes(state_city) ? 
              <DropDownWithLabel
                label="City / State"
                placeholder="Select a State"
                required={true}
                options={states}
                value={state_city}
                onChange={({ target: { value } }) => {
                  if (value === 'Not Listed ...') {
                    setLocation(null)
                    setShowStatesList(false)
                  } else setLocation(value)
                }}
              /> : 
              <InputWithLabel
                label="City / State"
                placeholder="Enter City / State"
                required={true}
                value={state_city}
                onChange={ev => setLocation(ev.target.value)}
              />
            }
            <InputWithLabel
              label="Price"
              type="number"
              placeholder="Enter price"
              required={true}
              value={price}
              onChange={ev => setPrice(ev.target.value)}
            />
            <InputWithLabel
              label="Established On"
              type="number"
              placeholder="Enter Establishing Year"
              value={established_on}
              onChange={ev => setEstablishedOn(ev.target.value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <InputWithLabel
              label="Short Description"
              placeholder="Enter Short Description"
              textArea={true}
              required={true}
              maxLength={500}
              value={short_description}
              onChange={ev => setShortDescription(ev.target.value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <InputWithLabel
              label="Long Description"
              placeholder="Enter Long Description"
              textArea={true}
              required={true}
              maxLength={2000}
              value={long_description}
              onChange={ev => setLongDescription(ev.target.value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <InputWithLabel
              label="Business Owners"
              placeholder="Enter Business Owner(s) Name(s)"
              maxLength={100}
              value={business_owners}
              onChange={ev => setBusinessOwners(ev.target.value)}
            />
            <DropDownWithLabel
              label="Country"
              placeholder="Select a Country"
              required={true}
              options={countryList}
              value={country}
              onChange={({ target: { value } }) => setCountry(value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <InputWithLabel
              label="Facilities"
              placeholder="Enter Facilities (if any)"
              textArea={true}
              maxLength={1500}
              value={facilities}
              onChange={ev => setFacilities(ev.target.value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <InputWithLabel
              label="Support & Training"
              placeholder="Provide details for Support & Training you may offer"
              maxLength={200}
              textArea={true}
              value={support_n_training}
              onChange={ev => setSupport(ev.target.value)}
            />
            <InputWithLabel
              label="Reason for selling"
              placeholder="Provide details for Why are you Selling (Optional)"
              maxLength={200}
              textArea={true}
              value={reason_for_selling}
              onChange={ev => setReason(ev.target.value)}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <InputWithLabel
              label="Business Website"
              placeholder="Enter Business Website (Optional)"
              maxLength={100}
              value={business_website}
              onChange={ev => setWebsite(ev.target.value)}
            />
            <InputWithLabel
              label="Demographic Information"
              placeholder="Enter Demographic Information (Optional)"
              maxLength={100}
              value={demographic_information}
              onChange={ev => setDemInfo(ev.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '15px' }}>
            {/* <WhiteButton
              text="Reset"
              style={{ marginRight: '10px' }}
              disabledAction={() => null}
              onClick={() => reset()}
            /> */}
            <OrangeButton
              text="Submit"
              style={{ marginLeft: '10px' }}
              disabled={loading
                || !title.replace(/ /g, '')
                || !state_city
                || !price
                || !short_description.replace(/ /g, '')
                || !long_description.replace(/ /g, '')
                || !country.replace
                || !category
              }
              disabledAction={() => null}
              onClick={() => submit()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost

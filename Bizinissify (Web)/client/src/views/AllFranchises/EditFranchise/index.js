import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Title, InputWithLabel, DropDownWithLabel } from '../../../components'
import { WhiteButton, OrangeButton } from '../../../components'
import { customisedAction } from '../../../redux/actions'
import { EDIT_FRANCHISE, countryList, states, franchiseOptions } from '../../../constants'

function EditFranchise(props) {

  const [title, setTitle] = useState('')
  const [state_city, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [capital_required_min, setMinCapitalRequired] = useState('')
  const [capital_required_max, setMaxCapitalRequired] = useState('')
  const [liquid_capital, setLiquidCapital] = useState('')
  const [net_worth, setNetWorth] = useState('')
  const [financing, setFinancing] = useState(true)
  const [initial_franchise_fee, setInitialFee] = useState('')
  const [avg_sales, setAvgSales] = useState('')
  const [company_units, setCompanyUnits] = useState('')
  const [existing_units, setExistingUnits] = useState('')
  const [short_description, setShortDescription] = useState('')
  const [long_description, setLongDescription] = useState('')
  const [business_owners, setBusinessOwners] = useState('')
  const [why_us_title, setWhyUsTitle] = useState('')
  const [why_us_description, setWhyUs] = useState('')
  const [offers, setOffers] = useState('')
  const [ideal_candidate, setIdealCandidate] = useState('')
  const [history, setHistory] = useState('')
  const [support_n_training, setSupport] = useState('')
  const [country, setCountry] = useState('')
  const [category, setCategory] = useState(0)
  const [showStatesList, setShowStatesList] = useState(true)

  const franchiseToEdit = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.franchiseToEdit)
  const loading = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.loading)
  const submitting = useSelector(({ allFranchisesReducer }) => allFranchisesReducer.submitting)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && franchiseToEdit === undefined) props.history.push('/profile')
    if (franchiseToEdit) {
      setTitle(franchiseToEdit.title)
      setLocation(franchiseToEdit.state_city)
      setPrice(franchiseToEdit.price)
      setMinCapitalRequired(franchiseToEdit.capital_required_min)
      setMaxCapitalRequired(franchiseToEdit.capital_required_max)
      setLiquidCapital(franchiseToEdit.liquid_capital || '')
      setNetWorth(franchiseToEdit.net_worth)
      setFinancing(franchiseToEdit.financing)
      setInitialFee(franchiseToEdit.initial_franchise_fee || '')
      setAvgSales(franchiseToEdit.avg_sales || '')
      setCompanyUnits(franchiseToEdit.company_units || '')
      setExistingUnits(franchiseToEdit.existing_units || '')
      setShortDescription(franchiseToEdit.short_description)
      setLongDescription(franchiseToEdit.long_description)
      setBusinessOwners(franchiseToEdit.business_owners || '')
      setWhyUsTitle(franchiseToEdit.why_us_title || '')
      setWhyUs(franchiseToEdit.why_us_description || '')
      setOffers(franchiseToEdit.offers || '')
      setIdealCandidate(franchiseToEdit.ideal_candidate || '')
      setHistory(franchiseToEdit.history || '')
      setSupport(franchiseToEdit.support_n_training || '')
      setCountry(franchiseToEdit.country)
      setCategory(franchiseToEdit.category)
    }
  }, [franchiseToEdit, loading, props.history])

  function reset() {
    setTitle('')
    setLocation('')
    setPrice('')
    setMinCapitalRequired('')
    setMaxCapitalRequired('')
    setLiquidCapital('')
    setNetWorth('')
    setInitialFee('')
    setAvgSales('')
    setCompanyUnits('')
    setExistingUnits('')
    setShortDescription('')
    setLongDescription('')
    setBusinessOwners('')
    setWhyUsTitle('')
    setWhyUs('')
    setOffers('')
    setIdealCandidate('')
    setHistory('')
    setSupport('')
    setCountry('')
    setCategory(0)
  }

  function submit() {
    const edittedPost = franchiseToEdit
    edittedPost.title = title
    edittedPost.state_city = state_city
    edittedPost.price = price
    edittedPost.capital_required_min = capital_required_min
    edittedPost.capital_required_max = capital_required_max
    edittedPost.liquid_capital = liquid_capital
    edittedPost.net_worth = net_worth
    edittedPost.financing = financing
    edittedPost.initial_franchise_fee = initial_franchise_fee
    edittedPost.avg_sales = avg_sales
    edittedPost.company_units = company_units
    edittedPost.existing_units = existing_units
    edittedPost.short_description = short_description
    edittedPost.long_description = long_description
    edittedPost.business_owners = business_owners
    edittedPost.why_us_title = why_us_title
    edittedPost.why_us_description = why_us_description
    edittedPost.offers = offers
    edittedPost.ideal_candidate = ideal_candidate
    edittedPost.history = history
    edittedPost.support_n_training = support_n_training
    edittedPost.country = country
    edittedPost.category = category
    edittedPost.last_updated = Date.now()
    dispatch(customisedAction(EDIT_FRANCHISE, edittedPost))
  }

  return (
    <div className="Container">
      <div className="Body" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px 25px', fontFamily: 'sans-serif' }}>
        {!loading && franchiseToEdit ?
          <Title text="Edit Your Franchise Details" />
          : null
        }
        {loading ?
          <div className="NoDataToShow LightShadow" style={{ backgroundColor: 'white' }}>
            <Title text="Loading Details . . ." />
          </div>
          : franchiseToEdit ?
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
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <DropDownWithLabel
                  label="Category"
                  placeholder="Select a Category"
                  required={true}
                  options={franchiseOptions}
                  value={category}
                  onChange={({ target: { value } }) => setCategory(value)}
                />
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
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="Minimum Capital Required"
                  type="number"
                  placeholder="Enter Minimum Capital Required"
                  required={true}
                  value={capital_required_min}
                  onChange={ev => setMinCapitalRequired(ev.target.value)}
                />
                <InputWithLabel
                  label="Maximum Capital Required"
                  type="number"
                  placeholder="Enter Maximum Capital Required"
                  required={true}
                  value={capital_required_max}
                  onChange={ev => setMaxCapitalRequired(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="Net Worth"
                  type="number"
                  placeholder="Enter Net Worth"
                  required={true}
                  value={net_worth}
                  onChange={ev => setNetWorth(ev.target.value)}
                />
                <InputWithLabel
                  label="Liquid Capital"
                  type="number"
                  placeholder="Enter Liquid Capital"
                  value={liquid_capital}
                  onChange={ev => setLiquidCapital(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="Initial Franchise Fee"
                  type="number"
                  placeholder="Enter Initial Franchise Fee"
                  value={initial_franchise_fee}
                  onChange={ev => setInitialFee(ev.target.value)}
                />
                <InputWithLabel
                  label="Average Sales Last Year"
                  type="number"
                  placeholder="Enter Average Sales Last Year"
                  value={avg_sales}
                  onChange={ev => setAvgSales(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="Company Owned Units"
                  type="number"
                  placeholder="Enter Company Owned Units"
                  value={company_units}
                  onChange={ev => setCompanyUnits(ev.target.value)}
                />
                <InputWithLabel
                  label="Existing Units"
                  type="number"
                  placeholder="Enter Existing Units"
                  value={existing_units}
                  onChange={ev => setExistingUnits(ev.target.value)}
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
                  maxLength={1000}
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
                  label="Why Choose You (Title)"
                  placeholder="Enter Why Choose You (Title)"
                  maxLength={100}
                  value={why_us_title}
                  onChange={ev => setWhyUsTitle(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="Why Choose You (Description)"
                  placeholder="Enter Why Choose You (Description)"
                  maxLength={500}
                  textArea={true}
                  value={why_us_description}
                  onChange={ev => setWhyUs(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="What Do You Offer?"
                  placeholder="Enter What Do You Offer"
                  maxLength={1500}
                  textArea={true}
                  value={offers}
                  onChange={ev => setOffers(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="Ideal Candidate"
                  placeholder="Enter Ideal Candidate Description"
                  maxLength={500}
                  textArea={true}
                  value={ideal_candidate}
                  onChange={ev => setIdealCandidate(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="History"
                  placeholder="Enter History"
                  maxLength={2000}
                  textArea={true}
                  value={history}
                  onChange={ev => setHistory(ev.target.value)}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <InputWithLabel
                  label="Support & Training"
                  placeholder="Provide details for Support & Training you may offer"
                  maxLength={1000}
                  textArea={true}
                  value={support_n_training}
                  onChange={ev => setSupport(ev.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '15px' }}>
                <WhiteButton
                  text="Reset"
                  style={{ marginRight: '10px' }}
                  disabledAction={() => null}
                  onClick={() => reset()}
                />
                <OrangeButton
                  text="Submit"
                  style={{ marginLeft: '10px' }}
                  disabled={submitting
                    || !title.replace(/ /g, '')
                    || !state_city
                    || !price
                    || !capital_required_min
                    || !capital_required_max
                    || !net_worth
                    || !short_description.replace(/ /g, '')
                    || !long_description.replace(/ /g, '')
                    || !country
                    || !category
                  }
                  disabledAction={() => null}
                  onClick={() => submit()}
                />
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

export default EditFranchise

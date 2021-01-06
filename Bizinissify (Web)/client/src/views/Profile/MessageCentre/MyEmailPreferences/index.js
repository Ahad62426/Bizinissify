import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Title, OrangeButton } from '../../../../components'

function MyEmailPreferences(props) {

  const [email, setEmail] = useState('')

  const profile = useSelector(({ sessionReducer }) => sessionReducer.profile)

  useEffect(() => {
    if (profile) {
      setEmail(profile.email)
    }
  }, [profile])

  return (
    <div style={{ flex: 1 }}>
      <Title text="Email Preferences" style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 'bold' }} />
      <p className="ProfileRightSubText" style={{ fontWeight: 100 }}>
        Customize which emails you receive at {email} and how often.
      </p>
      <div className="ProfileInputsContainer">
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <OrangeButton
          text="Save Changes"
          disabled={false}
          onClick={() => null}
        />
      </div>
    </div>
  )
}

export default MyEmailPreferences

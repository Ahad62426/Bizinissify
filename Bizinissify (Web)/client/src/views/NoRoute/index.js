import React from 'react'

import { Title } from '../../components'
import './styles.css'

function NoRoute(props) {
  return (
    <div className="Container">
      <div className="Body">
        <div className="NoDataToShow LightShadow">
          <Title text="Page you are looking for is not available!" />
        </div>
      </div>
    </div>
  )
}

export default NoRoute

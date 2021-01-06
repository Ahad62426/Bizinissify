import React from 'react'

import './styles.css'

function AuthContainer ({ onClick, children, style }) {
  return (
    <div className="AuthContainer" style={style || {}}>
      <div className="close">
        <span className="closeText" onClick={onClick} >
          Close
        </span>
      </div>
      {children}
    </div>
  )
}

export { AuthContainer }

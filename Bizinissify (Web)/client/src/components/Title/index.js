import React from 'react'

import './styles.css'

function Title({ text, style }) {
  return (
    <p className="Title" style={style || {}}>{text}</p>
  )
}

export { Title }

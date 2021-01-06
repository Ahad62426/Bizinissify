import React from 'react'

import './styles.css'

function TextButton ({ className, text, onClick }) {
  return (
    <div>
      <button 
        className="TextButton"
        onClick={onClick} >
        <p className={className}>{text}</p>
      </button>
    </div>
  )
}

export { TextButton }

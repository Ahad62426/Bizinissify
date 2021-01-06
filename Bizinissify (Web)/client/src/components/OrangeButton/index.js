import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { SET_TOAST } from '../../constants/App'

import './styles.css'

function OrangeButton ({ onClick, text, style, disabled, disabledAction, children }) {
  
  const dispatch = useDispatch()

  return (
    <div>
      {disabled ?
        <button 
          className="OrangeButton"
          onClick={disabledAction ? disabledAction : () => dispatch(customisedAction(SET_TOAST, { message: 'Button is disable!', type: 'warning'}))}
          style={{ backgroundColor: 'rgb(255, 230, 204)', borderColor: 'rgb(255, 230, 204)', ...style }}>
          <p className="OrangeButtonText" style={{ color: 'white' }}>{text} {children}</p>
        </button>
        : <button 
          className="OrangeButton"
          style={style || {}}
          onClick={onClick}>
          <p className="OrangeButtonText">{text} {children}</p>
        </button>
      }
    </div>
  )
}

export { OrangeButton }

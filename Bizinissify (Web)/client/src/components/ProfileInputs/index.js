import React, { useState } from 'react'

import './styles.css'

function ProfileInputs ({ type, placeholder, title, alwaysEdit, dualInput, value, value2,  onClick, onChange, onChange2 }) {

  const [editable, setEditable] = useState(false)

  return (
    <div className="ProfileInputs">
      <div className="ProfileInputSection">
        <p className="ProfileInputTitle" >{title}</p>
        {editable || alwaysEdit ?
          <div style={{ display: 'flex', width: '50%', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <input
              className="Input"
              style={{ width: dualInput ? '50%' : '100%', marginRight: dualInput ? '5px' : '0px' }}
              type={type || 'text'}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={() => setEditable(false)}
              onKeyDown={ev => ev.key === 'Enter' ? setEditable(false) : null}
            />
            {dualInput ?
              <input
                className="Input"
                style={{ width: '50%', marginLeft: '5px' }}
                type={type || 'text'}
                placeholder={placeholder}
                value={value2}
                onChange={onChange2}
              />
              : null
            }
          </div>
          : <div className="extraInnerPadding"
              style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', flexDirection: 'row', cursor: 'pointer' }}
              onClick={onClick ? onClick : () => setEditable(true)}>
              <p
                style={{ fontWeight: "bold" }}
                className="ProfileInputTitle">{value}</p>
              <img className="ProfileInputarrow" src={require('../../assets/SVG/arrow_small.svg')} alt="Arrow" />
            </div>}
        </div>
    </div>
  )
}

export { ProfileInputs }

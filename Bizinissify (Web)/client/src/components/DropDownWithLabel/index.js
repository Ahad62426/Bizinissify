import React from 'react'

import { MORE_LIGHT_ORANGE } from '../../constants/Colors'

function DropDownWithLabel ({ label, placeholder, required, disabled, options, value, onChange }) {
  return (
    <div className="LightShadow" style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: MORE_LIGHT_ORANGE, margin: '10px', padding: '10px', borderRadius: '15px' }}>
      <p style={{ marginBottom: '5px' }}>
        {label}&nbsp;
        {required ? <span style={{ color: 'red' }}>*</span> : null}
      </p>
        <select className="Input DropDown" disabled={disabled} value={value} placeholder={placeholder} onChange={onChange}>
          <option value="" defaultValue>{placeholder}</option>
          {options.map(option => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
        </select>
    </div>
  )
}

export { DropDownWithLabel }

import React from 'react'
import { MORE_LIGHT_ORANGE } from '../../constants/Colors'

function InputWithLabel ({ label, type, placeholder, required, textArea, maxLength, value, onChange }) {
  return (
    <div className="LightShadow" style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: MORE_LIGHT_ORANGE, margin: '10px', padding: '10px', borderRadius: '15px' }}>
      <p style={{ marginBottom: '5px' }}>
        {label}&nbsp;
        {required ? <span style={{ color: 'red' }}>*</span> : null}
      </p>
      {textArea ? 
        <textarea
          className="Input" 
          style={{ fontSize: '13px', fontFamily: 'sans-serif' }}
          placeholder={placeholder}
          rows={5}
          value={value}
          onChange={onChange}
        />
        : 
        <input
          className="Input" 
          type={type || 'text'}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      }
      {maxLength ? 
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <p style={{ marginTop: '5px', fontSize: '10px' }}>{value.length} / {maxLength}</p>
        </div>
        : null
      }
    </div>
  )
}

export { InputWithLabel }

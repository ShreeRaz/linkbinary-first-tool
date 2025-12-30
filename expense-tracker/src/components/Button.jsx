import React from 'react'

export function PrimaryButton({label, onClick, className}) {
  return (
    <div className="primary-button" onClick={onClick}>
      <button className={className}>
        {label}
      </button>
    </div>
  )
}

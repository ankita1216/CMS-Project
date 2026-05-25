import React from 'react'

const BrandIcon = ({ label, size = 24, className = '' }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full border border-current font-bold uppercase leading-none ${className}`}
    style={{ width: size, height: size, fontSize: Math.max(8, size * 0.4) }}
    aria-hidden="true"
  >
    {label}
  </span>
)

export default BrandIcon

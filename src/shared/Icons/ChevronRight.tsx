import React from 'react'

export const ChevronRight = (props): React.ReactElement => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export const LinkChevronRight = (props): React.ReactElement => (
  <ChevronRight
    style={{
      marginTop: '-6px',
      marginLeft: '-4px',
      marginBottom: '-7px',
      marginRight: '-8px',
      transform: 'scale(0.75)',
    }}
    {...props}
  />
)

import React from 'react'
import { IIconProps } from './types'

export const AlertCircleIcon = (props: IIconProps): React.ReactElement => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="prefix__feather prefix__feather-alert-circle"
    {...props}
  >
    <title>Warning</title>
    <circle cx={12} cy={12} r={10} />
    <path d="M12 8v4M12 16h.01" />
  </svg>
)

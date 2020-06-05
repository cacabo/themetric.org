import React from 'react'
import { IIconProps } from './types'

export const InfoIcon = (props: IIconProps): React.ReactElement => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>Info</title>
    <circle cx={12} cy={12} r={10} />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
)

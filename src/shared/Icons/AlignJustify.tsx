import * as React from 'react'
import { IIconProps } from './types'

export const AlignJustifyIcon = (props: IIconProps): React.ReactElement => (
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
    <title>Align Justify</title>
    <path d="M21 10H3M21 6H3M21 14H3M21 18H3" />
  </svg>
)

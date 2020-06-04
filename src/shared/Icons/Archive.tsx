import * as React from 'react'
import { IIconProps } from './types'

export const ArchiveIcon = (props: IIconProps): React.ReactElement => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="prefix__feather prefix__feather-archive"
    {...props}
  >
    <title>Archive</title>
    <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
  </svg>
)

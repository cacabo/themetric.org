import s from 'styled-components'

export * from './AlignJustify'
export * from './Archive'
export * from './ChevronRight'
export * from './Facebook'
export * from './Link'
export * from './MapPin'
export * from './Menu'
export * from './Twitter'
export * from './Wave'

export const IconWrapper = s.span`
  svg {
    transform-origin: bottom;
    transform: scale(0.8) translateY(4px);
    display: inline-block;
    margin-right: 0.4rem;
  }
`

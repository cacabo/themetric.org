export const HEADER_CONTENT_HEIGHT = '2rem'
export const HEADER_PADDING = '0.5rem'
export const HEADER_HEIGHT = `calc(${HEADER_CONTENT_HEIGHT} + ${HEADER_PADDING} + ${HEADER_PADDING})`
export const HEADER_Z_INDEX = 1000
export const MOBILE_HEADER_HEIGHT = '52px'

export const M0 = '0'
export const M1 = '0.4rem'
export const M2 = '0.8rem'
export const M3 = '1.2rem'
export const M4 = '1.6rem'

export const BORDER_RADIUS = '3px'
export const BORDER_RADIUS_LG = '9px'

export const SHORT_ANIMATION_DURATION = 200
export const LONG_ANIMATION_DURATION = 400

type TScreenWidth = string

export const DESKTOP_WIDTH = 1248
export const DESKTOP: TScreenWidth = `${DESKTOP_WIDTH}px`
export const TABLET_WIDTH = 992
export const TABLET: TScreenWidth = `${TABLET_WIDTH}px`
export const PHONE_WIDTH = 584
export const PHONE: TScreenWidth = `${PHONE_WIDTH}px`

type TMediaQuery = string

export const minWidth = (w: TScreenWidth): TMediaQuery =>
  `@media screen and (min-width: ${w})`
export const maxWidth = (w: TScreenWidth): TMediaQuery =>
  `@media screen and (max-width: ${w})`

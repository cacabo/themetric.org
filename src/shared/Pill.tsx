import s from 'styled-components'
import { DARK_GRAY_2, LIGHT_GRAY_1, GRAY_5 } from '../constants/colors'
import { MEDIUM_FONT_WEIGHT } from '../constants/fonts'
import { M1, M2, SHORT_ANIMATION_DURATION } from '../constants/measurements'
import { Link } from 'gatsby'

export const PillsWrapper = s.div`
  width: 100%;
  text-align: center;
`

export const Pill = s(Link)`
  padding: ${M1} ${M2};
  margin: 0 ${M1} ${M2} ${M1};
  border-radius: 24px;
  background: ${LIGHT_GRAY_1};
  color: ${DARK_GRAY_2};
  font-weight: ${MEDIUM_FONT_WEIGHT};
  transition: background ${SHORT_ANIMATION_DURATION}ms ease;
  display: inline-block;

  &:hover,
  &:focus,
  &:active {
    background: ${GRAY_5};
  }
`

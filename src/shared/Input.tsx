import s from 'styled-components'
import {
  BORDER_RADIUS_LG,
  M2,
  SHORT_ANIMATION_DURATION,
  M1,
} from '../constants/measurements'
import { BORDER, WHITE, BLUE } from '../constants/colors'
import { outlineStyles } from '../constants/theme'

export const Input = s.input`
  border-radius: ${BORDER_RADIUS_LG};
  box-shadow: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${BORDER};
  padding: ${M1} ${M2};
  background: ${WHITE};
  width: 100%;
  transition: all ${SHORT_ANIMATION_DURATION}ms ease;
  font-size: 16px;

  &:focus,
  &:active {
    border-color: ${BLUE};
  }

  &:focus {
    ${outlineStyles}
  }
`

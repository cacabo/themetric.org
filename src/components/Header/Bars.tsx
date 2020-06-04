import React from 'react'
import s from 'styled-components'

import {
  minWidth,
  PHONE,
  SHORT_ANIMATION_DURATION,
  TABLET,
} from '../../constants/measurements'
import { WHITE } from '../../constants/colors'
import { MenuIcon } from '../../shared'

const Wrapper = s.div<{}>`
  padding: 10px 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 4px;
  opacity: 0.8;
  transition: opacity ${SHORT_ANIMATION_DURATION}ms ease;

  &:hover {
    opacity: 0.5;
  }

  ${minWidth(TABLET)} {
    display: none;
  }
`

interface IBarsProps {
  handleClick: () => void
}

export const Bars = ({ handleClick }: IBarsProps): React.ReactElement => (
  <Wrapper onClick={handleClick}>
    <MenuIcon
      style={{
        color: WHITE,
        width: '24px',
        height: '24px',
        lineHeight: 0,
        display: 'block',
      }}
    />
  </Wrapper>
)

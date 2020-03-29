import React, { useState } from 'react'
import styled from 'styled-components'

import { Shade, Container } from '../../shared'
import { Links } from './Links'
import { Bars } from './Bars'
import { Logo } from './Logo'

import {
  maxWidth,
  PHONE,
  HEADER_CONTENT_HEIGHT,
  HEADER_PADDING,
  HEADER_Z_INDEX,
  MOBILE_HEADER_HEIGHT,
} from '../../constants/measurements'
import { BLACK_ALPHA, BLACK } from '../../constants/colors'

const StyledNav = styled.nav<{ active: boolean }>`
  padding-top: ${HEADER_PADDING};
  padding-bottom: ${HEADER_PADDING};
  position: relative;
  top: 0;
  z-index: ${HEADER_Z_INDEX};
  width: 100%;
  min-height: calc(
    ${HEADER_CONTENT_HEIGHT} + ${HEADER_PADDING} + ${HEADER_PADDING}
  );
  background: ${BLACK};
  box-shadow: 0 1px 4px ${BLACK_ALPHA(0.2)};

  ${maxWidth(PHONE)} {
    min-height: 0;
    max-height: ${(props): string =>
      // Kinda kills the close transition, but it's a hack to get the height right
      props.active ? '100vh' : MOBILE_HEADER_HEIGHT};
    overflow: hidden;
    box-shadow: 0 1px 8px ${BLACK_ALPHA(0.2)};
  }
`

const StyledContainer = styled(Container)<{}>`
  display: flex;
  flex-direction: row;

  ${maxWidth(PHONE)} {
    display: block;
  }
`

export const Header = (): React.ReactElement => {
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      <StyledNav active={active}>
        <StyledContainer>
          <Logo />
          <Bars handleClick={(): void => setActive(!active)} />
          <Links active={active} />
        </StyledContainer>
      </StyledNav>
      <Shade
        tabIndex={-1}
        zIndex={HEADER_Z_INDEX - 1}
        show={active}
        onClick={(): void => setActive(!active)}
      />
    </>
  )
}

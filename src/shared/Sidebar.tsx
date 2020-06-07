import React, { useEffect, useRef } from 'react'
import s, { css } from 'styled-components'
import { Link } from 'gatsby'
import {
  WHITE,
  GRAY_2,
  GRAY_3,
  BLACK,
  DARK_GRAY_1,
  DARK_GRAY_3,
  WHITE_ALPHA,
  DARK_GRAY_2,
} from '../constants/colors'
import {
  HEADER_Z_INDEX,
  LONG_ANIMATION_DURATION,
  HEADER_HEIGHT,
  M2,
  SHORT_ANIMATION_DURATION,
  M1,
  minWidth,
  TABLET,
  maxWidth,
  PHONE,
} from '../constants/measurements'
import { disableBodyScroll, enableBodyScroll } from '../helpers/misc'
import { MEDIUM_FONT_WEIGHT } from '../constants/fonts'
import { ESCAPE_KEY } from '../constants/keys'
import { outlineStyles } from '../constants/theme'
import { P, H3 } from './Typography'
import { XIcon } from './Icons'
import { Shade } from './Shade'

const Wrapper = s.div<{ show: boolean }>`
  position: fixed;
  width: 24rem;
  max-width: 100vw;
  color: ${WHITE};
  background: ${BLACK};
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 0;
  transition: right ${LONG_ANIMATION_DURATION}ms ease;
  right: ${(props): string => (props.show ? '0' : '-100vw')};
  z-index: ${HEADER_Z_INDEX + 2};
  border-left: 1px solid ${DARK_GRAY_3};

  ${maxWidth(PHONE)} {
    width: 100%;
  }

  ${minWidth(TABLET)} {
    width: calc(24rem + 5vw);
  }
`

const sharedStyles = css`
  padding-top: ${M1};
  padding-bottom: ${M1};
  padding-left: ${M2};
  padding-right: ${M2};
  border-bottom: 1px solid ${DARK_GRAY_3};
  width: 100%;

  ${minWidth(TABLET)} {
    padding-top: calc(${M1} + 0.625vh);
    padding-bottom: calc(${M1} + 0.625vh);
    padding-left: calc(${M2} + 0.625vw);
    padding-right: calc(${M2} + 0.625vw);
  }
`

const Header = s.div`
  height: ${HEADER_HEIGHT};
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  ${sharedStyles}
`

export const SidebarHeader = s(P)`
  background: ${DARK_GRAY_2};
  margin-bottom: 0;
  font-weight: ${MEDIUM_FONT_WEIGHT};
  color: ${WHITE_ALPHA(0.8)};
  ${sharedStyles}
`

export const SidebarDiv = s.div`
  ${sharedStyles}
`

export const SidebarLink = s(Link)`
  box-sizing: border-box;
  background: ${BLACK};
  color: ${WHITE_ALPHA(0.8)};
  display: inline-block;
  transition: background ${SHORT_ANIMATION_DURATION}ms ease,
              color ${SHORT_ANIMATION_DURATION}ms ease;
  ${sharedStyles}

  &:hover,
  &:focus,
  &:active {
    background: ${DARK_GRAY_1};
    color: ${WHITE};
  }
`

const Close = s.a`
  margin-left: auto;
  display: inline-block;
  padding: 4px;
  margin-right: -4px;
  height: 32px;
  cursor: pointer;
  color: ${GRAY_2};
  transition: color ${SHORT_ANIMATION_DURATION}ms ease;
  border-radius: 50%;

  &:hover,
  &:active,
  &:focus {
    color: ${GRAY_3};
  }

  &:focus {
    ${outlineStyles}
  }
`

export const Sidebar = ({
  show,
  setShow,
  title,
  children,
}: {
  show: boolean
  title: string
  setShow: (show: boolean) => void
  children: React.ReactNode | React.ReactNodeArray
}): React.ReactElement => {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === ESCAPE_KEY) {
        setShow(false)
      }
    }

    // Disable scroll on body when the navbar is active
    if (show) {
      const current = ref?.current
      if (current) {
        current.focus()
      }

      document.addEventListener('keydown', handleEscape)
      disableBodyScroll()
    } else {
      document.removeEventListener('keydown', handleEscape)
      enableBodyScroll()
    }
  }, [show, setShow])

  return (
    <>
      <Wrapper show={show}>
        <Header>
          <H3 mb0 white>
            {title}
          </H3>
          <Close onClick={(): void => setShow(false)} ref={ref} tabIndex={0}>
            <XIcon />
          </Close>
        </Header>
        {children}
      </Wrapper>
      <Shade
        tabIndex={-1}
        zIndex={HEADER_Z_INDEX + 1}
        show={show}
        onClick={(): void => setShow(false)}
      />
    </>
  )
}

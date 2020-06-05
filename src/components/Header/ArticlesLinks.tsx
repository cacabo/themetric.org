import React, { useEffect } from 'react'
import s, { css } from 'styled-components'
import {
  WHITE,
  GRAY_2,
  GRAY_3,
  BLACK,
  DARK_GRAY_1,
  DARK_GRAY_3,
  WHITE_ALPHA,
  DARK_GRAY_2,
} from '../../constants/colors'
import {
  HEADER_Z_INDEX,
  LONG_ANIMATION_DURATION,
  HEADER_HEIGHT,
  M2,
  SHORT_ANIMATION_DURATION,
  M1,
  minWidth,
  TABLET,
} from '../../constants/measurements'
import { disableBodyScroll, enableBodyScroll } from '../../helpers/misc'
import { H3, XIcon, P } from '../../shared'
import {
  ARTICLES_ROUTE,
  HOME_ROUTE,
  REGION_ROUTE,
} from '../../constants/routes'
import { Link } from 'gatsby'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'
import { REGIONS, ERegionSlug } from '../../constants/regions'

const Wrapper = s.div<{ show: boolean }>`
  position: fixed;
  width: 24rem;
  max-width: 100vw;
  background: ${BLACK};
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 0;
  transition: right ${LONG_ANIMATION_DURATION}ms ease;
  right: ${(props): string => (props.show ? '0' : '-100vw')};
  z-index: ${HEADER_Z_INDEX + 2};
  border-left: 1px solid ${DARK_GRAY_3};

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

const SectionHeader = s(P)`
  background: ${DARK_GRAY_2};
  margin-bottom: 0;
  font-weight: ${MEDIUM_FONT_WEIGHT};
  color: ${WHITE_ALPHA(0.8)};
  ${sharedStyles}
`

const StyledLink = s(Link)`
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

  &:hover,
  &:active,
  &:focus {
    color: ${GRAY_3};
  }
`

// escape to close

export const ArticlesLinks = ({
  show,
  toggle,
}: {
  show: boolean
  toggle: () => void
}): React.ReactElement => {
  useEffect(() => {
    // Disable scroll on body when the navbar is active
    if (show) {
      disableBodyScroll()
    } else {
      enableBodyScroll()
    }
  }, [show])

  return (
    <Wrapper show={show}>
      <Header>
        <H3 mb0 white>
          Articles
        </H3>
        <Close onClick={toggle}>
          <XIcon />
        </Close>
      </Header>
      <StyledLink to={HOME_ROUTE}>Home</StyledLink>
      <StyledLink to={ARTICLES_ROUTE}>All articles</StyledLink>
      <SectionHeader sm>Regions</SectionHeader>
      {(Object.keys(REGIONS) as ERegionSlug[]).map(
        (region): React.ReactElement => (
          <StyledLink to={REGION_ROUTE(region)} key={region}>
            {REGIONS[region]}
          </StyledLink>
        ),
      )}
      <SectionHeader sm>Tags</SectionHeader>
      <StyledLink to="#">TODO</StyledLink>
    </Wrapper>
  )
}

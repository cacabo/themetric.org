import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import {
  maxWidth,
  minWidth,
  TABLET,
  DESKTOP,
  SHORT_ANIMATION_DURATION,
  HEADER_CONTENT_HEIGHT,
} from '../../constants/measurements'
import { WHITE } from '../../constants/colors'
import { DISPLAY_FONT } from '../../constants/fonts'
import { HOME_ROUTE, ABOUT_ROUTE } from '../../constants/routes'

interface ILinksProps {
  active: boolean
  toggleArticlesLinksActive: () => void
}

const LinksWrapper = styled.div<{ active: boolean }>`
  margin-left: auto;
  height: ${HEADER_CONTENT_HEIGHT};
  align-items: center;
  display: flex;
  justify-content: flex-end;

  ${maxWidth(TABLET)} {
    height: auto;
    flex: none;
    display: block;
    overflow: hidden;
    transition: max-height ${SHORT_ANIMATION_DURATION}ms ease,
      opacity ${SHORT_ANIMATION_DURATION}ms ease;
    max-height: ${({ active }): string => (active ? '100vh' : '0')};
    opacity: ${({ active }): string => (active ? '1' : '0')};
  }
`

const Spacer = styled.div<{}>`
  display: none;

  ${maxWidth(TABLET)} {
    display: block;
    width: 100%;
    height: 0.5rem;
  }
`

const StyledLink = styled(Link)<{}>`
  line-height: 1;
  display: inline-block;
  margin-left: 1rem;
  color: ${WHITE} !important;
  opacity: 0.64;
  text-decoration: none !important;
  cursor: pointer;
  transition: opacity ${SHORT_ANIMATION_DURATION}ms ease;
  font-family: ${DISPLAY_FONT};
  margin-bottom: 2px;

  &:hover,
  &:active {
    opacity: 1;
  }

  ${minWidth(DESKTOP)} {
    margin-left: calc(1rem + 1.25vw);
  }

  ${maxWidth(TABLET)} {
    margin-bottom: 0;
    width: 100%;
    text-align: center;
    display: block;
    margin: 0.5rem 0;
    line-height: 2rem;
    font-size: 1.2rem;
    padding: 0.625vh 0;
  }
`

const StyledSearchLink = styled(StyledLink)`
  ${minWidth(TABLET)} {
    display: none;
  }
`

const links: string[][] = [
  ['Home', HOME_ROUTE],
  ['About', ABOUT_ROUTE],
]

export const Links = ({
  active,
  toggleArticlesLinksActive,
}: ILinksProps): React.ReactElement => (
  <LinksWrapper active={active}>
    <Spacer />
    <StyledSearchLink as="a">Search</StyledSearchLink>
    {links.map(([text, link]) => (
      <StyledLink to={link} key={link}>
        {text}
      </StyledLink>
    ))}
    <StyledLink as="a" onClick={toggleArticlesLinksActive}>
      Articles
    </StyledLink>
  </LinksWrapper>
)

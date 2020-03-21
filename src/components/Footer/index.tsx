import React from 'react'
import styled from 'styled-components'

import { Row, Col, P, Container, H4 } from '../../shared'
import { BLACK, WHITE } from '../../constants/colors'
import { Link } from 'gatsby'
import {
  MARGIN_LG,
  minWidth,
  PHONE,
  MARGIN,
  maxWidth,
} from '../../constants/measurements'
import {
  FACEBOOK_LINK,
  HOME_ROUTE,
  ABOUT_ROUTE,
  ARTICLES_ROUTE,
} from '../../constants/routes'

const logoPath = require('../../images/svg/logo-white.svg') as string // tslint:disable-line

const FooterTag = styled.footer<{}>`
  width: 100%;
  background: ${BLACK};
  color: ${WHITE};
  padding: calc(1rem + 1.25vh) 0;
`

const Logo = styled.img<{}>`
  height: 2.5rem;
  width: auto;
`

const StyledLink = styled.a<{}>`
  color: ${WHITE};
`

const InternalLink = styled(Link)<{}>`
  color: ${WHITE};
  text-decoration: none !important;
  opacity: 0.64;

  &:hover,
  &:focus,
  &:active {
    opacity: 0.8;
  }
`

const SectionHeader = styled(P)<{}>`
  opacity: 0.8;
  font-weight: bold;

  ${minWidth(PHONE)} {
    margin-top: calc(2.5rem - 12.2px);
  }

  ${maxWidth(PHONE)} {
    margin-top: 2rem;
  }
`

// TODO icons
// TODO mailing list

const links: string[][] = [
  ['Home', HOME_ROUTE],
  ['About', ABOUT_ROUTE],
  ['Articles', ARTICLES_ROUTE],
]

export const Footer = () => (
  <FooterTag>
    <Container>
      <Row margin={MARGIN_LG}>
        <Col sm={12} md={12} lg={4} margin={MARGIN_LG}>
          <Logo src={logoPath} alt="The Metric logo" />
          <P white opacity={0.8}>
            Measuring what's happening around the world through your voice
          </P>
          <P white sm opacity={0.64}>
            Website by{' '}
            <StyledLink href="https://www.cameroncabo.com">
              Cameron Cabo
            </StyledLink>{' '}
            &copy; {new Date().getFullYear()}, all rights reserved. Made with
            &hearts; in Philadelphia and around the world.
          </P>
        </Col>
        <Col sm={12} md={12} offsetLg={1} lg={3} margin={MARGIN_LG}>
          <SectionHeader white mb2>
            Navigation
          </SectionHeader>
          {links.map(([text, link]) => (
            <P key={link} style={{ marginBottom: MARGIN }} mb2>
              <InternalLink to={link}>{text}</InternalLink>
            </P>
          ))}
        </Col>
        <Col sm={12} md={12} lg={3} margin={MARGIN_LG}>
          <SectionHeader white mb2>
            Keep in Touch
          </SectionHeader>
          <P mb0>
            <InternalLink to={FACEBOOK_LINK}>Facebook</InternalLink>
          </P>
        </Col>
      </Row>
    </Container>
  </FooterTag>
)

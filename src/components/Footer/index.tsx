import React from 'react'
import styled from 'styled-components'

import { Row, Col, P, Container } from '../../shared'
import { BLACK, WHITE } from '../../constants/colors'
import { Link } from 'gatsby'
import { M2, minWidth, PHONE, maxWidth } from '../../constants/measurements'
import {
  FACEBOOK_LINK,
  HOME_ROUTE,
  ABOUT_ROUTE,
  ARTICLES_ROUTE,
  CONTACT_ROUTE,
  CAMERON_LINK,
  TWITTER_LINK,
  LINKEDIN_LINK,
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
  user-select: none;
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

interface IExternalLinkProps {
  children: React.ReactNode
  href: string
  target?: '_BLANK'
  rel?: 'noopener noreferrer'
}

const ExternalLink = ({
  children,
  ...props
}: IExternalLinkProps): React.ReactElement => (
  <InternalLink {...props} as="a">
    {children}
  </InternalLink>
)

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

// TODO icons?

const links: string[][] = [
  ['Home', HOME_ROUTE],
  ['About', ABOUT_ROUTE],
  ['Articles', ARTICLES_ROUTE],
]

export const Footer = (): React.ReactElement => (
  <FooterTag>
    <Container>
      <Row margin={M2}>
        <Col sm={12} md={12} lg={4} margin={M2}>
          <Logo src={logoPath} alt="The Metric logo" />
          <P white opacity={0.8}>
            Measuring what&apos;s happening around the world through your voice
          </P>
          <P white sm opacity={0.64}>
            Website by{' '}
            <StyledLink
              href={CAMERON_LINK}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              Cameron Cabo
            </StyledLink>{' '}
            &copy; {new Date().getFullYear()}, all rights reserved. Made with
            &hearts; in Philadelphia and around the world.
          </P>
        </Col>
        <Col sm={12} md={12} offsetLg={1} lg={3} margin={M2}>
          <SectionHeader white mb2>
            Navigation
          </SectionHeader>
          {links.map(([text, link]) => (
            <P key={link} mb1>
              <InternalLink to={link}>{text}</InternalLink>
            </P>
          ))}
        </Col>
        <Col sm={12} md={12} lg={3} margin={M2}>
          <SectionHeader white mb2>
            Keep in Touch
          </SectionHeader>
          <P mb1>
            <ExternalLink
              href={FACEBOOK_LINK}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              Facebook
            </ExternalLink>
          </P>
          <P mb1>
            <ExternalLink
              href={TWITTER_LINK}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              Twitter
            </ExternalLink>
          </P>
          <P mb1>
            <ExternalLink
              href={LINKEDIN_LINK}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              LinkedIn
            </ExternalLink>
          </P>
          <P mb0>
            <InternalLink to={CONTACT_ROUTE}>Contact us</InternalLink>
          </P>
        </Col>
      </Row>
    </Container>
  </FooterTag>
)

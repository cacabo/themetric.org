import React from 'react'
import styled from 'styled-components'

import { Row, Col, P, Container } from '../../shared'
import { BLACK, WHITE, WHITE_ALPHA } from '../../constants/colors'
import { Link } from 'gatsby'
import {
  M2,
  M4,
  minWidth,
  TABLET,
  maxWidth,
} from '../../constants/measurements'
import {
  FACEBOOK_LINK,
  HOME_ROUTE,
  ABOUT_ROUTE,
  ARTICLES_ROUTE,
  CONTACT_ROUTE,
  CAMERON_LINK,
  TWITTER_LINK,
  LINKEDIN_LINK,
  RSS_ROUTE,
  REGION_ROUTE,
} from '../../constants/routes'
import { REGIONS, ERegionSlug } from '../../constants/regions'

const logoPath = require('../../images/svg/logo-white.svg') as string // tslint:disable-line

const FooterTag = styled.footer<{}>`
  width: 100%;
  background: ${BLACK};
  color: ${WHITE};
  padding: calc(${M2} + 1.25vh) 0;

  ${minWidth(TABLET)} {
    padding: calc(${M4} + 1.25vh) 0;
  }
`

const LogoWrapper = styled.div<{}>`
  width: 100%;
  text-align: center;
  margin-top: ${M4};
  padding-top: ${M4};
  border-top: 1px solid ${WHITE_ALPHA(0.2)};
`

const Logo = styled.img<{}>`
  height: 2.5rem;
  width: auto;
  user-select: none;
  display: inline-block;
  margin-bottom: 0;
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

  ${maxWidth(TABLET)} {
    margin-top: calc(${M2} + 1.25vh);
  }
`

// TODO icons for social?

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

        <Col sm={12} md={12} offsetLg={1} lg={7 / 3} margin={M2}>
          <SectionHeader white mb2>
            Navigation
          </SectionHeader>
          {links.map(([text, link]) => (
            <P key={link} mb1>
              <InternalLink to={link}>{text}</InternalLink>
            </P>
          ))}
        </Col>

        <Col sm={12} md={12} lg={7 / 3} margin={M2}>
          <SectionHeader white mb2>
            Regions
          </SectionHeader>
          {(Object.keys(REGIONS) as ERegionSlug[]).map(
            (slug): React.ReactElement => (
              <P key={slug} mb1>
                <InternalLink to={REGION_ROUTE(slug)}>
                  {REGIONS[slug]}
                </InternalLink>
              </P>
            ),
          )}
        </Col>

        <Col sm={12} md={12} lg={7 / 3} margin={M2}>
          <SectionHeader white mb2>
            Keep in Touch
          </SectionHeader>
          {[
            [FACEBOOK_LINK, 'Facebook'],
            [TWITTER_LINK, 'Twitter'],
            [LINKEDIN_LINK, 'LinkedIn'],
            [RSS_ROUTE, 'RSS feed'],
          ].map(([link, text]) => (
            <P mb1 key={link}>
              <ExternalLink
                href={link}
                target="_BLANK"
                rel="noopener noreferrer"
              >
                {text}
              </ExternalLink>
            </P>
          ))}

          <P mb0>
            <InternalLink to={CONTACT_ROUTE}>Contact us</InternalLink>
          </P>
        </Col>
      </Row>
      <LogoWrapper>
        <Logo src={logoPath} alt="The Metric logo" />
      </LogoWrapper>
    </Container>
  </FooterTag>
)

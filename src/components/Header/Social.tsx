import * as React from 'react'
import s from 'styled-components'
import { FacebookIcon, TwitterIcon, LinkedInIcon, RSSIcon } from '../../shared'
import {
  FACEBOOK_LINK,
  LINKEDIN_LINK,
  TWITTER_LINK,
  RSS_ROUTE,
} from '../../constants/routes'
import { WHITE } from '../../constants/colors'
import {
  SHORT_ANIMATION_DURATION,
  maxWidth,
  TABLET,
  M2,
} from '../../constants/measurements'

const SocialWrapper = s.div`
  width: auto;
  margin-top: 8px;

  // Don't influence height of the navbar
  margin-bottom: -8px;

  a {
    margin-left: 16px;
    opacity: 0.5;
    transition: all ${SHORT_ANIMATION_DURATION}ms ease;
    vertical-align: middle;

    &:hover,
    &:active,
    &:focus {
      opacity: 1;
    }
  }

  ${maxWidth(TABLET)} {
    width: 100%;
    text-align: center;
    margin-top: ${M2};

    a {
      margin-right: 12px;
      margin-left: 12px;
    }
  }
`

const iconStyles: React.CSSProperties = {
  color: WHITE,
}

export const Social = (): React.ReactElement => (
  <SocialWrapper>
    <a href={FACEBOOK_LINK} target="_BLANK" rel="noopener noreferrer">
      <FacebookIcon style={iconStyles} />
    </a>
    <a href={TWITTER_LINK} target="_BLANK" rel="noopener noreferrer">
      <TwitterIcon style={iconStyles} />
    </a>
    <a href={LINKEDIN_LINK} target="_BLANK" rel="noopener noreferrer">
      <LinkedInIcon style={iconStyles} />
    </a>
    <a href={RSS_ROUTE} target="_BLANK" rel="noopener noreferrer">
      <RSSIcon style={iconStyles} />
    </a>
  </SocialWrapper>
)

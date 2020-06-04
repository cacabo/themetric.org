import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import {
  P,
  TwitterIcon,
  FacebookIcon,
  MailIcon,
  LinkedInIcon,
} from '../../shared'
import { M2 } from '../../constants/measurements'
import {
  FACEBOOK_COLOR,
  TWITTER_COLOR,
  MAIL_COLOR,
  LINKEDIN_COLOR,
} from '../../constants/colors'

const ShareArticleWrapper = s.div<{}>`
  margin-top: ${M2};

  p {
    display: inline-block;
    transform: translateY(-6px);
  }

  svg {
    margin-left: 12px;
  }
`

export const ShareArticle = ({
  title,
}: {
  title: string
}): React.ReactElement => {
  const [
    { facebookLink, twitterLink, mailLink, linkedInLink },
    setState,
  ] = useState<{
    facebookLink: string
    twitterLink: string
    linkedInLink: string
    mailLink: string
  }>({
    facebookLink: '#',
    twitterLink: '#',
    linkedInLink: '#',
    mailLink: '#',
  })

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.location === 'undefined'
    ) {
      return
    }

    const encodedURL = encodeURIComponent(window.location.href)
    const encodedTitle = encodeURIComponent(title)
    const newFacebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`
    const newTwitterLink = `https://twitter.com/share?url=${encodedURL}`
    const newLinkedInLink = `https://www.linkedin.com/share?url=${encodedURL}`
    const newMailLink = `mailto:?&subject=${encodedTitle}&body=${encodedURL}`

    setState({
      facebookLink: newFacebookLink,
      twitterLink: newTwitterLink,
      linkedInLink: newLinkedInLink,
      mailLink: newMailLink,
    })
  }, [title])

  return (
    <ShareArticleWrapper>
      <P mb0 sm lighter>
        Share
      </P>
      <a href={facebookLink} target="_BLANK" rel="noopener noreferrer">
        <FacebookIcon fill={FACEBOOK_COLOR} />
      </a>
      <a href={twitterLink} target="_BLANK" rel="noopener noreferrer">
        <TwitterIcon fill={TWITTER_COLOR} />
      </a>
      <a href={mailLink} target="_BLANK" rel="noopener noreferrer">
        <MailIcon fill={MAIL_COLOR} />
      </a>
      <a href={linkedInLink} target="_BLANK" rel="noopener noreferrer">
        <LinkedInIcon fill={LINKEDIN_COLOR} />
      </a>
    </ShareArticleWrapper>
  )
}

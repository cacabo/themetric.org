import * as React from 'react'
import s from 'styled-components'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import {
  WideContainer,
  H1,
  P,
  LinkIcon,
  IconWrapper,
  FacebookIcon,
  TwitterIcon,
  ArchiveIcon,
  MapPinIcon,
  Center,
  ResponsiveSpacer,
  Spacer,
  HR,
  BriefcaseIcon,
  BtnAnchor,
  backgroundStyles,
} from '../shared'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { IAuthor, IArticlePreview } from '../types'
import { TWITTER_PAGE_LINK, FACEBOOK_PAGE_LINK } from '../constants/routes'
import { M2, minWidth, M4, PHONE } from '../constants/measurements'
import { useState } from 'react'
import BackgroundImage from 'gatsby-background-image'

const Header = s.div`
  display: block;
  width: 100%;

  ${minWidth(PHONE)} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const ProfileImage = s.div`
  ${backgroundStyles}

  border-radius: 50%;
  overflow: hidden;
  margin-bottom: ${M4};
  width: 6rem;
  height: 6rem;

  ${minWidth(PHONE)} {
    margin-right: calc(${M2} + 1.25vw);
    width: 8rem;
    height: 8rem;
    margin-bottom: 0;
  }
`

const POSTS_PER_PAGE = 10

interface IAuthorTemplateProps {
  data: {
    ghostAuthor?: IAuthor
    ghostAuthorManual?: IAuthor
    allGhostPost: {
      nodes: IArticlePreview[]
    }
  }
}

const AuthorTemplate = ({ data }: IAuthorTemplateProps): React.ReactElement => {
  const {
    ghostAuthor,
    ghostAuthorManual,
    allGhostPost: { nodes: articles },
  } = data

  const {
    bio,
    facebookUsername,
    loc,
    role,
    name,
    postCount,
    twitterUsername,
    website,
    localImage,
    profile_image,
  } = (ghostAuthor || ghostAuthorManual) as IAuthor

  const fluid = localImage?.childImageSharp?.fluid

  const [articlesToShow, setArticlesToShow] = useState<IArticlePreview[]>(
    articles.slice(0, POSTS_PER_PAGE),
  )

  const loadMoreArticles = (): void => {
    const newNumArticlesToShow: number = articlesToShow.length + POSTS_PER_PAGE
    setArticlesToShow(articles.slice(0, newNumArticlesToShow))
  }

  const areMoreArticlesToShow: boolean = articles.length > articlesToShow.length

  return (
    <Layout>
      <Meta title={name} description={bio} />
      <WideContainer>
        <ResponsiveSpacer hiddenOnMobile />
        <Spacer />

        <Header>
          {fluid && <ProfileImage as={BackgroundImage} fluid={fluid} />}
          {!fluid && profile_image && (
            <ProfileImage
              style={{ backgroundImage: `url(${profile_image})` }}
            />
          )}
          <div style={{ flex: 1 }}>
            <H1 mb2>{name}</H1>
            <P mb0>{bio}</P>
          </div>
        </Header>

        <HR />

        {role && (
          <P lighter mb2 sm>
            <IconWrapper>
              <BriefcaseIcon />
            </IconWrapper>
            {role}
          </P>
        )}
        {loc && (
          <P lighter mb2 sm>
            <IconWrapper>
              <MapPinIcon />
            </IconWrapper>
            {loc}
          </P>
        )}
        {website && (
          <P lighter mb2 sm>
            <IconWrapper>
              <LinkIcon />
            </IconWrapper>
            <a href={website} target="_BLANK" rel="noopener noreferrer">
              {website}
            </a>
          </P>
        )}
        {facebookUsername && (
          <P lighter mb2 sm>
            <IconWrapper>
              <FacebookIcon />
            </IconWrapper>
            <a
              href={FACEBOOK_PAGE_LINK(facebookUsername)}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              {facebookUsername}
            </a>
          </P>
        )}
        {twitterUsername && (
          <P lighter mb2 sm>
            <IconWrapper>
              <TwitterIcon />
            </IconWrapper>
            <a
              href={TWITTER_PAGE_LINK(twitterUsername)}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              {twitterUsername}
            </a>
          </P>
        )}
        <P lighter mb2 sm>
          <IconWrapper>
            <ArchiveIcon />
          </IconWrapper>
          {postCount || 0} post{postCount !== 1 && 's'}
        </P>

        <HR />

        <ArticlePreviews articles={articlesToShow} />

        {areMoreArticlesToShow && (
          <Center>
            <BtnAnchor onClick={loadMoreArticles}>Load more articles</BtnAnchor>
          </Center>
        )}

        <Spacer />
      </WideContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    ghostAuthor(slug: { eq: $slug }) {
      ...Author
    }

    ghostAuthorManual(slug: { eq: $slug }) {
      ...AuthorManual
    }

    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        ...ArticlePreview
      }
    }
  }
`

export default AuthorTemplate

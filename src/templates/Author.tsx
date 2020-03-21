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
  BtnLink,
  Center,
  ResponsiveSpacer,
  Spacer,
  HR,
} from '../shared'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { IAuthor, IArticlePreview } from '../types'
import { ABOUT_ROUTE } from '../constants/routes'
import { M2, TABLET, minWidth } from '../constants/measurements'

const ProfileImage = s.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  margin-bottom: ${M2};
  width: 6rem;
  height: 6rem;

  ${minWidth(TABLET)} {
    float: right;
    margin-left: ${M2};
    width: 5.5rem;
    height: 5.5rem;
  }
`

// TODO posts by this author

interface IAuthorTemplateProps {
  data: {
    ghostAuthor: IAuthor
    allGhostPost: {
      edges
    }
  }
}

const AuthorTemplate = ({ data }: IAuthorTemplateProps): React.ReactElement => {
  const {
    ghostAuthor: {
      bio,
      facebook,
      location,
      name,
      postCount,
      profile_image,
      twitter,
      website,
    },
    allGhostPost: { edges: articleNodes },
  } = data

  const articles: IArticlePreview[] = articleNodes.map(({ node }) => node)

  return (
    <Layout>
      <Meta title={name} description={bio} />
      <WideContainer>
        <ResponsiveSpacer hiddenOnMobile />
        <Spacer />

        {profile_image && <ProfileImage src={profile_image} />}
        <H1 mb2>{name}</H1>
        <P>{bio}</P>

        <HR />

        {location && (
          <P lighter mb2 sm>
            <IconWrapper>
              <MapPinIcon />
            </IconWrapper>
            {location}
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
        {facebook && (
          <P lighter mb2 sm>
            <IconWrapper>
              <FacebookIcon />
            </IconWrapper>
            <a
              href={`https://www.facebook.com/${facebook}`}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              {facebook}
            </a>
          </P>
        )}
        {twitter && (
          <P lighter mb2 sm>
            <IconWrapper>
              <TwitterIcon />
            </IconWrapper>
            <a
              href={`https://www.twitter.com/${twitter}`}
              target="_BLANK"
              rel="noopener noreferrer"
            >
              {twitter}
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

        <ArticlePreviews articles={articles} />

        <Spacer />

        <Center>
          <BtnLink to={ABOUT_ROUTE}>More about The Metric</BtnLink>
        </Center>

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

    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...ArticlePreview
        }
      }
    }
  }
`

export default AuthorTemplate

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
  BriefcaseIcon,
} from '../shared'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { IAuthor, IArticlePreview } from '../types'
import { ABOUT_ROUTE } from '../constants/routes'
import { M2, minWidth, M4, PHONE } from '../constants/measurements'

const Header = s.div`
  display: block;
  width: 100%;

  ${minWidth(PHONE)} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const ProfileImage = s.div<{ src: string }>`
  background-image: url(${({ src }): string => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
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

// TODO paginate posts by the author? Click to load more?

interface IAuthorTemplateProps {
  data: {
    ghostAuthor: IAuthor
    allGhostPost: {
      nodes: IArticlePreview[]
    }
  }
}

const AuthorTemplate = ({ data }: IAuthorTemplateProps): React.ReactElement => {
  const {
    ghostAuthor: {
      bio,
      facebook,
      loc,
      role,
      name,
      postCount,
      profile_image,
      twitter,
      website,
    },
    allGhostPost: { nodes: articles },
  } = data

  return (
    <Layout>
      <Meta title={name} description={bio} />
      <WideContainer>
        <ResponsiveSpacer hiddenOnMobile />
        <Spacer />

        <Header>
          {profile_image && <ProfileImage src={profile_image} />}
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
      nodes {
        ...ArticlePreview
      }
    }
  }
`

export default AuthorTemplate

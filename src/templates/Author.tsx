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
  BackgroundImg,
} from '../shared'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { IAuthor, IArticlePreview } from '../types'
import {
  ABOUT_ROUTE,
  TWITTER_PAGE_LINK,
  FACEBOOK_PAGE_LINK,
} from '../constants/routes'
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

const ProfileImage = s(BackgroundImg)`
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

// TODO paginate posts by the author? Click to load more?

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
    // profile_image,
    twitterUsername,
    website,
    localImage,
  } = (ghostAuthor || ghostAuthorManual) as IAuthor

  const fluid = localImage?.childImageSharp?.fluid

  return (
    <Layout>
      <Meta title={name} description={bio} />
      <WideContainer>
        <ResponsiveSpacer hiddenOnMobile />
        <Spacer />

        <Header>
          {fluid && <ProfileImage fluid={fluid} />}
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

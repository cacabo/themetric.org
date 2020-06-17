import { graphql } from 'gatsby'

export const AuthorPreviewFragment = graphql`
  fragment AuthorPreview on GhostAuthor {
    id
    slug
    name
    loc
    role
    localImage {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export const AuthorManualPreviewFragment = graphql`
  fragment AuthorManualPreview on GhostAuthorManual {
    id
    slug
    name
    loc
    role
    localImage {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export const AuthorFragment = graphql`
  fragment Author on GhostAuthor {
    id
    slug
    bio
    facebook
    facebookUsername
    loc
    role
    name
    postCount
    profile_image
    twitter
    twitterUsername
    website
    localImage {
      childImageSharp {
        fluid(maxWidth: 248) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export const AuthorManualFragment = graphql`
  fragment AuthorManual on GhostAuthorManual {
    id
    slug
    bio
    facebook
    facebookUsername
    loc
    role
    name
    postCount
    profile_image
    twitter
    twitterUsername
    website
    localImage {
      childImageSharp {
        fluid(maxWidth: 248) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export const ArticleFragment = graphql`
  fragment Article on GhostPost {
    slug
    title
    html
    subtitle
    feature_image
    featureImageCaption
    localImage {
      childImageSharp {
        fluid(maxWidth: 1248) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    published_at(formatString: "MMM D, YYYY")
    reading_time
    tags {
      id
      name
      slug
    }
  }
`

export const ArticlePreviewFragment = graphql`
  fragment ArticlePreview on GhostPost {
    id
    slug
    title
    subtitle
    published_at(formatString: "MMM D, YYYY")
    reading_time
    tags {
      id
      slug
      name
    }
    authors {
      id
      slug
      name
    }
    feature_image
    localImage {
      childImageSharp {
        fluid(maxWidth: 548) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

import { graphql } from 'gatsby'

export const AuthorPreviewFragment = graphql`
  fragment AuthorPreview on GhostAuthor {
    id
    slug
    name
    location
    profile_image
  }
`

export const AuthorFragment = graphql`
  fragment Author on GhostAuthor {
    id
    slug
    bio
    facebook
    location
    name
    postCount
    profile_image
    twitter
    website
  }
`

export const ArticleFragment = graphql`
  fragment Article on GhostPost {
    slug
    title
    html
    excerpt
    feature_image
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
    authors {
      id
      name
      slug
      profile_image
      location
    }
  }
`

export const ArticlePreviewFragment = graphql`
  fragment ArticlePreview on GhostPost {
    id
    slug
    title
    excerpt
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
  }
`

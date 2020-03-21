import { graphql } from 'gatsby'

export const ArticlePreviewFragment = graphql`
  fragment ArticlePreview on GhostPost {
    id
    slug
    title
    excerpt
    published_at(formatString: "MMM DD, YYYY")
    reading_time
    tags {
      id
      slug
      name
    }
    primary_tag {
      id
      slug
    }
    authors {
      id
      slug
      name
    }
    feature_image
  }
`

export const AuthorFragment = graphql`
  fragment Author on GhostAuthor {
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

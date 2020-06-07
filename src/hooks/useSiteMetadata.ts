import { useStaticQuery, graphql } from 'gatsby'

interface ISiteMetadata {
  title: string
  description: string
  author: string
}

export const useSiteMetadata = (): ISiteMetadata => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query siteMetadata {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  return siteMetadata
}

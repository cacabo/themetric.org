import { useStaticQuery, graphql } from 'gatsby'
import { ITag } from '../types'

export const usePopularTags = (): ITag[] => {
  const {
    allGhostTag: { nodes },
  } = useStaticQuery(graphql`
    query queryPopularGhostTags {
      allGhostTag(
        filter: { isRegion: { eq: false } }
        sort: { fields: count___posts, order: DESC }
        limit: 10
      ) {
        nodes {
          id
          name
          slug
        }
      }
    }
  `)

  return nodes
}

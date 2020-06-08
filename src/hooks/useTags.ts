import { useStaticQuery, graphql } from 'gatsby'
import { ITag } from '../types'

export const useTags = (): ITag[] => {
  const {
    allGhostTag: { nodes },
  } = useStaticQuery(graphql`
    query queryGhostTags {
      allGhostTag(
        filter: { isRegion: { eq: false } }
        sort: { fields: name, order: DESC }
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

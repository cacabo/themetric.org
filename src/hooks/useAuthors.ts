import { useStaticQuery, graphql } from 'gatsby'
import { IAuthorPreview } from '../types'

/**
 * Combine the list of authors from Ghost and manually created authors
 *
 * Returns the merged lists sorted by name alphabetically
 */
export const useAuthors = (): IAuthorPreview[] => {
  const {
    allGhostAuthor: { nodes: authors },
    allGhostAuthorManual: { nodes: authorsManual },
  } = useStaticQuery(graphql`
    query allAuthors {
      allGhostAuthor(sort: { order: DESC, fields: name }) {
        nodes {
          ...AuthorPreview
        }
      }
      allGhostAuthorManual(sort: { order: DESC, fields: name }) {
        nodes {
          ...AuthorManualPreview
        }
      }
    }
  `)

  return [
    ...(authors as IAuthorPreview[]),
    ...(authorsManual as IAuthorPreview[]),
  ].sort(({ name: a }, { name: b }) => (a < b ? -1 : a > b ? 1 : 0))
}

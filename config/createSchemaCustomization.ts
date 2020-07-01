import { ITag, IArticle, IAuthor } from '../src/types'
import { REGIONS } from '../src/constants/regions'
import { GatsbyCreateSchemaCustomization } from './types'

const regions = new Set(Object.keys(REGIONS))

type ICompleteArticle = IArticle & { excerpt: string }
type ICompleteAuthor = IAuthor & { location: string }

/**
 * Helper functions
 */

const parseUsername = (str: string | undefined | null): string => {
  if (!str) return ''
  const index = str ? str.lastIndexOf('/') : -1
  if (index < 0) {
    return str.trim()
  }
  return str.substring(index + 1).trim()
}

const getBeforePipe = (str: string): string => {
  if (!str) {
    return ''
  }

  const index = str.indexOf('|')
  if (index < 0) {
    return str.trim()
  }

  return str.substring(0, index).trim()
}

const getAfterPipe = (str: string, { defaultValue = '' } = {}): string => {
  const index = str ? str.indexOf('|') : -1
  if (index < 0) {
    return defaultValue
  }

  const value = str.substring(index + 1).trim()
  return value
}

export const createSchemaCustomization: GatsbyCreateSchemaCustomization = ({
  actions,
}) => {
  const { createFieldExtension, createTypes } = actions

  /**
   * Additional types for GhostTag
   */
  createFieldExtension({
    name: 'isRegion',
    extend: () => ({
      resolve: (source: ITag): boolean => regions.has(source.slug),
    }),
  })
  createTypes(`
    type GhostTag implements Node {
      isRegion: Boolean @isRegion
    }
  `)

  /**
   * Additional types for GhostPost
   */
  createFieldExtension({
    name: 'subtitle',
    extend: () => ({
      resolve: (source: ICompleteArticle): string => {
        const { excerpt } = source
        return getBeforePipe(excerpt)
      },
    }),
  })
  createFieldExtension({
    name: 'featureImageCaption',
    extend: () => ({
      resolve: (source: ICompleteArticle): string => {
        const { excerpt } = source
        return getAfterPipe(excerpt)
      },
    }),
  })
  createTypes(`
    type GhostPost implements Node {
      subtitle: String @subtitle
      featureImageCaption: String @featureImageCaption
    }
  `)

  /**
   * Additional types for GhostAuthor
   */
  createFieldExtension({
    name: 'role',
    extend: () => ({
      resolve: (source: ICompleteAuthor): string => {
        const { location } = source
        return getAfterPipe(location, { defaultValue: 'Content Creator' })
      },
    }),
  })
  createFieldExtension({
    name: 'loc',
    extend: () => ({
      resolve: (source: ICompleteAuthor): string => {
        const { location } = source
        return getBeforePipe(location)
      },
    }),
  })
  createFieldExtension({
    name: 'facebookUsername',
    extend: () => ({
      resolve: (source: ICompleteAuthor): string => {
        const { facebook } = source
        return parseUsername(facebook)
      },
    }),
  })
  createFieldExtension({
    name: 'twitterUsername',
    extend: () => ({
      resolve: (source: ICompleteAuthor): string => {
        const { twitter } = source
        return parseUsername(twitter)
      },
    }),
  })
  createTypes(`
    type GhostAuthor implements Node {
      role: String @role
      loc: String @loc
      facebookUsername: String @facebookUsername
      twitterUsername: String @twitterUsername
    }
    type GhostPostAuthors implements Node {
      role: String @role
      loc: String @loc
      facebookUsername: String @facebookUsername
      twitterUsername: String @twitterUsername
    }
  `)
}

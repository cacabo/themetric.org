import * as path from 'path'
import { GatsbyCreatePages } from './types'
import { POSTS_PER_PAGE } from '../src/constants/misc'
import { IArticlePreview } from '../src/types'
import { REGIONS } from '../src/constants/regions'

const regions = new Set(Object.keys(REGIONS))

// Import templates
const getTemplatePath = (name: string): string =>
  path.resolve(`./src/templates/${name}.tsx`)
const AuthorTemplate = getTemplatePath('Author')
const ArticleTemplate = getTemplatePath('Article')
const ArticlesTemplate = getTemplatePath('Articles')
const RegionTemplate = getTemplatePath('Region')
const TagTemplate = getTemplatePath('Tag')

interface ICreatePagesData {
  allGhostAuthor: {
    nodes: Array<{
      id: string
      slug: string
    }>
  }
  allGhostAuthorManual: {
    nodes: Array<{
      id: string
      slug: string
    }>
  }
  allGhostPost: {
    nodes: IArticlePreview[]
  }
  allGhostTag: {
    nodes: Array<{
      slug: string
      count: {
        posts: number
      }
    }>
  }
}

export const createPages: GatsbyCreatePages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    errors: ghostErrors,
    data: {
      allGhostAuthor: { nodes: authors },
      allGhostAuthorManual: { nodes: authorsManual },
      allGhostPost: { nodes: articles },
      allGhostTag: { nodes: tags },
    },
  }: { errors: any; data: ICreatePagesData } = await graphql(`
    query gatsbyNodeQuery {
      allGhostAuthor {
        nodes {
          id
          slug
        }
      }

      allGhostAuthorManual {
        nodes {
          id
          slug
        }
      }

      allGhostPost(sort: { order: DESC, fields: published_at }) {
        nodes {
          id
          slug
          title
          subtitle
          published_at(formatString: "MMM DD, YYYY")
          reading_time
          localImage {
            childImageSharp {
              fluid(maxWidth: 548) {
                src
                srcSet
                aspectRatio
                sizes
                base64
              }
            }
          }
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
      }

      allGhostTag {
        nodes {
          slug
          count {
            posts
          }
        }
      }
    }
  `)

  // Something went wrong
  if (ghostErrors) {
    throw new Error(ghostErrors)
  }

  authors.map(({ slug }) =>
    createPage({
      path: `/authors/${slug}`,
      component: AuthorTemplate,
      context: { slug },
    }),
  )

  authorsManual.map(({ slug }) =>
    createPage({
      path: `/authors/${slug}`,
      component: AuthorTemplate,
      context: { slug },
    }),
  )

  articles.map(({ slug, authors: articleAuthors }, idx) => {
    const authorSlugs = articleAuthors.map(({ slug: authorSlug }) => authorSlug)
    createPage({
      path: `/articles/${slug}`,
      component: ArticleTemplate,
      context: {
        slug,
        authorSlugs,
        next: articles[idx - 1 < 0 ? articles.length - 1 : idx - 1],
        prev: articles[idx + 1 >= articles.length ? 0 : idx + 1],
      },
    })
  })

  const generatePaginatedPages = (
    numArticles: number,
    baseRoute: string,
    template: string,
    context = {},
  ): void => {
    if (
      (!numArticles && numArticles !== 0) ||
      typeof numArticles !== 'number'
    ) {
      throw Error('Num articles must be a number')
    }

    if (!baseRoute || !baseRoute.startsWith('/')) {
      throw Error('baseRoute should be a route of the form "/articles"')
    }

    const numArticlesPages =
      numArticles === 0 ? 1 : Math.ceil(numArticles / POSTS_PER_PAGE)
    Array.from({ length: numArticlesPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? baseRoute : `${baseRoute}/${i + 1}`,
        component: template,
        context: {
          ...context,
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
          numPages: numArticlesPages,
          currentPage: i + 1,
        },
      })
    })
  }

  // Map from tag slugs to counts
  const tagToCountDict: Record<string, number> = {}
  tags.forEach(({ slug, count: { posts } }) => {
    tagToCountDict[slug] = posts
  })

  const getNumArticlesForTag = (tag: string): number => tagToCountDict[tag] || 0

  generatePaginatedPages(articles.length, '/articles', ArticlesTemplate)

  regions.forEach((region: string): void => {
    const numArticlesInRegion = getNumArticlesForTag(region)
    generatePaginatedPages(
      numArticlesInRegion,
      `/regions/${region}`,
      RegionTemplate,
      { region },
    )
  })

  const filteredTags = tags
    .map(({ slug }) => slug)
    .filter((slug: string): boolean => !regions.has(slug))

  filteredTags.forEach((tag: string): void => {
    const numArticlesForTag = getNumArticlesForTag(tag)
    generatePaginatedPages(numArticlesForTag, `/tags/${tag}`, TagTemplate, {
      tag,
    })
  })
}

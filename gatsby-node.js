const path = require('path')

const { POSTS_PER_PAGE, REGIONS } = require(path.resolve(
  './src/constants/misc.ts',
))

const regions = new Set(REGIONS)

const getTemplatePath = (name) => path.resolve(`./src/templates/${name}.tsx`)
const AuthorTemplate = getTemplatePath('Author')
const ArticleTemplate = getTemplatePath('Article')
const ArticlesTemplate = getTemplatePath('Articles')
const RegionTemplate = getTemplatePath('Region')
const TagTemplate = getTemplatePath('Tag')

/**
 * Manually create "authors" who have no posts in Ghost
 *
 * This is necessary since the Ghost API does not return users who exist in
 * Ghost yet who have not authored any posts
 */
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  const cameronData = {
    bio: 'Driven developer, designer, and product builder.',
    cover_image: null,
    facebook: 'https://www.facebook.com/cam.cabo',
    facebookUsername: 'cam.cabo',
    ghostId: 'cameron',
    loc: 'Los Angeles',
    location: '',
    meta_title: null,
    meta_description: null,
    name: 'Cameron Cabo',
    postCount: 0,
    profile_image:
      'https://ghost.themetric.org/content/images/2020/03/prof.jpg',
    role: 'Web Developer',
    url: 'http://ghost.themetric.org/author/cameron/',
    twitter: 'https://www.twitter.com/cameroncabo',
    twitterUsername: 'cameroncabo',
    slug: 'cameron',
    website: 'https://www.cameroncabo.com',
  }

  const nodeContent = JSON.stringify(cameronData)
  const nodeMeta = {
    id: createNodeId(cameronData.ghostId),
    parent: null,
    children: [],
    internal: {
      type: `GhostAuthorManual`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(cameronData),
    },
  }
  const node = Object.assign({}, cameronData, nodeMeta)
  createNode(node)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  /**
   * Additional types for GhostTag
   */
  createFieldExtension({
    name: 'isRegion',
    extend: () => ({
      resolve: (source) => regions.has(source.slug),
    }),
  })
  createTypes(`
    type GhostTag implements Node {
      isRegion: Boolean @isRegion
    }
  `)

  /**
   * Additional types for GhostAuthor
   */
  createFieldExtension({
    name: 'role',
    extend: () => ({
      resolve: (source) => {
        const { location } = source
        const index = location ? location.indexOf('|') : -1
        if (index < 0) {
          // Default role
          return 'Contributor'
        }

        const role = location.substring(index + 1).trim()
        return role
      },
    }),
  })
  createFieldExtension({
    name: 'loc',
    extend: () => ({
      resolve: (source) => {
        const { location } = source
        if (!location) {
          return ''
        }

        const index = location.indexOf('|')
        if (index < 0) {
          return location.trim()
        }

        const loc = location.substring(0, index).trim()
        return loc
      },
    }),
  })
  const parseUsername = (str) => {
    if (!str) return ''
    const index = str ? str.lastIndexOf('/') : -1
    if (index < 0) {
      return str.trim()
    }
    return str.substring(index + 1).trim()
  }
  createFieldExtension({
    name: 'facebookUsername',
    extend: () => ({
      resolve: (source) => {
        const { facebook } = source
        return parseUsername(facebook)
      },
    }),
  })
  createFieldExtension({
    name: 'twitterUsername',
    extend: () => ({
      resolve: (source) => {
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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    errors: ghostErrors,
    data: {
      allGhostAuthor: { nodes: authors },
      allGhostAuthorManual: { nodes: authorsManual },
      allGhostPost: { nodes: articles },
      allGhostTag: { nodes: tags },
    },
  } = await graphql(`
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
          excerpt
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

  await authors.map(({ slug }) =>
    createPage({
      path: `/authors/${slug}`,
      component: AuthorTemplate,
      context: { slug },
    }),
  )

  await authorsManual.map(({ slug }) =>
    createPage({
      path: `/authors/${slug}`,
      component: AuthorTemplate,
      context: { slug },
    }),
  )

  await articles.map(({ slug, authors }, idx) => {
    const authorSlugs = authors.map(({ slug }) => slug)
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
    numArticles,
    baseRoute,
    template,
    context = {},
  ) => {
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
  const tagToCountDict = {}
  tags.forEach(({ slug, count: { posts } }) => {
    tagToCountDict[slug] = posts
  })

  const getNumArticlesForTag = (tag) => tagToCountDict[tag] || 0

  generatePaginatedPages(articles.length, '/articles', ArticlesTemplate)

  REGIONS.forEach((region) => {
    const numArticlesInRegion = getNumArticlesForTag(region)
    generatePaginatedPages(
      numArticlesInRegion,
      `/regions/${region}`,
      RegionTemplate,
      { region },
    )
  })

  // TODO other filtering of tags that are for display not for categorization
  const filteredTags = tags
    .map(({ slug }) => slug)
    .filter((slug) => !regions.has(slug))

  filteredTags.forEach((tag) => {
    const numArticlesForTag = getNumArticlesForTag(tag)
    generatePaginatedPages(numArticlesForTag, `/tags/${tag}`, TagTemplate, {
      tag,
    })
  })
}

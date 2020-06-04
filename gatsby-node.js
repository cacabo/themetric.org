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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    errors: ghostErrors,
    data: {
      allGhostAuthor: { edges: authors },
      allGhostPost: { edges: articles },
      allGhostTag: { nodes: tags },
    },
  } = await graphql(`
    query {
      allGhostAuthor {
        edges {
          node {
            id
            slug
          }
        }
      }

      allGhostPost(sort: { order: DESC, fields: published_at }) {
        edges {
          node {
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
            authors {
              id
              slug
              name
            }
            feature_image
          }
        }
      }

      allGhostTag {
        nodes {
          slug
        }
      }
    }
  `)

  if (ghostErrors) {
    throw new Error(ghostErrors)
  }

  await authors.map(({ node: { slug } }) =>
    createPage({
      path: `/authors/${slug}`,
      component: AuthorTemplate,
      context: { slug },
    }),
  )

  await articles.map(({ node: { slug } }, idx) =>
    createPage({
      path: `/articles/${slug}`,
      component: ArticleTemplate,
      context: {
        slug,
        next: articles[idx - 1 < 0 ? articles.length - 1 : idx - 1],
        prev: articles[idx + 1 >= articles.length ? 0 : idx + 1],
      },
    }),
  )

  const numArticles = articles.length
  const numArticlesPages = Math.ceil(numArticles / POSTS_PER_PAGE)
  Array.from({ length: numArticlesPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/articles` : `/articles/${i + 1}`,
      component: ArticlesTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages: numArticlesPages,
        currentPage: i + 1,
      },
    })
  })

  REGIONS.forEach((region) => {
    createPage({
      path: `/regions/${region}`,
      component: RegionTemplate,
      context: {
        region,
      },
    })
  })

  // TODO other filtering of tags that are for display not for categorization
  const filteredTags = tags
    .map(({ slug }) => slug)
    .filter((slug) => !regions.has(slug))

  filteredTags.forEach((tag) => {
    createPage({
      path: `/tags/${tag}`,
      component: TagTemplate,
      context: { tag },
    })
  })
}

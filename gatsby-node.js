const path = require('path')

const AuthorTemplate = path.resolve('./src/templates/Author.tsx')
const ArticleTemplate = path.resolve('./src/templates/Article.tsx')

if (!AuthorTemplate) {
  throw new Error('AuthorTemplate not found')
}

if (!ArticleTemplate) {
  throw new Error('ArticleTemplate not found')
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    errors: ghostErrors,
    data: {
      allGhostAuthor: { edges: authors },
      allGhostPost: { edges: articles },
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

  // createTagPages(tags, createPage)
  // createPostPages(posts, createPage)

  // // Create pagination for the index page.
  // paginate({
  //   createPage,
  //   items: posts,
  //   itemsPerPage: postsPerPage,
  //   component: BlogIndexTemplate,
  //   pathPrefix: ({ pageNumber }) => {
  //     if (pageNumber === 0) {
  //       return `/blog`
  //     } else {
  //       return `/blog/page`
  //     }
  //   },
  // })
}

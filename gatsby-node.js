const path = require('path')

const AuthorTemplate = path.resolve('./src/templates/Author.tsx')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    errors: ghostErrors,
    data: {
      allGhostAuthor: { edges: authors },
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

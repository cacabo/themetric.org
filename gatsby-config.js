module.exports = {
  siteMetadata: {
    title: `The Metric`,
    description: `Measuring What's Happening Around the World through Your Voice`,
    author: `Cameron Cabo <cameroncabo@gmail.com>`,
    siteUrl: 'https://www.themetric.org',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon-square.png`,
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `	https://ghost.themetric.org`,
        contentApiKey: process.env.GHOST_API_KEY,
        version: `v3`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'GhostAuthor',
        imagePath: 'profile_image',
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'GhostPost',
        imagePath: 'feature_image',
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allGhostPost } }) =>
              allGhostPost.edges.map(
                ({
                  node: {
                    slug,
                    title,
                    published_at,
                    excerpt,
                    html,
                    tags,
                    authors,
                  },
                }) => {
                  const url = site.siteMetadata.siteUrl + '/articles/' + slug
                  const categories = tags.map(({ name }) => name)
                  const author = authors.map(({ name }) => name).join(', ')

                  return Object.assign(
                    {},
                    {
                      title,
                      description: excerpt,
                      date: published_at,
                      url,
                      guid: url,
                      custom_elements: [{ 'content:encoded': html }],
                      author,
                      categories,
                    },
                  )
                },
              ),
            query: `
              {
                allGhostPost(sort: { order: DESC, fields: [published_at] }) {
                  edges {
                    node {
                      slug
                      title
                      published_at
                      excerpt
                      html
                      tags {
                        name
                      }
                      authors {
                        name
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'The Metric',
          },
        ],
      },
    },
  ],
}

require('dotenv').config()

// Needed for the site to function properly
if (!process.env.GHOST_API_KEY) {
  throw Error('Missing GHOST_API_KEY in env')
}
if (!process.env.GHOST_URL) {
  throw Error('Missing GHOST_URL in env')
}

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
        apiUrl: process.env.GHOST_URL,
        contentApiKey: process.env.GHOST_API_KEY,
        version: `v2`,
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
        nodeType: 'GhostAuthorManual',
        imagePath: 'profile_image',
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
              allGhostPost.nodes.map(
                ({
                  slug,
                  title,
                  published_at,
                  subtitle,
                  html,
                  tags,
                  authors,
                }) => {
                  const url = site.siteMetadata.siteUrl + '/articles/' + slug
                  const categories = tags.map(({ name }) => name)
                  const author = authors.map(({ name }) => name).join(', ')

                  return Object.assign(
                    {},
                    {
                      title,
                      description: subtitle,
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
                  nodes {
                    slug
                    title
                    published_at
                    subtitle
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
            `,
            output: '/rss.xml',
            title: 'The Metric',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: false,
        anonymize: false,

        // Setting this parameter is also optional
        respectDNT: true,

        // Avoids sending pageview hits from custom paths
        exclude: [],

        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 5,

        // Defers execution of google analytics script after page load
        defer: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Inter\:400,500,700`, `Palanquin+Dark`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            name: 'en',
          },
        ],
        /**
         * Fields to index. If store === true value will be stored in index file.
         * Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html
         * for details
         */
        fields: [
          { name: 'slug', store: true },
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'html', store: false },
          { name: 'subtitle', store: true, attributes: { boost: 10 } },
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          GhostPost: {
            slug: (node) => node.slug,
            title: (node) => node.title,
            html: (node) => node.html,

            /**
             * NOTE this runs during or before crateSchemaCustomization so we
             * have to manually parse out the subtitle
             */
            subtitle: (node) => (node.excerpt || '').split('|')[0].trim(),
          },
        },
      },
    },
  ],
}

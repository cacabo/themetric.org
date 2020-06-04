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
        contentApiKey: `517e08f593f38240905105721c`,
        version: `v3`, // Ghost API version, optional, defaults to "v3".
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
                ({ node: { slug, title, published_at, excerpt, html } }) => {
                  const url = site.siteMetadata.siteUrl + '/articles/' + slug
                  // categories string[] for tags
                  // author string for author(s)
                  return Object.assign(
                    {},
                    {
                      title,
                      description: excerpt,
                      date: published_at,
                      url,
                      guid: url,
                      custom_elements: [{ 'content:encoded': html }],
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

module.exports = {
  siteMetadata: {
    title: `The Metric`,
    description: `TODO`,
    author: `Cameron Cabo <cameroncabo@gmail.com>`,
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
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

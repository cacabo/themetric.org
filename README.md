# The Metric

Web application for The Metric

[![Netlify Status](https://api.netlify.com/api/v1/badges/8e48634c-3066-49a4-a099-b27251163d3f/deploy-status)](https://app.netlify.com/sites/metric/deploys)

---

### System Architecture

- The webiste is hosted and collaborated on in [GitHub](https://github.com/cacabo/metric)
- Content is posted, tagged with topics, and managed in Ghost
- The [themetric.org](https://www.themetric.org) domain is registered and configured on [GoDaddy](https://www.godaddy.com)
- The website sources content from Ghost and is built as a static website
- The website is hosted on Netlify, it deploys automatically with each new commit to the master branch
- ~~The Ghost instance is hosted on [Vultr](https://www.vultr.com/)~~
  - ~~It can be accessed at [ghost.themetric.org](https://www.ghost.themetric.org)~~
  - ~~You can access the Vultr instance via console on the Vultr website. You will need the credentials to log into that account.~~
  - ~~Install process was similar to [this guide.](https://ghost.org/docs/install/ubuntu/)~~
- The Ghost instance is hosted on [Heroku](https://heroku.com)
  - It can be accessed at [the-metric.herokuapp.com/ghost/](https://the-metric.herokuapp.com/ghost/)
  - Images are uploaded via Ghost and hosted in [AWS S3](https://s3.amazonaws.com/)

---

### Writing

Ghost is a little brittle in terms of what fields it supports. To get around this, we do a few things:

- The `location` field for each Ghost Author is split into both `loc` and `role` by placing a "|" between the two parts of this field. An example format is: "Los Angeles, CA | Web Developer"
- Similarly, the `excerpt` field for each Ghost Post is spit into both `subtitle` and `featureImageCaption`. An example format for this is "This is my subtitle | This is my image caption."

---

### Website Architecture

- Gatsby is a library for building static websites with React
- TypeScript is a superset of JavaScript for adding static types to variables
- ESLint is a library for enforcing style and formatting rules
- Prettier is a library for automatically reformatting code, it works hand and hand with ESLint under our configuration
- styled-components is a library for writting CSS-in-JS
- To get an email from the Ghost instance, you must be an ["Authorized Recipient"](https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients) in Mailgun

---

### Getting Started

Clone this repository to your machine. Navigate to the cloned directory in your terminal and run `yarn` to install all dependencies.

Configure your environment to have a `GHOST_API_KEY` for sourcing content from Ghost. For linux users, this can be done via an `env.sh` file of the form:

```text
export GHOST_API_KEY="..."
```

Next, source the environment. For the `env.sh` file, this can be done by running `source env.sh`.

To run the website locally, run `yarn dev` and navigate to `localhost:8000` in your browser.

To build a production build, which serves as a good indicator of if a deploy to Netlify will work as expected, run `yarn build`.

---

### Debugging

If there are issues with stale content, components, or otherwise odd occurrences, try running `yarn clean` and re-running the website locally. This deletes the cache of assets and components which Gatsby produces for performance reasons.

---

### Todo

**Todo**

- [ ] Favicon for dark mode browser
- [ ] Mailing list
- [ ] Icons for regions
- [ ] Highlight matching words in search results
- [ ] Tabbing through navigation, don't be able to tab through a navbar which is not visible, other accessibility improvements
- [ ] Accept paypal donations

**Completed**

- [x] TypeScript in `gatsby-node` https://gist.github.com/clarkdave/53cc050fa58d9a70418f8a76982dd6c8
- [x] Decide on final names for regions
- [x] Port over all existing content to Ghost
- [x] Webhook for rebuilding website in response to changes
- [x] Responsive font sizing on article page (especially for headers)
- [x] Homepage, featured posts
- [x] Share search state between search components via a reducer
- [x] Topics page
- [x] Mobile search
- [x] Toggle should toggle everything (including mobile nav)
- [x] Fix flickering shade animation
- [x] useWindowSize hook for deciding which search to render
- [x] Fix "More Reading" section
- [x] Toggle doubleclick should not re-toggle
- [x] Author page don't render all articles at once
- [x] Send author slugs as context
- [x] Remote images to `gatsby-image`
- [x] Show users (members of The Metric org) who have no posts (like Cameron)
  - [x] Manually create GhostAuthor object?
  - [x] Page for manual authors
- [x] Parse out facebook and twitter usernames from author objects
- [x] Figure out how to store roles on author objects
  - [x] Parse as part of location
  - [x] Perhaps https://www.gatsbyjs.org/docs/node-apis/#createSchemaCustomization
- [x] Add `isRegion` field to tag object
- [x] Fix invalid DOM nesting for author thumbnails
- [x] Fix linking for tags which are regions
- [x] Pagination for tags
- [x] Hosting on Netlify
- [x] Dropdowns in navbar
- [x] Shadow on navbar
- [x] Pagination for articles
- [x] Comments via Disqus
- [x] Google Analytics
- [x] Make Ghost API key be in env
- [x] RSS feed
- [x] Social icons in navbar
- [x] Links to share on article show page
- [x] Hide navbar on scroll down, show on scroll up
- [x] Port from tslint to eslint
- [x] Contact page
- [x] About page
- [x] Article page
- [x] Next post and previous post
- [x] Favicon
- [x] Connect with Ghost
- [x] 404 page
- [x] Style links
- [x] Author page
- [x] Full width nav and footer on tablet
- [x] Document technical side of things
- [x] [Search](https://www.gatsbyjs.org/packages/gatsby-plugin-flexsearch/)
- [x] Tags section on homepage (maybe only show some of the most popular)

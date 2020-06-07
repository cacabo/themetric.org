# The Metric

Web application for The Metric

[![Netlify Status](https://api.netlify.com/api/v1/badges/8e48634c-3066-49a4-a099-b27251163d3f/deploy-status)](https://app.netlify.com/sites/metric/deploys)

---

### Todo

**Shorter term**

- [ ] Toggle should toggle everything (including mobile nav)
- [ ] useScreenWidth hook for deciding which search to render
- [ ] Scroll when tab or arrow to search results that are out of view
- [ ] Decide on final names for regions
- [ ] TODO stubs in code
- [ ] Responsive font sizing on article page
- [ ] Sizing, mobile responsiveness of search bar
- [ ] Homepage, featured posts
  - [ ] Secondary level of featured posts
  - [ ] Other posts
- [ ] Styled-system
- [ ] Webhook for rebuilding website in response to changes
- [ ] Port over all existing content to Ghost
- [ ] Document technical side of things

**Longer term**

- [ ] Favicon for dark mode browser
- [ ] Mailing list
- [ ] Icons for regions
- [ ] TypeScript in `gatsby-node` https://gist.github.com/clarkdave/53cc050fa58d9a70418f8a76982dd6c8
- [ ] Highlight matching words in search results

**Completed**

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
- [x] [Search](https://www.gatsbyjs.org/packages/gatsby-plugin-flexsearch/)
- [x] Tags section on homepage (maybe only show some of the most popular)

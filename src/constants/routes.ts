// Internal
export const HOME_ROUTE = '/'
export const ABOUT_ROUTE = '/about'
export const ARTICLES_ROUTE = '/articles'
export const ARTICLES_PAGE_ROUTE = (page: number): string => {
  if (page === 1) {
    return ARTICLES_ROUTE
  }

  return `/articles/${page}`
}
export const CONTACT_ROUTE = '/contact'
export const AUTHOR_ROUTE = (slug: string): string => `/authors/${slug}`
export const TAG_ROUTE = (slug: string): string => `/tags/${slug}`
export const ARTICLE_ROUTE = (slug: string): string => `/articles/${slug}`
export const RSS_ROUTE = '/rss.xml'

// External
export const FACEBOOK_LINK = 'https://www.facebook.com/TheMetricGlobal/'
export const TWITTER_LINK = 'https://twitter.com/TheMetric_'
export const LINKEDIN_LINK = 'https://www.linkedin.com/company/themetrichq/'
export const CAMERON_LINK = 'https://www.cameroncabo.com'

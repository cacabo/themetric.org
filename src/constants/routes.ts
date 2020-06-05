import { ERegionSlug } from './regions'

const getPageRouteGenerator = (base: string) => (page: number): string => {
  if (page === 1) {
    return base
  }

  return `${base}/${page}`
}

// Internal
export const HOME_ROUTE = '/'
export const ABOUT_ROUTE = '/about'
export const CONTACT_ROUTE = '/contact'
export const RSS_ROUTE = '/rss.xml'

export const ARTICLES_ROUTE = '/articles'
export const ARTICLES_PAGE_ROUTE = getPageRouteGenerator(ARTICLES_ROUTE)

export const REGION_ROUTE = (region: ERegionSlug): string =>
  `/regions/${region}`
export const REGION_PAGE_ROUTE = (region: ERegionSlug) => (
  page: number,
): string => getPageRouteGenerator(REGION_ROUTE(region))(page)

export const TAG_ROUTE = (slug: string): string => `/tags/${slug}`
export const TAG_PAGE_ROUTE = (slug: string) => (page: number): string =>
  getPageRouteGenerator(TAG_ROUTE(slug))(page)

export const AUTHOR_ROUTE = (slug: string): string => `/authors/${slug}`
export const ARTICLE_ROUTE = (slug: string): string => `/articles/${slug}`

// External
export const FACEBOOK_LINK = 'https://www.facebook.com/TheMetricGlobal/'
export const TWITTER_LINK = 'https://twitter.com/TheMetric_'
export const LINKEDIN_LINK = 'https://www.linkedin.com/company/themetrichq/'
export const CAMERON_LINK = 'https://www.cameroncabo.com'

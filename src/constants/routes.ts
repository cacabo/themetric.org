// Internal
export const HOME_ROUTE = '/'
export const ABOUT_ROUTE = '/about'
export const ARTICLES_ROUTE = '/articles'
export const CONTACT_ROUTE = '/contact'
export const AUTHOR_ROUTE = (slug: string): string => `/authors/${slug}`
export const TAG_ROUTE = (slug: string): string => `/tags/${slug}`
export const ARTICLE_ROUTE = (slug: string): string => `/articles/${slug}`

// External
export const FACEBOOK_LINK = 'https://www.facebook.com/TheMetricGlobal/'

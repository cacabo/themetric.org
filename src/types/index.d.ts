import React from 'react'
import { FluidObject } from 'gatsby-image'

export type IChildren = React.ReactNode | React.ReactNodeArray

export interface IChildrenProps {
  children: IChildren
}

export interface IGatsbyImage {
  childImageSharp: {
    fluid: FluidObject
  }
}

export interface IPaginationPageContext {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}

/**
 * Authors
 */

export interface IAuthor {
  id: string
  slug: string
  bio?: string
  facebook?: string
  facebookUsername?: string
  loc?: string
  role?: string
  name: string
  postCount: number
  profile_image?: string
  twitter?: string
  twitterUsername?: string
  website?: string
  localImage?: IGatsbyImage
}

export interface IAuthorPreview {
  id: string
  slug: string
  name: string
  loc?: string
  role?: string
  profile_image?: string
  localImage?: IGatsbyImage
}

/**
 * Tags
 */

export interface ITag {
  id: string
  slug: string
  name: string
}

/**
 * Articles
 */

export interface IArticlePreview {
  id: string
  title: string
  subtitle?: string
  slug: string
  feature_image?: string
  localImage?: IGatsbyImage
  published_at: string
  readingTime: number
  authors: IAuthorPreview[]
  tags: ITag[]
}

export interface IArticle {
  title: string
  slug: string
  feature_image?: string
  featureImageCaption?: string
  localImage?: IGatsbyImage
  html: string
  subtitle: string
  readingTime: number
  published_at: string
  tags: ITag[]
}

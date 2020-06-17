import React from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const IMAGE = 'https://ccabo.s3-us-west-1.amazonaws.com/metric.png'
const URL = 'themetric.org'
const TWITTER = '@TheMetric_'

type Meta =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

export interface IMetaProps {
  description?: string
  lang?: string
  meta?: Meta[]
  image?: string
  title?: string
}

export const Meta = ({
  description = '',
  lang = 'en',
  meta = [],
  image,
  title = '',
}: IMetaProps): React.ReactElement => {
  const {
    title: siteTitle,
    description: siteDescription,
    author,
  } = useSiteMetadata()

  const metaDescription = description || siteDescription

  const metaImage = image || IMAGE

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || siteTitle}
      titleTemplate={title ? `%s | ${siteTitle}` : siteTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'author',
          content: `The Metric <contact@${URL}>`,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: URL,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          property: 'og:image-alt',
          content: 'The Metric Logo',
        },
        {
          name: 'twitter:site',
          content: TWITTER,
        },
        {
          name: 'twitter:card',
          content: image ? 'summary_large_image' : 'summary',
        },
        {
          name: 'twitter:creator',
          content: author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: IMAGE,
        },
        {
          name: 'twitter:image-alt',
          content: 'The Metric logo',
        },
      ].concat(meta)}
    />
  )
}

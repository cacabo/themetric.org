import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const IMAGE = 'https://ccabo.s3-us-west-1.amazonaws.com/metric.png'
const URL = 'themetric.org'

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
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const metaDescription =
    description ||
    site.siteMetadata.description ||
    "Measuring what's happening around the world through your voice"

  const metaImage = image || IMAGE

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={'%s | The Metric'}
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
          content: URL,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
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

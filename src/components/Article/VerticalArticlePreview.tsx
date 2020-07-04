import * as React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { IArticlePreview } from '../../types'
import { P, H3, TextList, BackgroundImg } from '../../shared'
import {
  AUTHOR_ROUTE,
  ARTICLE_ROUTE,
  TAG_ROUTE,
  REGION_ROUTE,
} from '../../constants/routes'
import { ERegionSlug } from '../../constants/regions'
import { maxWidth, TABLET, M2, minWidth } from '../../constants/measurements'

const DesktopImage = s(BackgroundImg)`
  width: 100%;
  padding-top: 66%;
  margin-bottom: ${M2};

  ${maxWidth(TABLET)} {
    display: none;
  }
`

const MobileImage = s(Img)`
  width: 100%;
  height: auto;
  margin-bottom: ${M2};

  ${minWidth(TABLET)} {
    display: none;
  }
`

export const VerticalArticlePreview = ({
  title,
  slug,
  subtitle,
  localImage,
  authors,
  tags,
  published_at,
  readingTime,
}: IArticlePreview): React.ReactElement => {
  const { fluid } = localImage?.childImageSharp || {}
  return (
    <div style={{ marginBottom: M2 }}>
      {fluid && (
        <Link to={ARTICLE_ROUTE(slug)}>
          <DesktopImage fluid={fluid} />
          <MobileImage fluid={fluid} />
        </Link>
      )}
      <Link to={ARTICLE_ROUTE(slug)}>
        <H3 mb1>{title}</H3>
      </Link>
      <Link to={ARTICLE_ROUTE(slug)}>
        <P mb4 light>
          {subtitle}
        </P>
      </Link>
      <P sm lighter mb1>
        <TextList>
          {authors.map(({ name, slug: authorSlug }) => (
            <Link to={AUTHOR_ROUTE(authorSlug)} key={`author-${authorSlug}`}>
              {name}
            </Link>
          ))}
        </TextList>
        {authors && authors.length && tags && tags.length && ' in '}
        <TextList>
          {tags.map(({ name, slug: tagSlug }) => (
            <Link
              to={
                Object.values(ERegionSlug).includes(tagSlug as ERegionSlug)
                  ? REGION_ROUTE(tagSlug as ERegionSlug)
                  : TAG_ROUTE(tagSlug)
              }
              key={`tag-${tagSlug}`}
            >
              {name}
            </Link>
          ))}
        </TextList>
      </P>
      <P sm lightest mb0>
        {published_at} &#183; {readingTime} mins
      </P>
    </div>
  )
}

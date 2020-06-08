import * as React from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'
import Img from 'gatsby-image'

import { IArticlePreview } from '../../types'
import { P, Row, Col, H3, BackgroundImg, TextList } from '../../shared'
import {
  M2,
  minWidth,
  TABLET,
  maxWidth,
  PHONE,
} from '../../constants/measurements'
import {
  AUTHOR_ROUTE,
  ARTICLE_ROUTE,
  TAG_ROUTE,
  REGION_ROUTE,
} from '../../constants/routes'
import { ERegionSlug } from '../../constants/regions'

type IArticlePreviewProps = IArticlePreview

const Wrapper = s.div<{ marginBottom?: string }>`
  margin-bottom: ${(props): string => props.marginBottom || '0'};
  
  ${minWidth(TABLET)} {
    margin-bottom: ${(props): string => props.marginBottom || '4vh'};
  }
`

const ImageLink = s(Link)`
  width: 100%;
  display: flex;

  ${maxWidth(TABLET)} {
    display: block;
  }
`

const DesktopImage = s(BackgroundImg)`
  ${maxWidth(TABLET)} {
    display: none;
  }
`

const MobileImage = s(Img)`
  width: 100%;
  height: auto;
  flex: none;
  margin-bottom: ${M2};

  ${minWidth(PHONE)} {
    margin-bottom: 0;
  }

  ${minWidth(TABLET)} {
    display: none;
  }
`

export const ArticlePreview = ({
  title,
  slug,
  excerpt,
  feature_image,
  localImage,
  authors,
  tags,
  published_at,
  reading_time,
  marginBottom,
}: { marginBottom?: string } & IArticlePreviewProps): React.ReactElement => {
  const { fluid } = localImage?.childImageSharp || {}
  return (
    <Wrapper marginBottom={marginBottom}>
      <Row margin={M2} mb4={!marginBottom}>
        {feature_image && fluid && (
          <Col margin={M2} sm={12} md={5} flex>
            <ImageLink to={ARTICLE_ROUTE(slug)}>
              <DesktopImage fluid={fluid} />
              <MobileImage fluid={fluid} />
            </ImageLink>
          </Col>
        )}
        <Col margin={M2} sm={12} md={7}>
          <Link to={ARTICLE_ROUTE(slug)}>
            <H3 mb1>{title}</H3>
          </Link>
          <Link to={ARTICLE_ROUTE(slug)}>
            <P mb4 light>
              {excerpt}
            </P>
          </Link>
          <P sm lighter mb1>
            <TextList>
              {authors.map(({ name, slug: authorSlug }) => (
                <Link
                  to={AUTHOR_ROUTE(authorSlug)}
                  key={`author-${authorSlug}`}
                >
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
            {published_at} &#183; {reading_time} mins
          </P>
        </Col>
      </Row>
    </Wrapper>
  )
}

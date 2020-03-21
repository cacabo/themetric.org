import * as React from 'react'
import { Link } from 'gatsby'

import { IArticlePreview } from '../../types'
import { P, Row, Col, H3, BackgroundImage, TextList } from '../../shared'
import { M2 } from '../../constants/measurements'
import { AUTHOR_ROUTE, ARTICLE_ROUTE, TAG_ROUTE } from '../../constants/routes'

type IArticlePreviewProps = IArticlePreview

// TODO author images
// TODO link to authors
// TOOD link to article
// TODO "in {topic}"
// Date and time to read

export const ArticlePreview = ({
  title,
  slug,
  excerpt,
  feature_image,
  authors,
  tags,
  published_at,
  reading_time,
}: IArticlePreviewProps): React.ReactElement => (
  <Row margin={M2} mb4>
    {feature_image && (
      <Col margin={M2} sm={12} md={5} flex>
        <Link
          to={ARTICLE_ROUTE(slug)}
          style={{ width: '100%', display: 'flex' }}
        >
          <BackgroundImage src={feature_image} />
        </Link>
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
            <Link to={AUTHOR_ROUTE(authorSlug)} id={`author-${authorSlug}`}>
              {name}
            </Link>
          ))}
        </TextList>
        {authors && authors.length && tags && tags.length && ' in '}
        <TextList>
          {tags.map(({ name, slug: tagSlug }) => (
            <Link to={TAG_ROUTE(tagSlug)}>{name}</Link>
          ))}
        </TextList>
      </P>
      <P sm lightest mb0>
        {published_at} &#183; {reading_time} mins
      </P>
    </Col>
  </Row>
)

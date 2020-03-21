import * as React from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'

import { IArticlePreview } from '../../types'
import { P, Row, Col, H3, BackgroundImage, TextList } from '../../shared'
import {
  M2,
  minWidth,
  TABLET,
  maxWidth,
  PHONE,
} from '../../constants/measurements'
import { AUTHOR_ROUTE, ARTICLE_ROUTE, TAG_ROUTE } from '../../constants/routes'

type IArticlePreviewProps = IArticlePreview

// TODO pagination

const Wrapper = s.div`
  ${minWidth(TABLET)} {
    margin-bottom: 4vh;
  }
`

const ImageLink = s(Link)`
  width: 100%;
  display: flex;

  ${maxWidth(TABLET)} {
    display: block;
  }
`

const DesktopImage = s(BackgroundImage)`
  ${maxWidth(TABLET)} {
    display: none;
  }
`

const MobileImage = s.img`
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
  authors,
  tags,
  published_at,
  reading_time,
}: IArticlePreviewProps): React.ReactElement => (
  <Wrapper>
    <Row margin={M2} mb4>
      {feature_image && (
        <Col margin={M2} sm={12} md={5} flex>
          <ImageLink to={ARTICLE_ROUTE(slug)}>
            <DesktopImage src={feature_image} />
            <MobileImage src={feature_image} alt={title} />
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
  </Wrapper>
)

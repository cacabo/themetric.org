import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import {
  P,
  MediumContainer,
  H1,
  WideContainer,
  ResponsiveSpacer,
  TextList,
  Spacer,
  HR,
} from '../shared'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { TAG_ROUTE } from '../constants/routes'
import { Authors } from '../components/Article/Authors'
import { ArticlePreview } from '../components/Article/ArticlePreview'
import { AuthorPreview } from '../components/Article/AuthorPreview'
import { IAuthorPreview, IArticle, IArticlePreview } from '../types'
import { M4, minWidth, DESKTOP, M1 } from '../constants/measurements'
import { ShareArticle } from '../components/Article/ShareArticle'
import { ArticleComments } from '../components/Article/ArticleComments'
import './article.css'

const Title = styled(H1)`
  ${minWidth(DESKTOP)} {
    font-size: 3.8vw;
  }
`

const Subtitle = styled(P)<{}>`
  ${minWidth(DESKTOP)} {
    font-size: 1.8vw;
  }
`

interface IArticleTemplateProps {
  data: {
    ghostPost: IArticle
    allGhostAuthor: {
      nodes: IAuthorPreview[]
    }
  }
  pageContext: {
    next?: IArticlePreview
    prev?: IArticlePreview
  }
}

const ArticleTemplate = ({
  data,
  pageContext,
}: IArticleTemplateProps): React.ReactElement => {
  const {
    ghostPost: {
      title,
      feature_image,
      featureImageCaption,
      localImage: { childImageSharp: { fluid = undefined } = {} } = {},
      slug,
      html,
      subtitle,
      readingTime,
      published_at: publishedAt,
      tags,
    },
    allGhostAuthor: { nodes: authors },
  } = data
  const { next, prev } = pageContext

  const htmlContent = html

  return (
    <Layout>
      <Meta title={title} description={subtitle} image={feature_image} />

      <article>
        <header style={{ width: '100%' }}>
          <ResponsiveSpacer sm hiddenOnMobile />
          <Spacer onlyOnMobile />
          <WideContainer>
            <Title mb2>{title}</Title>
            <Subtitle lg light condensedLineHeight>
              {subtitle}
            </Subtitle>
            {tags && tags.length && (
              <P sm lighter mb1>
                {'In '}
                <TextList>
                  {tags.map(({ name, slug: tagSlug }) => (
                    <Link to={TAG_ROUTE(tagSlug)} key={tagSlug}>
                      {name}
                    </Link>
                  ))}
                </TextList>
              </P>
            )}
            <P sm lightest>
              Published {publishedAt} &#183; {readingTime} min read
            </P>
            <Authors authors={authors} />
            <Spacer />
          </WideContainer>
          {fluid && (
            <WideContainer>
              <Img fluid={fluid} style={{ width: '100%' }} />
              {featureImageCaption && (
                <P lightest sm mb0 style={{ marginTop: M1 }}>
                  {featureImageCaption}
                </P>
              )}
            </WideContainer>
          )}
          <Spacer />
        </header>

        <MediumContainer>
          <div className="post-full-content content">
            <section
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            />
          </div>
          <ShareArticle title={title} />
        </MediumContainer>
      </article>
      <WideContainer>
        <footer>
          <HR />
          <P lighter>
            {authors && authors.length === 1 ? 'Author' : 'Authors'}
          </P>
          {authors.map(
            (a: IAuthorPreview): React.ReactElement => (
              <div key={a.slug} style={{ marginBottom: M4 }}>
                <AuthorPreview {...a} />
              </div>
            ),
          )}

          <HR />
          <P lighter>More reading</P>
          {prev && <ArticlePreview {...prev} />}
          {next && <ArticlePreview {...next} />}

          <HR />
          <P lighter>Comments</P>
          <ArticleComments title={title} slug={slug} />
        </footer>
      </WideContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $authorSlugs: [String!]!) {
    ghostPost(slug: { eq: $slug }) {
      ...Article
    }
    allGhostAuthor(filter: { slug: { in: $authorSlugs } }) {
      nodes {
        ...AuthorPreview
      }
    }
  }
`

export default ArticleTemplate

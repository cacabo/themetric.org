import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

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

import './article.css'
import { AuthorPreview } from '../components/Article/AuthorPreview'
import { IAuthorPreview } from '../types'
import { M4 } from '../constants/measurements'

const ArticleTemplate = ({ data, pageContext }): React.ReactElement => {
  const {
    ghostPost: {
      title,
      feature_image, // TODO use this for metadata
      localImage: {
        childImageSharp: { fluid },
      },
      html,
      codeinjection_head,
      codeinjection_foot,
      excerpt,
      reading_time: readingTime,
      published_at: publishedAt,
      tags,
      authors,
    },
  } = data
  const { next, prev } = pageContext

  const htmlContent =
    (codeinjection_head || '') + html + (codeinjection_foot || '')

  return (
    <Layout>
      <Meta title={title} description={excerpt} />

      <article>
        <header style={{ width: '100%' }}>
          <ResponsiveSpacer hiddenOnMobile />
          <Spacer onlyOnMobile />
          <MediumContainer>
            <H1 mb2>{title}</H1>
            <P lg light>
              {excerpt}
            </P>
            {tags && tags.length && (
              <P sm lighter mb1>
                {'Posted in '}
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
          </MediumContainer>
          {fluid && (
            <WideContainer>
              <Img fluid={fluid} style={{ width: '100%' }} />
            </WideContainer>
          )}
          <Spacer />
        </header>

        <MediumContainer>
          <div className={'post-full-content content'}>
            <section
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            />
          </div>
        </MediumContainer>
      </article>
      <WideContainer>
        <footer>
          <HR />
          <P lighter>Authors</P>
          {authors.map((a: IAuthorPreview) => (
            <div key={a.slug} style={{ marginBottom: M4 }}>
              <AuthorPreview {...a} />
            </div>
          ))}
          <HR />
          <P lighter>More reading</P>
          {prev && prev.node && <ArticlePreview {...prev.node} />}
          {next && next.node && <ArticlePreview {...next.node} />}
        </footer>
      </WideContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...Article
    }
  }
`

export default ArticleTemplate
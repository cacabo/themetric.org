import * as React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { WideContainer, H1, Hero } from '../shared'
import { IArticlePreview, IPaginationPageContext } from '../types'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { ArticlesPagination } from '../components/Article/ArticlesPagination'
import { TAG_PAGE_ROUTE } from '../constants/routes'

interface ITagTemplateProps {
  data: {
    ghostTag: {
      name: string
    }
    allGhostPost: {
      edges: Array<{
        node: IArticlePreview
      }>
    }
  }
  pageContext: {
    tag: string
  } & IPaginationPageContext
}

const TagTemplate = ({
  pageContext,
  data,
}: ITagTemplateProps): React.ReactElement => {
  const { tag, numPages, currentPage } = pageContext
  const {
    ghostTag: { name: tagName },
    allGhostPost: { edges: articleNodes },
  } = data

  const articles = articleNodes.map(({ node }) => node)

  return (
    <Layout>
      <Meta title={tagName} description={`Articles tagged with ${tagName}`} />
      <WideContainer>
        <Hero short>
          <H1 center mb0>
            {tagName}
          </H1>
        </Hero>
        <ArticlePreviews {...{ articles }} />
        <ArticlesPagination
          {...{ numPages, currentPage }}
          routeGenerator={TAG_PAGE_ROUTE(tag)}
        />
      </WideContainer>
    </Layout>
  )
}

export const tagPageQuery = graphql`
  query tagPageQuery($skip: Int!, $limit: Int!, $tag: String!) {
    ghostTag(slug: { eq: $tag }) {
      name
    }
    allGhostPost(
      filter: { tags: { elemMatch: { slug: { eq: $tag } } } }
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...ArticlePreview
        }
      }
    }
  }
`

export default TagTemplate

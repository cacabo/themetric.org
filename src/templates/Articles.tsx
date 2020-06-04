import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { WideContainer, Spacer } from '../shared'
import { IArticlePreview } from '../types'
import { ArticlesPagination } from '../components/Article/ArticlesPagination'

// TODO pagination
// TODO types

interface IArticleTemplateProps {
  data: {
    allGhostPost: {
      edges: Array<{
        node: IArticlePreview
      }>
    }
  }
  pageContext: {
    limit: number
    skip: number
    numPages: number
    currentPage: number
  }
}

const ArticlesTemplate = ({
  data,
  pageContext,
}: IArticleTemplateProps): React.ReactElement => {
  const {
    allGhostPost: { edges: articleNodes },
  } = data

  const articles = articleNodes.map(({ node }) => node)
  const { numPages, currentPage } = pageContext

  return (
    <Layout>
      <Meta title="Articles" />
      <Spacer />
      <WideContainer>
        <ArticlePreviews articles={articles} />
        <ArticlesPagination {...{ numPages, currentPage }} />
      </WideContainer>
    </Layout>
  )
}

export const articlesPageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allGhostPost(
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

export default ArticlesTemplate

import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { WideContainer, Spacer } from '../shared'
import { IArticlePreview, IPaginationPageContext } from '../types'
import { ArticlesPagination } from '../components/Article/ArticlesPagination'
import { ARTICLES_PAGE_ROUTE } from '../constants/routes'

interface IArticleTemplateProps {
  data: {
    allGhostPost: {
      nodes: IArticlePreview[]
    }
  }
  pageContext: IPaginationPageContext
}

const ArticlesTemplate = ({
  data,
  pageContext,
}: IArticleTemplateProps): React.ReactElement => {
  const {
    allGhostPost: { nodes: articles },
  } = data
  const { numPages, currentPage } = pageContext

  return (
    <Layout>
      <Meta title="Articles" />
      <Spacer />
      <WideContainer>
        <ArticlePreviews {...{ articles }} />
        <ArticlesPagination
          {...{ numPages, currentPage }}
          routeGenerator={ARTICLES_PAGE_ROUTE}
        />
      </WideContainer>
    </Layout>
  )
}

export const articlesPageQuery = graphql`
  query articlesPageQuery($skip: Int!, $limit: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...ArticlePreview
      }
    }
  }
`

export default ArticlesTemplate

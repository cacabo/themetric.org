import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { WideContainer, Spacer } from '../shared'

// TODO pagination

const ArticlesPage = (): React.ReactElement => {
  const {
    allGhostPost: { edges: articleNodes },
  } = useStaticQuery(graphql`
    {
      allGhostPost(sort: { order: DESC, fields: [published_at] }) {
        edges {
          node {
            ...ArticlePreview
          }
        }
      }
    }
  `)

  const articles = articleNodes.map(({ node }) => node)

  return (
    <Layout>
      <Meta title="Articles" />
      <Spacer />
      <WideContainer>
        <ArticlePreviews articles={articles} />
      </WideContainer>
    </Layout>
  )
}

export default ArticlesPage

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { H1, Hero, WideContainer } from '../shared'

// TODO pagination

const ArticlesPage = (): React.ReactElement => {
  const {
    allGhostPost: { edges: articleNodes },
  } = useStaticQuery(graphql`
    {
      allGhostPost(sort: { order: DESC, fields: [published_at] }) {
        edges {
          node {
            id
            slug
            title
            excerpt
            published_at(formatString: "MMM DD, YYYY")
            reading_time
            tags {
              id
              slug
              name
            }
            primary_tag {
              id
              slug
            }
            authors {
              id
              slug
              name
            }
            feature_image
          }
        }
      }
    }
  `)

  const articles = articleNodes.map(({ node }) => node)

  return (
    <Layout>
      <Meta title="Articles" />
      <WideContainer>
        <Hero>
          <H1 center>Articles</H1>
        </Hero>
        <ArticlePreviews articles={articles} />
      </WideContainer>
    </Layout>
  )
}

export default ArticlesPage

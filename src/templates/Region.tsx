import React from 'react'
import { graphql } from 'gatsby'

import { REGIONS, ERegionSlug, ERegionName } from '../constants/regions'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { WideContainer, H1, Hero, InfoMessage } from '../shared'
import { IPaginationPageContext, IArticlePreview } from '../types'
import { ArticlePreviews } from '../components/Article/ArticlePreviews'
import { ArticlesPagination } from '../components/Article/ArticlesPagination'
import { REGION_PAGE_ROUTE } from '../constants/routes'

interface IRegionTemplateProps {
  data: {
    allGhostPost: {
      nodes: IArticlePreview[]
    }
  }
  pageContext: {
    region: ERegionSlug
  } & IPaginationPageContext
}

const RegionTemplate = ({
  data,
  pageContext,
}: IRegionTemplateProps): React.ReactElement => {
  const { region, numPages, currentPage } = pageContext
  const regionName: ERegionName = REGIONS[region]

  const {
    allGhostPost: { nodes: articles },
  } = data

  return (
    <Layout>
      <Meta
        title={`${regionName} Region`}
        description={`Articles in the ${regionName} region`}
      />
      <WideContainer>
        <Hero short>
          <H1 center mb0>
            {regionName}
          </H1>
        </Hero>
        <ArticlePreviews {...{ articles }} />
        {articles.length === 0 && (
          <InfoMessage
            showIcon
            message="There aren't any articles in this region yet."
          />
        )}
        <ArticlesPagination
          {...{ numPages, currentPage }}
          routeGenerator={REGION_PAGE_ROUTE(region)}
        />
      </WideContainer>
    </Layout>
  )
}

export const regionsPageQuery = graphql`
  query regionsPageQuery($skip: Int!, $limit: Int!, $region: String!) {
    allGhostPost(
      filter: { tags: { elemMatch: { slug: { eq: $region } } } }
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

export default RegionTemplate

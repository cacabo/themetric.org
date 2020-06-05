import React from 'react'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { Hero, H1, WideContainer, Pill, PillsWrapper } from '../shared'
import { REGIONS, ERegionSlug } from '../constants/regions'
import { REGION_ROUTE } from '../constants/routes'

const IndexPage = (): React.ReactElement => (
  <Layout>
    <Meta title="Home" />
    <Hero>
      <H1 center>Hi People</H1>
    </Hero>
    <WideContainer>
      <H1 center>Regions</H1>
      <PillsWrapper>
        {(Object.keys(REGIONS) as ERegionSlug[]).map(
          (slug): React.ReactElement => (
            <Pill to={REGION_ROUTE(slug)} key={slug}>
              {REGIONS[slug]}
            </Pill>
          ),
        )}
      </PillsWrapper>
    </WideContainer>
  </Layout>
)

export default IndexPage

import React from 'react'
import { H1, Spacer, WideContainer, P } from '../shared'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { REGIONS, ERegionSlug } from '../constants/regions'
import { Link } from 'gatsby'
import { REGION_ROUTE } from '../constants/routes'

const RegionsPage = (): React.ReactElement => (
  <Layout>
    <Meta title="Regions" />
    <Spacer />
    <WideContainer>
      <H1>Regions</H1>
      {(Object.keys(REGIONS) as ERegionSlug[]).map(
        (slug): React.ReactElement => {
          const name = REGIONS[slug]
          return (
            <P key={slug}>
              <Link to={REGION_ROUTE(slug)}>{name}</Link>
            </P>
          )
        },
      )}
    </WideContainer>
  </Layout>
)

export default RegionsPage

import React from 'react'
import { REGIONS } from '../constants/regions'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { Spacer, WideContainer, H1 } from '../shared'

interface IRegionTemplateProps {
  pageContext: {
    region: string
  }
}

const RegionTemplate = ({
  pageContext,
}: IRegionTemplateProps): React.ReactElement => {
  const { region } = pageContext
  const regionName = REGIONS[region]
  return (
    <Layout>
      <Meta title={`${regionName} Region`} />
      <Spacer />
      <WideContainer>
        <H1>{regionName}</H1>
      </WideContainer>
    </Layout>
  )
}

export default RegionTemplate

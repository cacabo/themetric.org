import React from 'react'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { Hero, H1 } from '../shared'

const IndexPage = (): React.ReactElement => (
  <Layout>
    <Meta title="Home" />
    <Hero>
      <H1 center>Hi People</H1>
    </Hero>
  </Layout>
)

export default IndexPage

import React from 'react'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import Home from '../components/Home'

const IndexPage = (): React.ReactElement => (
  <Layout>
    <Meta />
    <Home />
  </Layout>
)

export default IndexPage

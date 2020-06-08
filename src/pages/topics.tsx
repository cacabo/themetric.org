import React from 'react'
import { H1, Spacer, WideContainer, P } from '../shared'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { Link } from 'gatsby'
import { TAG_ROUTE } from '../constants/routes'
import { useTags } from '../hooks/useTags'

const RegionsPage = (): React.ReactElement => {
  const topics = useTags()
  return (
    <Layout>
      <Meta title="Topics" />
      <Spacer />
      <WideContainer>
        <H1>Topics</H1>
        {topics.map(
          ({ slug, name, id }): React.ReactElement => (
            <P key={`${slug}-${id}`}>
              <Link to={TAG_ROUTE(slug)}>{name}</Link>
            </P>
          ),
        )}
      </WideContainer>
    </Layout>
  )
}

export default RegionsPage

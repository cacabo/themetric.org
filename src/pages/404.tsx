import React from 'react'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { H1, P, ThinContainer, BR, BtnLink } from '../shared'
import { HOME_ROUTE } from '../constants/routes'

const NotFoundPage = () => (
  <Layout>
    <Meta title="404: Not found" />
    <ThinContainer>
      <BR />
      <H1>Not Found</H1>
      <P>
        Seems like this page was either moved or doesn't exist. If you think
        this is a mistake, please <a href="TODO">contact us</a> with a
        description of what happened.
      </P>
      <BtnLink to={HOME_ROUTE}>Back to home</BtnLink>
    </ThinContainer>
  </Layout>
)

export default NotFoundPage

import React from 'react'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import {
  H1,
  P,
  ThinContainer,
  BR,
  BtnLink,
  Center,
  WaveIcon,
  Row,
  Col,
} from '../shared'
import { HOME_ROUTE } from '../constants/routes'

const NotFoundPage = () => (
  <Layout>
    <Meta title="404: Not found" />
    <ThinContainer>
      <BR />
      <Row>
        <Col sm={4} offsetSm={4}>
          <WaveIcon style={{ width: '100%' }} />
        </Col>
      </Row>
      <H1 center>Not Found</H1>
      <P center>
        It seems like this page was either moved or doesn't exist. If you think
        this is a mistake, please <a href="TODO">contact us</a> with a
        description of what happened.
      </P>
      <Center>
        <BtnLink to={HOME_ROUTE}>Back to home</BtnLink>
      </Center>
    </ThinContainer>
  </Layout>
)

export default NotFoundPage

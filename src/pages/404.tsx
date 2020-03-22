import React from 'react'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import {
  H1,
  P,
  ThinContainer,
  BtnLink,
  Center,
  WaveIcon,
  Row,
  Col,
  ResponsiveSpacer,
  Spacer,
} from '../shared'
import { HOME_ROUTE, CONTACT_ROUTE } from '../constants/routes'

const NotFoundPage = (): React.ReactElement => (
  <Layout>
    <Meta title="404: Not found" />
    <ThinContainer>
      <ResponsiveSpacer hiddenOnMobile />
      <Spacer onlyOnMobile />
      <Row>
        <Col sm={4} offsetSm={4}>
          <WaveIcon style={{ width: '100%' }} />
        </Col>
      </Row>
      <H1 center>Not Found</H1>
      <P center>
        It seems like this page was either moved or doesn&apos;t exist. If you
        think this is a mistake, please{' '}
        <Link to={CONTACT_ROUTE}>contact us</Link> with a description of what
        happened.
      </P>
      <Center>
        <BtnLink to={HOME_ROUTE}>Back to home</BtnLink>
      </Center>
    </ThinContainer>
  </Layout>
)

export default NotFoundPage

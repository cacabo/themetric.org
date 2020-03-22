import React from 'react'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import {
  H1,
  P,
  ThinContainer,
  BtnLink,
  Center,
  Row,
  Col,
  HandIcon,
  ResponsiveSpacer,
  Spacer,
} from '../shared'
import { HOME_ROUTE, FACEBOOK_LINK } from '../constants/routes'

const ContactPage = (): React.ReactElement => (
  <Layout>
    <Meta title="Contact Us" />
    <ThinContainer>
      <ResponsiveSpacer hiddenOnMobile />
      <Spacer onlyOnMobile />
      <Row mb2>
        <Col sm={3} offsetSm={4.5}>
          <HandIcon style={{ width: '100%' }} />
        </Col>
      </Row>
      <H1 center>Contact Us</H1>
      <P center>
        The best way to reach our team is via our{' '}
        <a href={FACEBOOK_LINK} target="_BLANK" rel="noopener noreferrer">
          Facebook account.
        </a>{' '}
        If you have a technical question, please reach out to{' '}
        <a
          href="https://www.cameroncabo.com"
          target="_BLANK"
          rel="noopener noreferrer"
        >
          Cameron Cabo.
        </a>
      </P>
      <Center>
        <BtnLink to={HOME_ROUTE}>Back to home</BtnLink>
      </Center>
    </ThinContainer>
  </Layout>
)

export default ContactPage

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import {
  P,
  H1,
  MediumContainer,
  H3,
  Hero,
  Spacer,
  Row,
  Col,
  WideContainer,
  ResponsiveSpacer,
  BtnLink,
  Center,
} from '../shared'
import { FACEBOOK_LINK, HOME_ROUTE } from '../constants/routes'
import { M2 } from '../constants/measurements'
import { AuthorPreview } from '../components/Article/AuthorPreview'
import { IAuthorPreview } from '../types'

const AboutPage = (): React.ReactElement => {
  const {
    earth: {
      childImageSharp: { fluid },
    },
    allGhostAuthor: { nodes: authors },
  } = useStaticQuery(graphql`
    query {
      earth: file(relativePath: { eq: "earth.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allGhostAuthor(sort: { order: DESC, fields: name }) {
        nodes {
          ...AuthorPreview
        }
      }
    }
  `)

  return (
    <Layout>
      <Meta title="About" />

      <BackgroundImage fluid={fluid}>
        <MediumContainer>
          <Hero>
            <H1 center white>
              Measuring What&apos;s Happening Around the World through Your
              Voice
            </H1>
          </Hero>
        </MediumContainer>
      </BackgroundImage>

      <Spacer xl />

      <MediumContainer>
        <H3 center>More About Us</H3>
        <P>
          The Metric is a youth led platform that aims to create an inclusive
          space for atypical stories. We support contributors from around the
          world to share their unique perspectives and stories that may not be
          heard outside of their local communities. A central question that
          serves as a point of departure for the articles we aim to publish is:
        </P>
        <P center>How is the local affected by the global?</P>
        <P>
          This can be applied to various spheres: the economic, social,
          cultural, political - or perhaps the intersection of them all?
        </P>
        <P>
          We represent a variety of geographic locations, cultural experiences,
          and intellectual interests — we are united by a passion to provide a
          better measure of what’s happening around the world.
        </P>
        <P>
          We welcome various lenses and perspectives from people of all walks of
          life. We have a team of co-editors who are ready to support our guest
          content creators along the publishing phase.
        </P>
        <P>
          If you have a great story to share, drop us a line on{' '}
          <a href={FACEBOOK_LINK} target="_BLANK" rel="noopener noreferrer">
            Facebook
          </a>{' '}
          and let’s get writing!
        </P>
        <P>
          <i>We welcome one time writers as well as repeat contributors</i>
        </P>
      </MediumContainer>

      <Spacer xl />
      <ResponsiveSpacer hiddenOnMobile />

      <MediumContainer>
        <H3 center>Meet the Team</H3>
        <P mb0>
          We&apos;re a driven group of students from around the world who are
          passionate for progress and political awareness.
        </P>
      </MediumContainer>
      <Spacer />
      <WideContainer>
        <Row margin={M2}>
          {authors.map(
            (a: IAuthorPreview): React.ReactElement => (
              <Col key={a.slug} margin={M2} sm={12} md={6} flex>
                <AuthorPreview {...a} />
              </Col>
            ),
          )}
        </Row>
        <Spacer />
        <Center>
          <BtnLink to={HOME_ROUTE}>Back to home</BtnLink>
        </Center>
        <Spacer />
      </WideContainer>
    </Layout>
  )
}

export default AboutPage

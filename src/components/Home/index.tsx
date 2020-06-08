import React from 'react'
import styled from 'styled-components'
import { Regions } from './Regions'
import { Topics } from './Topics'
import { Featured } from './Featured'
import { useStaticQuery, graphql } from 'gatsby'
import { Row, Col, ContainerFluid, WideContainer, HR } from '../../shared'
import { M2, M1 } from '../../constants/measurements'
import { ArticlePreview } from '../Article/ArticlePreview'
import { IArticlePreview } from '../../types'
import { VerticalArticlePreview } from '../Article/VerticalArticlePreview'
import { SKY } from '../../constants/colors'
import { ArticlePreviews } from '../Article/ArticlePreviews'

const SkyWrapper = styled.div`
  background: ${SKY};
  margin-bottom: ${M2};
  padding: calc(${M2} + 1.25vh) 0 1.25vh;
`

const Home = (): React.ReactElement => {
  const {
    allGhostPost: { nodes },
  } = useStaticQuery(graphql`
    query NonFeaturedArticlesQuery {
      allGhostPost(
        filter: { featured: { eq: false } }
        sort: { fields: published_at, order: DESC }
        limit: 20
      ) {
        nodes {
          ...ArticlePreview
        }
      }
    }
  `)
  const articles = nodes as IArticlePreview[]
  const firstThree = articles.slice(0, 3)
  const nextFour = articles.slice(3, 7)
  const nextThree = articles.slice(7, 10)
  const remainder = articles.slice(10)
  return (
    <>
      <Featured />
      <div style={{ padding: `0 ${M2}` }}>
        <Row margin={M1}>
          {firstThree.map(
            (article): React.ReactElement => (
              <Col sm={12} md={4} margin={M1} key={article.id}>
                <VerticalArticlePreview {...article} />
              </Col>
            ),
          )}
        </Row>
      </div>
      <SkyWrapper>
        <Regions />
      </SkyWrapper>
      <ContainerFluid>
        <Row margin={M2}>
          {nextFour.map(
            (article): React.ReactElement => (
              <Col sm={12} md={6} margin={M2} key={article.id}>
                <ArticlePreview {...article} marginBottom={M2} />
              </Col>
            ),
          )}
        </Row>
      </ContainerFluid>
      <HR style={{ margin: `0 0 ${M2} 0` }} />
      <div style={{ padding: `0 ${M2}` }}>
        <Row margin={M1}>
          {nextThree.map(
            (article): React.ReactElement => (
              <Col sm={12} md={4} margin={M1} key={article.id}>
                <VerticalArticlePreview {...article} />
              </Col>
            ),
          )}
        </Row>
      </div>
      <SkyWrapper>
        <Topics />
      </SkyWrapper>
      <WideContainer>
        <ArticlePreviews articles={remainder} />
      </WideContainer>
    </>
  )
}

export default Home

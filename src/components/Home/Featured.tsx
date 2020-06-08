import React from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { IArticlePreview } from '../../types'
import { BackgroundImg, H1, P } from '../../shared'
import { BLACK_ALPHA, WHITE } from '../../constants/colors'
import { minWidth, TABLET, M2, M4 } from '../../constants/measurements'
import { ARTICLE_ROUTE } from '../../constants/routes'

const FeaturedContainer = styled.div`
  ${minWidth(TABLET)} {
    padding: ${M2} ${M2} 0 ${M2};
  }
`

const Wrapper = styled.div`
  background: ${BLACK_ALPHA(0.4)};
  color: ${WHITE};
  padding: ${M2} ${M2} calc(${M2} + 10vh);

  ${minWidth(TABLET)} {
    padding: calc(${M2} + 2.5vh) calc(${M2} + 2.5vh) calc(${M2} + 20vh);
  }
`

const Title = styled(H1)`
  ${minWidth(TABLET)} {
    font-size: 5vw;
    margin-bottom: calc(${M4} + 1.25vh);
  }
`

const Subtitle = styled(P)`
  ${minWidth(TABLET)} {
    font-size: 120%;
  }
`

export const Featured = (): React.ReactElement => {
  const {
    allGhostPost: { nodes },
  } = useStaticQuery(graphql`
    query FeaturedPostQuery {
      allGhostPost(filter: { featured: { eq: true } }) {
        nodes {
          ...ArticlePreview
        }
      }
    }
  `)

  return (
    <FeaturedContainer>
      {(nodes as IArticlePreview[]).map(
        ({ title, excerpt, slug, id, localImage, authors }) => (
          <Link to={ARTICLE_ROUTE(slug)} key={id}>
            <BackgroundImg
              fluid={localImage?.childImageSharp?.fluid as FluidObject}
              style={{ marginBottom: M2 }}
            >
              <Wrapper>
                <Title>{title}</Title>
                <Subtitle mb2>{excerpt}</Subtitle>
                <P sm>{authors.map(({ name }) => name).join(', ')}</P>
              </Wrapper>
            </BackgroundImg>
          </Link>
        ),
      )}
    </FeaturedContainer>
  )
}

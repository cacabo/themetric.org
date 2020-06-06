import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { IAuthorPreview } from '../../types'

import { AUTHOR_ROUTE } from '../../constants/routes'
import { M1, M2, maxWidth } from '../../constants/measurements'
import { P, BackgroundImg } from '../../shared'

const THUMBNAIL_SIZE = '40px'

const ThumbnailLink = styled(Link)`
  margin-right: ${M1};
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  border-bottom: none !important;
`

const Thumbnail = styled(BackgroundImg)`
  width: ${THUMBNAIL_SIZE};
  height: ${THUMBNAIL_SIZE};
  margin-bottom: 0;
  overflow: hidden;
`

const AuthorText = styled.span`
  margin-right: ${M2};
  display: flex;
  align-items: center;
  margin-bottom: 0;
`

const BylineContainer = styled.div`
  padding-bottom: ${M2};
  width: 100%;
  display: flex;
  align-items: center;

  ${maxWidth('400px')} {
    display: block;
    padding-bottom: 0;

    > a {
      margin-bottom: ${M2};
    }
  }
`

interface IAuthorsProps {
  authors?: IAuthorPreview[]
}

export const Authors = ({ authors }: IAuthorsProps): React.ReactElement => {
  if (!authors || !authors.length) return <React.Fragment />

  return (
    <BylineContainer>
      {authors.map(({ slug, localImage, name }) => {
        const fluid = localImage?.childImageSharp?.fluid
        return (
          <AuthorText key={slug}>
            {fluid && (
              <ThumbnailLink to={AUTHOR_ROUTE(slug)}>
                <Thumbnail fluid={fluid} />
              </ThumbnailLink>
            )}
            <P mb0 inline sm>
              <Link to={AUTHOR_ROUTE(slug)}>{name}</Link>
            </P>
          </AuthorText>
        )
      })}
    </BylineContainer>
  )
}

import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { IAuthorPreview } from '../../types'

import { AUTHOR_ROUTE } from '../../constants/routes'
import { M1, M2, maxWidth } from '../../constants/measurements'
import { P } from '../../shared'

const THUMBNAIL_SIZE = '40px'

const ThumbnailLink = styled(Link)`
  margin-right: ${M1};
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  border-bottom: none !important;
`

const Thumbnail = styled.div<{ src: string }>`
  background-image: url(${({ src }): string => src});
  width: ${THUMBNAIL_SIZE};
  height: ${THUMBNAIL_SIZE};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 0;
`

// const Thumbnail = styled(BackgroundImage)`
//   width: ${THUMBNAIL_SIZE};
//   height: ${THUMBNAIL_SIZE};
//   background-position: center;
//   background-size: cover;
//   background-repeat: no-repeat;
//   margin-bottom: 0;
// `

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
      {authors.map(({ slug, profile_image, name }) => (
        <AuthorText key={slug}>
          {profile_image && (
            <ThumbnailLink to={AUTHOR_ROUTE(slug)}>
              {/* <Thumbnail fluid={getMemberImage(localImage)} /> */}
              <Thumbnail src={profile_image} />
            </ThumbnailLink>
          )}
          <P mb0 inline sm>
            <Link to={AUTHOR_ROUTE(slug)}>{name}</Link>
          </P>
        </AuthorText>
      ))}
    </BylineContainer>
  )
}

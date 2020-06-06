import * as React from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'

import { IAuthorPreview } from '../../types'
import { AUTHOR_ROUTE } from '../../constants/routes'
import { M2 } from '../../constants/measurements'
import {
  Card,
  Flex,
  H4,
  P,
  IconWrapper,
  MapPinIcon,
  BriefcaseIcon,
  BackgroundImg,
} from '../../shared'

const ProfileImage = s(BackgroundImg)`
  margin-bottom: 0;
  width: 68px;
  height: 68px;
  margin-right: ${M2};
  border-radius: 50%;
  overflow: hidden;
`

export const AuthorPreview = ({
  slug,
  localImage,
  name,
  loc,
  role,
}: IAuthorPreview): React.ReactElement => {
  const fluid = localImage?.childImageSharp?.fluid
  return (
    <Link to={AUTHOR_ROUTE(slug)} style={{ width: '100%', marginBottom: M2 }}>
      <Card hoverable clickable shaded mb0>
        <Flex>
          {fluid && <ProfileImage fluid={fluid} />}
          <div>
            <H4 mb0>{name}</H4>
            {role && (
              <P mb0 sm lighter inline>
                <IconWrapper>
                  <BriefcaseIcon />
                </IconWrapper>
                {role}
              </P>
            )}
            {loc && (
              <P mb0 sm lighter inline style={{ marginLeft: role ? M2 : '0' }}>
                <IconWrapper>
                  <MapPinIcon />
                </IconWrapper>
                {loc}
              </P>
            )}
          </div>
        </Flex>
      </Card>
    </Link>
  )
}

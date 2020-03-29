import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { HEADER_CONTENT_HEIGHT } from '../../constants/measurements'

const logoPath = require('../../images/svg/logo-white.svg') as string

const Image = styled.img<{}>`
  height: ${HEADER_CONTENT_HEIGHT};
  width: auto;
  margin-bottom: 0;
  user-select: none;
`

export const Logo = (): React.ReactElement => (
  <Link
    to="/"
    style={{ display: 'inline-block', height: HEADER_CONTENT_HEIGHT }}
  >
    <Image src={logoPath} alt="The Metric" />
  </Link>
)

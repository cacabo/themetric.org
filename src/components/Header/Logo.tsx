import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const logoPath = require('../../images/svg/logo-white.svg') as string // tslint:disable-line

const Image = styled.img<{}>`
  height: 2rem;
  width: auto;
  margin-bottom: 0;
  user-select: none;
`

export const Logo = (): React.ReactElement => (
  <Link to="/">
    <Image src={logoPath} alt="The Metric" />
  </Link>
)

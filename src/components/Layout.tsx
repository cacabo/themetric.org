import React from 'react'
import styled from 'styled-components'

import { Header } from './Header'
import { Footer } from './Footer'
import './Layout.css'
import {
  HEADER_HEIGHT,
  PHONE,
  MOBILE_HEADER_HEIGHT,
  maxWidth,
} from '../constants/measurements'

export const Main = styled.main<{}>`
  min-height: calc(100vh - ${HEADER_HEIGHT});

  ${maxWidth(PHONE)} {
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT});
  }
`

export const Layout = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
)

import React from 'react'
import { Hero, H1 } from '../../shared'
import { Regions } from './Regions'
import { Topics } from './Topics'

const Home = (): React.ReactElement => (
  <>
    <Hero>
      <H1 center>Hi People</H1>
    </Hero>
    <Topics />
    <Regions />
  </>
)

export default Home

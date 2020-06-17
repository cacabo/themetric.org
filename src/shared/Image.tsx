import s from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { FluidObject } from 'gatsby-image'

export const BackgroundImg = s(BackgroundImage)<{
  fluid: FluidObject
}>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
`

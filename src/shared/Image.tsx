import s from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { FluidObject } from 'gatsby-image'

interface IBackgroundImage {
  fluid: FluidObject
}

export const BackgroundImg = s(BackgroundImage)<IBackgroundImage>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
`

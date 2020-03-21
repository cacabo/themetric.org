import s from 'styled-components'

interface IBackgroundImage {
  src: string
}

export const BackgroundImage = s.div<IBackgroundImage>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  ${({ src }) => `background-image: url(${src});`}
`

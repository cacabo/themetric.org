import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { SHORT_ANIMATION_DURATION } from '../constants/measurements'
import { IChildrenProps } from '../types'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const FadeWrapper = styled.div`
  animation: ${fadeIn} ${SHORT_ANIMATION_DURATION}ms ease;
`

export const Fade = ({ children }: IChildrenProps): React.ReactElement => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 200)

    return (): void => clearTimeout(timeout)
  })

  if (!show) {
    return <React.Fragment />
  }

  return <FadeWrapper>{children}</FadeWrapper>
}

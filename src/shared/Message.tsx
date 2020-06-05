import React from 'react'
import s from 'styled-components'

import { Text } from './Typography'
import { AlertTriangleIcon, InfoIcon, AlertCircleIcon } from './Icons'
import {
  BORDER_RADIUS,
  M2,
  M4,
  M1,
  minWidth,
  TABLET,
} from '../constants/measurements'
import { PINK, RED, POLLEN, GOLD, SKY, BLUE } from '../constants/colors'

interface IMessageProps {
  message?: string
  bordered?: boolean
  showIcon?: boolean
}

enum T {
  ERROR,
  INFO,
  WARN,
}

interface IColorMap {
  bg: string
  color: string
}

const typeColorMap: { [key in T]: IColorMap } = {
  [T.ERROR]: {
    bg: PINK,
    color: RED,
  },
  [T.WARN]: {
    bg: POLLEN,
    color: GOLD,
  },
  [T.INFO]: {
    bg: SKY,
    color: BLUE,
  },
}

interface IWrapperProps {
  type: T
  bordered?: boolean
}

const getTypeStyles = (type: T): string => {
  const mapping = typeColorMap[type]
  if (!mapping) return ''
  const { bg, color } = mapping
  return `background: ${bg}; color: ${color}; border-color: ${color};`
}

const Wrapper = s.div<IWrapperProps>`
  padding: ${M2};
  border-radius: ${BORDER_RADIUS};
  margin-bottom: ${M4};
  border-width: ${({ bordered }): string => (bordered ? '2px' : '0')};
  border-style: solid;
  display: flex;

  p {
    margin-bottom: 0;
  }

  ${({ type }): string => getTypeStyles(type)}
`

const IconWrapper = s.div`
  margin-right: ${M1};
  width: auto;

  // Do not let icon interfere with height of error message
  height: 0;
  overflow-y: visible;

  ${minWidth(TABLET)} {
    margin-right: ${M2};
  }
`

const TextWrapper = s.div`
  flex: 1;
`

const messageGenerator = (type: T) => ({
  message,
  showIcon = true,
  ...props
}: IMessageProps): React.ReactElement | null => {
  if (!message) return null
  const color = typeColorMap[type].color
  return (
    <Wrapper type={type} {...props}>
      {showIcon && (
        <IconWrapper color={color}>
          {type === T.ERROR ? (
            <AlertTriangleIcon />
          ) : type === T.WARN ? (
            <AlertCircleIcon />
          ) : (
            <InfoIcon />
          )}
        </IconWrapper>
      )}
      <TextWrapper>
        <Text sm>{message}</Text>
      </TextWrapper>
    </Wrapper>
  )
}

export const ErrorMessage = messageGenerator(T.ERROR)
export const WarningMessage = messageGenerator(T.WARN)
export const InfoMessage = messageGenerator(T.INFO)

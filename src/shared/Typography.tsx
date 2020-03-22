import React from 'react'
import s, { css, FlattenSimpleInterpolation } from 'styled-components'
import { M0, M1, M2, M3, M4 } from '../constants/measurements'
import { BORDER, WHITE, DARK_GRAY_4, GRAY_1, GRAY_3 } from '../constants/colors'

export interface ITextProps {
  center?: boolean
  color?: string
  sm?: boolean
  lg?: boolean
  xs?: boolean
  bold?: boolean
  mb0?: boolean
  mb1?: boolean
  mb2?: boolean
  mb3?: boolean
  mb4?: boolean
  white?: boolean
  opacity?: number
  fontSize?: string
  children: string | React.ReactNode | React.ReactNodeArray | string[]
  style?: React.CSSProperties
  light?: boolean
  lighter?: boolean
  lightest?: boolean
}

/**
 * Given a mix of props passed to text and the `normal` (default text size),
 * return the text size in `em`
 */
const getFontSize = ({
  xs,
  sm,
  lg,
  normal,
}: Partial<ITextProps> & { normal: number }): string => {
  const sizeNum = xs
    ? normal / (1.2 * 1.2)
    : sm
    ? normal / 1.2
    : lg
    ? normal * 1.2
    : normal
  return `${sizeNum}em`
}

export const Text = s.p<ITextProps>(
  ({
    color,
    center,
    xs,
    sm,
    lg,
    mb0,
    mb1,
    mb2,
    mb3,
    mb4,
    bold,
    fontSize,
    white,
    opacity,
    light,
    lighter,
    lightest,
  }): FlattenSimpleInterpolation => css`
    line-height: 1.45;
    color: ${color || 'inherit'};
    text-align: ${center ? 'center' : 'left'};
    font-size: ${fontSize || getFontSize({ xs, sm, lg, normal: 1.2 })};
    ${white && `color: ${WHITE};`}
    ${opacity && `opacity: ${opacity};`}
    ${bold && 'font-weight: bold;'}
    ${mb0 && `margin-bottom: ${M0};`}
    ${mb1 && `margin-bottom: ${M1};`}
    ${mb2 && `margin-bottom: ${M2};`}
    ${mb3 && `margin-bottom: ${M3};`}
    ${mb4 && `margin-bottom: ${M4};`}
    ${light && `color: ${DARK_GRAY_4};`} // TODO don't use opacity here
    ${lighter && `color: ${GRAY_1};`}
    ${lightest && `color: ${GRAY_3};`}
  `,
)

export const P = Text

export const H1 = ({
  xs,
  sm,
  lg,
  children,
  ...rest
}: ITextProps): React.ReactElement => (
  <P as="h1" fontSize={getFontSize({ xs, sm, lg, normal: 2 })} {...rest}>
    {children}
  </P>
)
export const H2 = ({
  xs,
  sm,
  lg,
  children,
  ...rest
}: ITextProps): React.ReactElement => (
  <P as="h2" fontSize={getFontSize({ xs, sm, lg, normal: 1.8 })} {...rest}>
    {children}
  </P>
)
export const H3 = ({
  xs,
  sm,
  lg,
  children,
  ...rest
}: ITextProps): React.ReactElement => (
  <P as="h3" fontSize={getFontSize({ xs, sm, lg, normal: 1.6 })} {...rest}>
    {children}
  </P>
)
export const H4 = ({
  xs,
  sm,
  lg,
  children,
  ...rest
}: ITextProps): React.ReactElement => (
  <P as="h4" fontSize={getFontSize({ xs, sm, lg, normal: 1.4 })} {...rest}>
    {children}
  </P>
)
export const H5 = ({ children, ...rest }: ITextProps): React.ReactElement => (
  <P as="h5" {...rest}>
    {children}
  </P>
)
export const H6 = ({ children, ...rest }: ITextProps): React.ReactElement => (
  <P as="h6" {...rest}>
    {children}
  </P>
)

export const HR = s.hr`
  background: ${BORDER};
  margin-top: ${M4};
  margin-bottom: ${M4};
  display: block;
  width: 100%;
`

export const BR = s.br`
  width: 100%;
  display: block;
  height: 1rem;
`

interface ITextListProps {
  children: React.ReactElement[]
}

export const TextList = ({ children }: ITextListProps): React.ReactElement => (
  <>
    {children.map((child, idx) => (
      <React.Fragment key={child.key}>
        {child}
        {idx < children.length - 2 && ', '}
        {idx === children.length - 2 && ' and '}
      </React.Fragment>
    ))}
  </>
)

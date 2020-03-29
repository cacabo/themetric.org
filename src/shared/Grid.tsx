import React, { ReactElement, ReactNode } from 'react'
import s, { css } from 'styled-components'

import {
  minWidth,
  maxWidth,
  PHONE,
  TABLET,
  M1,
  M2,
  M3,
  M4,
} from '../constants/measurements'

const percent = (numCols: number): string => (numCols / 12) * 100 + '%'

export const Section = s.section<{}>`
  padding-top: 7.5vh;
  padding-bottom: 7.5vh;
`

interface IContainerTagProps {
  background?: string
}

export const Container = s.div<IContainerTagProps>`
  padding-right: 1rem;
  padding-left: 1rem;
  width: 100%;
  display: block;
  background: ${({ background }): string => background || 'transparent'};

  ${minWidth(PHONE)} {
    padding-right: calc(1rem + 2.5%);
    padding-left: calc(1rem + 2.5%);
  }

  ${minWidth(TABLET)} {
    padding-right: calc(1rem + 5%);
    padding-left: calc(1rem + 5%);
  }
`

interface ISpacerProps {
  hiddenOnMobile?: boolean
  onlyOnMobile?: boolean
  xs?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
}

export const Spacer = s.div<ISpacerProps>(
  ({ hiddenOnMobile, onlyOnMobile, xs, sm, md, lg, xl }) => css`
    display: block;
    width: 100%;
    height: ${xs
      ? '0.4rem'
      : sm
      ? '0.8rem'
      : md
      ? '1.6rem'
      : lg
      ? '2.4rem'
      : xl
      ? '3.2rem'
      : '1.6rem'};

    ${onlyOnMobile && `${minWidth(PHONE)} { display: none; }`}
    ${hiddenOnMobile && `${maxWidth(PHONE)} { display: none; }`}
  `,
)

export const ResponsiveSpacer = s.div<ISpacerProps>(
  ({ onlyOnMobile, hiddenOnMobile, xs, sm, md, lg, xl }) => css`
    display: block;
    width: 100%;
    height: ${xs
      ? '2vh'
      : sm
      ? '4vh'
      : md
      ? '8vh'
      : lg
      ? '12vh'
      : xl
      ? '16vh'
      : '8vh'};

    ${onlyOnMobile && `${minWidth(PHONE)} { display: none; }`}
    ${hiddenOnMobile && `${maxWidth(PHONE)} { display: none; }`}
  `,
)

export const Flex = s.div`
  width: 100%;
  display: flex;
`

interface IRowProps {
  margin?: string
  alwaysFlex?: boolean
  mb0?: boolean
  mb1?: boolean
  mb2?: boolean
  mb3?: boolean
  mb4?: boolean
}

export const Row = s.div<IRowProps>(
  ({ margin, alwaysFlex, mb0, mb1, mb2, mb3, mb4 }) => css`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;

    ${!alwaysFlex && `${maxWidth(PHONE)} { display: block; }`}

    ${
      margin &&
      `
    margin-left: -${margin};
    margin-right: -${margin};
    width: calc(100% + ${margin} + ${margin});
  `
    }

  ${mb0 && 'margin-bottom: 0;'}
  ${mb1 && `margin-bottom: ${M1};`}
  ${mb2 && `margin-bottom: ${M2};`}
  ${mb3 && `margin-bottom: ${M3};`}
  ${mb4 && `margin-bottom: ${M4};`}
  `,
)

export interface IColProps {
  width?: string
  sm?: number
  offsetSm?: number
  md?: number
  offsetMd?: number
  lg?: number
  offsetLg?: number
  flex?: boolean
  margin?: string
  children?: ReactNode
  overflowY?: 'visibile' | 'scroll' | 'hidden' | 'auto'
  background?: string
}

const ColWrapper = s.div<IColProps>`
  flex: ${({ width }): string => (width ? 'none' : '1')};
  width: ${({ width }): string => width || 'auto'};
  overflow-y: ${({ overflowY }): string => overflowY || 'visible'};
  overflow-x: visible;

  ${({ sm }): string => (sm ? `width: ${percent(sm)}; flex: none;` : '')}
  ${({ offsetSm }): string =>
    offsetSm || offsetSm === 0 ? `margin-left: ${percent(offsetSm)};` : ''}

  ${minWidth(PHONE)} {
     ${({ md }): string => (md ? `width: ${percent(md)}; flex: none;` : '')}
    ${({ offsetMd }): string =>
      offsetMd || offsetMd === 0 ? `margin-left: ${percent(offsetMd)};` : ''}
  }

  ${minWidth(TABLET)} {
    ${({ lg }): string => (lg ? `width: ${percent(lg)}; flex: none;` : '')}
    ${({ offsetLg }): string =>
      offsetLg || offsetLg === 0 ? `margin-left: ${percent(offsetLg)};` : ''}
  }

  ${({ flex }): string => (flex ? 'display: flex;' : '')}
`

const ColContainer = s.div<IColProps>`
  background: ${({ background }): string => background || 'transparent'};
  overflow-x: visible;
  position: relative;

  ${({ flex }): string => (flex ? 'display: flex; flex: 1;' : '')}

  ${({ margin }): string =>
    margin && `margin-left: ${margin}; margin-right: ${margin};`}
`

export const Col = ({
  margin,
  children,
  background,
  flex,
  ...other
}: IColProps): React.ReactElement => (
  <ColWrapper flex={flex} {...other}>
    <ColContainer flex={flex} margin={margin} background={background}>
      {children}
    </ColContainer>
  </ColWrapper>
)

export interface IColSpaceProps {
  width?: string
}

export const ColSpace = s(Col)<IColSpaceProps>`
  flex: none;
  width: ${({ width }): string => width || '1rem'};

  ${maxWidth(PHONE)} {
    display: none;
  }
`

interface IContainerProps {
  children: ReactNode
  background?: string
  foreground?: string
}

export const WideContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={10} offsetMd={1} lg={8} offsetLg={2}>
        {children}
      </Col>
    </Row>
  </Container>
)

export const MediumContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={8} offsetMd={2} lg={6} offsetLg={3}>
        {children}
      </Col>
    </Row>
  </Container>
)

export const ThinContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={8} offsetMd={2} lg={5} offsetLg={3.5}>
        {children}
      </Col>
    </Row>
  </Container>
)

export const Hero = s.div`
  padding: 12.5vh 0;
  width: 100%;
  display: block;
`

export const Center = s.div`
  text-align: center;
  display: block;
  width: 100%;
`

import styled, { css } from 'styled-components'
import {
  M2,
  BORDER_RADIUS_LG,
  SHORT_ANIMATION_DURATION,
  LONG_ANIMATION_DURATION,
  M1,
  M3,
  M4,
} from '../constants/measurements'
import { WHITE, BORDER, BLACK_ALPHA } from '../constants/colors'

interface ICardProps {
  bordered?: boolean
  hoverable?: boolean
  shaded?: boolean
  clickable?: boolean
  mb0?: boolean
  mb1?: boolean
  mb2?: boolean
  mb3?: boolean
  mb4?: boolean
}

export const Card = styled.div<ICardProps>(
  ({ bordered, shaded, clickable, hoverable, mb0, mb1, mb2, mb3, mb4 }) => css`
  padding: ${M2};
  background: ${WHITE};
  margin-bottom: ${
    mb0 ? '0' : mb1 ? M1 : mb2 ? M2 : mb3 ? M3 : mb4 ? M4 : '1.35rem'
  };
  border-radius: ${BORDER_RADIUS_LG};
  background: ${WHITE};
  box-shadow: 0 0 0 ${BLACK_ALPHA(0)};
  ${bordered && `border: 1px solid ${BORDER};`}
  ${shaded && `box-shadow: 0 1px 6px ${BLACK_ALPHA(0.125)};`}
  ${
    clickable &&
    `
    cursor: pointer;
    transform: translateY(0);
    transition: all ${LONG_ANIMATION_DURATION}ms ease;

    :hover,
    :active,
    :focus {
      transform: translateY(-2px);
    }
  `
  }
  ${
    hoverable &&
    `
    transition: all ${SHORT_ANIMATION_DURATION}ms ease;

    :hover,
    :active,
    :focus {
      box-shadow: 0 2px 12px ${BLACK_ALPHA(0.25)};
    }
  `
  }
`,
)

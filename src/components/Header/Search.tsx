import React, { useState } from 'react'
import s from 'styled-components'
import {
  M2,
  BORDER_RADIUS_LG,
  SHORT_ANIMATION_DURATION,
  maxWidth,
  TABLET,
} from '../../constants/measurements'
import {
  BORDER,
  BLUE,
  OUTLINE,
  WHITE,
  WHITE_ALPHA,
  BLACK,
} from '../../constants/colors'

// TODO share state between nav bars?
// TODO handle escape keypress?

const Wrapper = s.div`
  width: auto;

  ${maxWidth(TABLET)} {
    width: 100%;
    text-align: center;
  }
`

const Input = s.input<{ active: boolean }>`
  margin-left: ${M2};
  border-radius: ${BORDER_RADIUS_LG};
  box-shadow: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${BORDER};
  padding: 4px 12px;
  width: ${(props): string => (props.active ? '20rem' : '16rem')};
  background: ${(props): string => (props.active ? WHITE : WHITE_ALPHA(0.25))};
  color: ${(props): string => (props.active ? BLACK : WHITE_ALPHA(0.64))};
  transition: all ${SHORT_ANIMATION_DURATION}ms ease;
  font-size: 16px;
  margin-top: -0.5px;

  &:hover {
    background: ${(props): string => (props.active ? WHITE : WHITE_ALPHA(0.4))};
  }

  &:focus,
  &:active {
    border-color: ${BLUE};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${OUTLINE};
  }

  ${maxWidth(TABLET)} {
    margin-left: 0;
    margin-top: ${M2};
  }
`

interface ISearchState {
  active: boolean
}

export const Search = ({ fixed }: { fixed: boolean }): React.ReactElement => {
  const [{ active }, setState] = useState<ISearchState>({
    active: false,
  })

  return (
    <Wrapper>
      <Input
        id={fixed ? 'fixed-search' : 'search'}
        active={active}
        onFocus={(): void => setState({ active: true })}
        onBlur={(): void => setState({ active: false })}
        placeholder="Search..."
      />
    </Wrapper>
  )
}

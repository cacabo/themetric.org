import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Dispatch,
} from 'react'
import s from 'styled-components'
import {
  M2,
  BORDER_RADIUS_LG,
  SHORT_ANIMATION_DURATION,
  maxWidth,
  TABLET,
  PHONE,
  M1,
  LONG_ANIMATION_DURATION,
  HEADER_HEIGHT,
  DESKTOP,
  minWidth,
} from '../../constants/measurements'
import {
  BORDER,
  BLUE,
  WHITE,
  WHITE_ALPHA,
  BLACK,
  BLACK_ALPHA,
  LIGHT_GRAY_4,
} from '../../constants/colors'
import { Link, navigate } from 'gatsby'
import { ARTICLE_ROUTE } from '../../constants/routes'
import { P, Spacer, Input } from '../../shared'
import {
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  ENTER_KEY,
  ESCAPE_KEY,
} from '../../constants/keys'
import { ISearchReducerAction, ISearchReducerState } from './searchReducer'

const Wrapper = s.div<{ active: boolean }>`
  margin-left: ${M2};
  position: relative;
  transition: width ${SHORT_ANIMATION_DURATION}ms ease;
  width: ${(props): string => (props.active ? '20rem' : '16rem')};

  ${maxWidth(DESKTOP)} {
    flex: 1;
    width: 100%;
  }

  ${maxWidth(TABLET)} {
    width: 100%;
    text-align: center;
    margin-left: 0;
  }

  ${minWidth(DESKTOP)} {
    width: ${(props): string => (props.active ? '24rem' : '18rem')};
  }
`

const ResultsList = s.ul<{ active: boolean }>`
  position: absolute;
  background: ${WHITE};
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  border-style: solid;
  border-color: ${BORDER};
  border-width: 0 2px 2px 2px;
  border-radius: 0 0 ${BORDER_RADIUS_LG} ${BORDER_RADIUS_LG};
  box-shadow: 0 2px 16px ${BLACK_ALPHA(0.3)};
  z-index: -1;
  list-style-type: none;
  max-height: calc(100vh - ${HEADER_HEIGHT} - 1rem);
  overflow-y: auto;
  opacity: 1;

  transition: all ${LONG_ANIMATION_DURATION} ms ease;

  li {
    margin-bottom: 0;
  }

  ${(props): string =>
    props.active
      ? ''
      : `
    max-height: 0;
    border-width: 0;
    opacity: 0;
  `}
`

const StyledInput = s(Input)<{ active: boolean }>`
  border-radius: ${(props): string =>
    props.active
      ? `${BORDER_RADIUS_LG} ${BORDER_RADIUS_LG} 0 0`
      : BORDER_RADIUS_LG};
  padding: 4px ${M2};
  background: ${(props): string => (props.active ? WHITE : WHITE_ALPHA(0.25))};
  color: ${(props): string => (props.active ? BLACK : WHITE_ALPHA(0.64))};
  margin-top: -1px;
  margin-bottom: -1px;

  &:hover {
    background: ${(props): string => (props.active ? WHITE : WHITE_ALPHA(0.4))};
  }

  ${maxWidth(TABLET)} {
    margin-left: 0;
    margin-top: ${M2};
  }

  ${maxWidth(PHONE)} {
    width: 100%;
  }
`

const StyledLink = s(Link)`
  display: inline-block;
  width: 100%;
  padding: ${M1} ${M2};
  cursor: pointer;
  width: 100%;

  &:focus {
    width: calc(100% - 4px);
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 2px;
    padding: calc(${M1} - 2px) calc(${M2} - 2px);
    outline: 0;
    box-shadow: 0 0 0 2px ${BLUE};
    background: ${LIGHT_GRAY_4};
  }
`

const ListItem = s.li<{ active: boolean }>`
  background: ${(props): string => (props.active ? LIGHT_GRAY_4 : WHITE)};
  transition: background ${SHORT_ANIMATION_DURATION}ms ease;

  &:hover,
  &:focus,
  &:active {
    background: ${LIGHT_GRAY_4};
  }

  border-bottom: 1px solid ${BORDER};

  &:last-child {
    border-bottom-width: 0;

    a {
      border-radius: 0 0 ${BORDER_RADIUS_LG} ${BORDER_RADIUS_LG};
    }
  }
`

export interface ISearchState {
  active: boolean
  activeResultIdx: number
}

export const Search = ({
  query,
  results,
  dispatch,
}: {
  dispatch: Dispatch<ISearchReducerAction>
} & ISearchReducerState): React.ReactElement => {
  const [{ active, activeResultIdx }, setState] = useState<ISearchState>({
    active: false,
    activeResultIdx: 0,
  })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateState = useCallback(
    (newPartialState: Partial<ISearchState>): void => {
      setState({
        active,
        activeResultIdx,
        ...newPartialState,
      })
    },
    [active, activeResultIdx],
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (results.length === 0) {
      if (activeResultIdx !== 0) {
        updateState({ activeResultIdx: 0 })
      }
    } else if (results.length <= activeResultIdx) {
      updateState({ activeResultIdx: results.length - 1 })
    }
  }, [activeResultIdx, query, results.length, updateState])

  const exitSearch = (): void => {
    updateState({ active: false })

    setTimeout(() => {
      if (
        !inputRef ||
        !inputRef.current ||
        !wrapperRef ||
        !wrapperRef.current
      ) {
        return
      }

      inputRef.current.blur()
      wrapperRef.current.blur()
    }, 0)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const { key } = event
    if (!key) {
      return
    }

    if (key === ARROW_DOWN_KEY) {
      if (activeResultIdx + 1 >= results.length) {
        return
      }

      updateState({ activeResultIdx: activeResultIdx + 1 })
    } else if (key === ARROW_UP_KEY) {
      if (activeResultIdx <= 0) {
        return
      }

      updateState({ activeResultIdx: activeResultIdx - 1 })
    } else if (key === ENTER_KEY) {
      event.preventDefault()
      event.stopPropagation()
      const { slug } = results[activeResultIdx] || {}
      if (!slug) {
        return
      }

      const newRoute = ARTICLE_ROUTE(slug)
      const { pathname: oldRoute } = (window || {}).location || {}

      if (newRoute === oldRoute) {
        exitSearch()
      } else {
        navigate(newRoute)
      }
    } else if (key === ESCAPE_KEY) {
      exitSearch()
    }
  }

  /**
   * Adapted from https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
   *
   * @param {React.FocusEvent} event
   * @returns {void}
   */
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (!active) {
      return
    }

    const { currentTarget } = event

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        updateState({ active: false })
      } else {
        // Do not blur
        event.preventDefault()
      }
    }, 0)
  }

  return (
    <>
      <Wrapper active={active} onBlur={handleBlur} ref={wrapperRef}>
        <StyledInput
          active={active}
          onFocus={(): void => updateState({ active: true })}
          placeholder="Search..."
          value={query}
          autoComplete="off"
          ref={inputRef}
          onChange={(event): void => {
            dispatch({ type: 'QUERY', query: event.target.value })
          }}
          onKeyDown={handleKeyDown}
        />
        <ResultsList active={active}>
          {results.length === 0 && <Spacer />}
          {results.map(
            ({ subtitle, slug, title }, idx): React.ReactElement => (
              <ListItem key={slug} active={idx === activeResultIdx}>
                <StyledLink
                  to={ARTICLE_ROUTE(slug)}
                  onMouseEnter={(): void =>
                    updateState({ activeResultIdx: idx })
                  }
                  onClick={(): void => exitSearch()}
                  tabIndex={active ? 0 : -1}
                >
                  <P bold mb1 sm>
                    {title}
                  </P>
                  <P xs lighter>
                    {subtitle}
                  </P>
                </StyledLink>
              </ListItem>
            ),
          )}
        </ResultsList>
      </Wrapper>
    </>
  )
}

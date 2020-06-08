import React, { useState, useEffect, useReducer, Dispatch } from 'react'
import styled, { css } from 'styled-components'

import { Links } from './Links'
import { Bars } from './Bars'
import { Logo } from './Logo'
import { Shade, ContainerFluid } from '../../shared'

import {
  maxWidth,
  HEADER_CONTENT_HEIGHT,
  HEADER_PADDING,
  HEADER_Z_INDEX,
  MOBILE_HEADER_HEIGHT,
  SHORT_ANIMATION_DURATION,
  HEADER_HEIGHT,
  TABLET,
  TABLET_WIDTH,
} from '../../constants/measurements'
import { BLACK_ALPHA, BLACK } from '../../constants/colors'
import { Social } from './Social'
import { Search } from './Search'
import { ArticlesSidebar } from './ArticlesSidebar'
import { SearchSidebar } from './SearchSidebar'
import { useWindowSize } from '../../hooks/useWindowSize'
import {
  searchReducer,
  initialSearchState,
  ISearchReducerAction,
  ISearchReducerState,
} from './searchReducer'

const getScrollTop = (): number =>
  window.pageYOffset !== undefined
    ? window.pageYOffset
    : (((document.documentElement ||
        document.body.parentNode ||
        document.body) as unknown) as { scrollTop: number }).scrollTop || 0

interface IWrapperProps {
  active?: boolean
  fixed?: boolean
  shouldShowFixed?: boolean
}

const StyledNav = styled.nav<IWrapperProps>(
  ({ fixed, shouldShowFixed, active }) => css`
    padding-top: ${HEADER_PADDING};
    padding-bottom: ${HEADER_PADDING};
    position: ${fixed ? 'fixed' : 'absolute'};
    top: ${fixed ? (shouldShowFixed ? '0' : '-4rem') : '0'};
    transition: all ${SHORT_ANIMATION_DURATION}ms ease;
    left: 0;
    z-index: ${HEADER_Z_INDEX};
    width: 100vw;
    min-height: calc(
      ${HEADER_CONTENT_HEIGHT} + ${HEADER_PADDING} + ${HEADER_PADDING}
    );
    background: ${BLACK};
    box-shadow: 0 1px 4px ${BLACK_ALPHA(0.5)};

    ${maxWidth(TABLET)} {
      min-height: 0;
      max-height: ${active ? '100vh' : MOBILE_HEADER_HEIGHT};
      overflow: hidden;
      box-shadow: 0 1px 8px ${BLACK_ALPHA(0.5)};
    }
  `,
)

const StyledContainer = styled(ContainerFluid)<{}>`
  display: flex;
  flex-direction: row;

  ${maxWidth(TABLET)} {
    display: block;
  }
`

const NavSpace = styled.div`
  width: 100%;
  display: block;
  height: ${HEADER_HEIGHT};

  ${maxWidth(TABLET)} {
    height: ${MOBILE_HEADER_HEIGHT};
  }
`

type IHeaderProps = {
  isActive: boolean
  setIsActive: (isActive: boolean) => void
  fixed?: boolean
  setArticlesSidebarActive: (show: boolean) => void
  setSearchSidebarActive: (show: boolean) => void
  dispatch: Dispatch<ISearchReducerAction>
} & ISearchReducerState

interface IFixedState {
  prevScrollTop: number
  shouldShowFixed: boolean
}

const Nav = ({
  isActive,
  setIsActive,
  fixed = false,
  setArticlesSidebarActive,
  setSearchSidebarActive,
  dispatch,
  query,
  results,
}: IHeaderProps): React.ReactElement => {
  const [{ prevScrollTop, shouldShowFixed }, setFixedState] = useState<
    IFixedState
  >({
    prevScrollTop: 0,
    shouldShowFixed: false,
  })

  const { width } = useWindowSize()
  const shouldRenderSearch = width > TABLET_WIDTH

  useEffect(() => {
    if (!fixed) {
      return
    }

    const handleScroll = (): void => {
      if (isActive) {
        return
      }

      const scrollTop = getScrollTop()
      const diff = scrollTop - prevScrollTop

      if (shouldShowFixed && scrollTop < 200 && diff < -50) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed: false,
        })
      }

      if (!shouldShowFixed && diff < -50 && scrollTop > 200) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed: true,
        })
      }

      if (shouldShowFixed && diff > 10) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed: false,
        })
      }

      if (diff > 50 || diff < -50) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const toggle = (): void => setIsActive(!isActive)

  return (
    <>
      <StyledNav
        active={isActive}
        fixed={fixed}
        shouldShowFixed={shouldShowFixed}
      >
        <StyledContainer>
          <Logo />
          <Social />
          {shouldRenderSearch && <Search {...{ dispatch, query, results }} />}
          <Bars handleClick={toggle} />
          <Links
            active={isActive}
            {...{ setArticlesSidebarActive, setSearchSidebarActive }}
          />
        </StyledContainer>
      </StyledNav>
      {!fixed && <NavSpace />}
      <Shade
        tabIndex={-1}
        zIndex={HEADER_Z_INDEX - 1}
        show={isActive}
        onClick={toggle}
      />
    </>
  )
}

export const Header = (): React.ReactElement => {
  const [searchState, searchStateDispatch] = useReducer(
    searchReducer,
    initialSearchState,
  )
  const { width } = useWindowSize()
  const shouldRenderSearchSidebar = width < TABLET_WIDTH

  const [articlesSidebarActive, setArticlesSidebarActive] = useState<boolean>(
    false,
  )
  const [searchSidebarActive, setSearchSidebarActive] = useState<boolean>(false)
  const sharedNavProps = {
    setArticlesSidebarActive,
    setSearchSidebarActive,
    dispatch: searchStateDispatch,
    ...searchState,
  }
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isFixedActive, setIsFixedActive] = useState<boolean>(false)

  const closeHeaderMenu = (): void => {
    setIsActive(false)
    setIsFixedActive(false)
  }

  return (
    <>
      <Nav {...sharedNavProps} {...{ isActive, setIsActive }} />
      <Nav
        {...sharedNavProps}
        isActive={isFixedActive}
        setIsActive={setIsFixedActive}
        fixed
      />
      <ArticlesSidebar
        show={articlesSidebarActive}
        setShow={setArticlesSidebarActive}
        closeHeaderMenu={closeHeaderMenu}
      />
      {shouldRenderSearchSidebar && (
        <SearchSidebar
          {...searchState}
          dispatch={searchStateDispatch}
          show={searchSidebarActive}
          setShow={setSearchSidebarActive}
          closeHeaderMenu={closeHeaderMenu}
        />
      )}
    </>
  )
}

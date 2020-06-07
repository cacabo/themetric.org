import React, { useState, useEffect } from 'react'
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
} from '../../constants/measurements'
import { BLACK_ALPHA, BLACK } from '../../constants/colors'
import { Social } from './Social'
import { Search } from './Search'
import { ArticlesLinks } from './ArticlesLinks'

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

interface IHeaderProps {
  fixed?: boolean
  toggleArticlesLinksActive: () => void
}

interface IFixedState {
  prevScrollTop: number
  shouldShowFixed: boolean
}

interface IActiveState {
  isNewlyMounted: boolean
  isActive: boolean
}

const Nav = ({
  fixed = false,
  toggleArticlesLinksActive,
}: IHeaderProps): React.ReactElement => {
  const [{ prevScrollTop, shouldShowFixed }, setFixedState] = useState<
    IFixedState
  >({
    prevScrollTop: 0,
    shouldShowFixed: false,
  })
  const [{ isActive, isNewlyMounted }, setActiveState] = useState<IActiveState>(
    {
      isNewlyMounted: true,
      isActive: false,
    },
  )

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

  const toggle = (): void => {
    if (isNewlyMounted) {
      return setActiveState({ isNewlyMounted: false, isActive: !isActive })
    }

    return setActiveState({
      isNewlyMounted,
      isActive: !isActive,
    })
  }

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
          <Search fixed={fixed} />
          <Bars handleClick={toggle} />
          <Links
            active={isActive}
            toggleArticlesLinksActive={toggleArticlesLinksActive}
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
  const [isArticlesLinksActive, setIsArticlesLinksActive] = useState<boolean>(
    false,
  )
  const toggle = (): void => setIsArticlesLinksActive(!isArticlesLinksActive)

  return (
    <>
      <Nav toggleArticlesLinksActive={toggle} />
      <Nav toggleArticlesLinksActive={toggle} fixed />
      <ArticlesLinks show={isArticlesLinksActive} toggle={toggle} />
      <Shade
        tabIndex={-1}
        zIndex={HEADER_Z_INDEX + 1}
        show={isArticlesLinksActive}
        onClick={toggle}
      />
    </>
  )
}

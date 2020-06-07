import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Sidebar, SidebarDiv, Input, SidebarLink, P } from '../../shared'
import { ISearchResult, getSearchResults } from '../../helpers/misc'
import { ARTICLE_ROUTE } from '../../constants/routes'
import { SHORT_ANIMATION_DURATION } from '../../constants/measurements'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const SidebarDivWithFadeIn = styled(SidebarDiv)`
  animation: ${fadeIn} ${SHORT_ANIMATION_DURATION}ms ease;
`

const NoSearchResults = (): React.ReactElement => {
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

  return (
    <SidebarDivWithFadeIn>
      <P mb0 style={{ opacity: 0.64 }}>
        No search results match your query.
      </P>
    </SidebarDivWithFadeIn>
  )
}

export const SearchSidebar = ({
  show,
  setShow,
}: {
  show: boolean
  setShow: (show: boolean) => void
}): React.ReactElement => {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<ISearchResult[]>([])

  useEffect(() => {
    const newResults = getSearchResults(query)
    setResults(newResults)
  }, [query])

  return (
    <Sidebar show={show} setShow={setShow} title="Search">
      <SidebarDiv>
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e): void => setQuery(e.target.value)}
        />
      </SidebarDiv>
      {query && !results.length && <NoSearchResults />}
      {results.map(({ excerpt, slug, title }) => (
        <SidebarLink
          to={ARTICLE_ROUTE(slug)}
          key={slug}
          onClick={(): void => setShow(false)}
        >
          <P mb1 bold>
            {title}
          </P>
          <P mb0 sm style={{ opacity: 0.8 }}>
            {excerpt}
          </P>
        </SidebarLink>
      ))}
    </Sidebar>
  )
}

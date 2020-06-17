import React, { Dispatch } from 'react'
import { Sidebar, SidebarDiv, Input, SidebarLink, P, Fade } from '../../shared'
import { ARTICLE_ROUTE } from '../../constants/routes'
import { ISearchReducerAction, ISearchReducerState } from './searchReducer'

const NoSearchResults = (): React.ReactElement => (
  <Fade>
    <SidebarDiv>
      <P sm mb0 style={{ opacity: 0.64 }}>
        No search results match your query.
      </P>
    </SidebarDiv>
  </Fade>
)

export const SearchSidebar = ({
  show,
  setShow,
  closeHeaderMenu,
  dispatch,
  query,
  results,
}: {
  show: boolean
  setShow: (show: boolean) => void
  closeHeaderMenu: () => void
  dispatch: Dispatch<ISearchReducerAction>
} & ISearchReducerState): React.ReactElement => {
  const close = (): void => {
    setShow(false)
    closeHeaderMenu()
  }

  return (
    <Sidebar show={show} setShow={setShow} title="Search">
      <SidebarDiv>
        <Input
          placeholder="Search..."
          autoComplete="off"
          value={query}
          onChange={(e): void =>
            dispatch({ type: 'QUERY', query: e.target.value })
          }
        />
      </SidebarDiv>
      {query && !results.length && <NoSearchResults />}
      {results.map(({ subtitle, slug, title }) => (
        <SidebarLink to={ARTICLE_ROUTE(slug)} key={slug} onClick={close}>
          <P mb1 bold>
            {title}
          </P>
          <P mb0 sm style={{ opacity: 0.8 }}>
            {subtitle}
          </P>
        </SidebarLink>
      ))}
    </Sidebar>
  )
}

import React from 'react'
import { Sidebar, SidebarLink, SidebarHeader } from '../../shared'
import {
  ARTICLES_ROUTE,
  HOME_ROUTE,
  REGION_ROUTE,
  TAG_ROUTE,
} from '../../constants/routes'
import { REGIONS, ERegionSlug } from '../../constants/regions'
import { ITag } from '../../types'
import { usePopularTags } from '../../hooks/usePopularTags'

export const ArticlesSidebar = ({
  show,
  setShow,
}: {
  show: boolean
  setShow: (show: boolean) => void
}): React.ReactElement => {
  const tags = usePopularTags()
  const close = (): void => setShow(false)

  return (
    <Sidebar show={show} setShow={setShow} title="Articles">
      <SidebarLink to={HOME_ROUTE} onClick={close}>
        Home
      </SidebarLink>
      <SidebarLink to={ARTICLES_ROUTE} onClick={close}>
        All articles
      </SidebarLink>
      <SidebarHeader sm>Regions</SidebarHeader>
      {(Object.keys(REGIONS) as ERegionSlug[]).map(
        (region): React.ReactElement => (
          <SidebarLink to={REGION_ROUTE(region)} key={region} onClick={close}>
            {REGIONS[region]}
          </SidebarLink>
        ),
      )}
      <SidebarHeader sm>Tags</SidebarHeader>
      {tags.map(({ id, name, slug }: ITag) => (
        <SidebarLink to={TAG_ROUTE(slug)} key={id} onClick={close}>
          {name}
        </SidebarLink>
      ))}
    </Sidebar>
  )
}

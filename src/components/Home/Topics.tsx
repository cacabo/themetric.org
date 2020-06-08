import React from 'react'
import { H3, WideContainer, PillsWrapper, Pill } from '../../shared'
import { TAG_ROUTE } from '../../constants/routes'
import { usePopularTags } from '../../hooks/usePopularTags'

export const Topics = (): React.ReactElement => {
  const tags = usePopularTags()

  return (
    <WideContainer>
      <H3 center>Topics</H3>
      <PillsWrapper>
        {tags.map(
          ({ slug, id, name }): React.ReactElement => (
            <Pill to={TAG_ROUTE(slug)} key={id}>
              {name}
            </Pill>
          ),
        )}
      </PillsWrapper>
    </WideContainer>
  )
}

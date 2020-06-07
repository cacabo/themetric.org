import React from 'react'
import { H1, WideContainer, PillsWrapper, Pill, Spacer } from '../../shared'
import { TAG_ROUTE } from '../../constants/routes'
import { usePopularTags } from '../../hooks/usePopularTags'

export const Topics = (): React.ReactElement => {
  const tags = usePopularTags()

  return (
    <WideContainer>
      <H1 center>Topics</H1>
      <PillsWrapper>
        {tags.map(
          ({ slug, id, name }): React.ReactElement => (
            <Pill to={TAG_ROUTE(slug)} key={id}>
              {name}
            </Pill>
          ),
        )}
      </PillsWrapper>
      <Spacer />
    </WideContainer>
  )
}

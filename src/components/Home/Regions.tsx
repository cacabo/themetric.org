import React from 'react'
import { H1, WideContainer, PillsWrapper, Pill } from '../../shared'
import { REGIONS, ERegionSlug } from '../../constants/regions'
import { REGION_ROUTE } from '../../constants/routes'

export const Regions = (): React.ReactElement => (
  <WideContainer>
    <H1 center>Regions</H1>
    <PillsWrapper>
      {(Object.keys(REGIONS) as ERegionSlug[]).map(
        (slug): React.ReactElement => (
          <Pill to={REGION_ROUTE(slug)} key={slug}>
            {REGIONS[slug]}
          </Pill>
        ),
      )}
    </PillsWrapper>
  </WideContainer>
)

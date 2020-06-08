import React from 'react'
import { WideContainer, PillsWrapper, Pill, H3 } from '../../shared'
import { REGIONS, ERegionSlug } from '../../constants/regions'
import { REGION_ROUTE } from '../../constants/routes'

export const Regions = (): React.ReactElement => (
  <WideContainer>
    <H3 bold center>
      Regions
    </H3>
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

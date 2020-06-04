export enum ERegionSlug {
  NORTH_AMERICA = 'north-america',
  LATIN_AMERICA = 'latin-america',
  EUROPE = 'europe',
  MIDDLE_EAST_AND_NORTH_AFRICA = 'middle-east-north-africa',
  AFRICA = 'africa',
  ASIA_AND_OCEANIA = 'asia-oceania',
}

export enum ERegionName {
  NORTH_AMERICA = 'North America',
  LATIN_AMERICA = 'Latin America',
  EUROPE = 'Europe',
  MIDDLE_EAST_AND_NORTH_AFRICA = 'Middle East & North Africa',
  AFRICA = 'Africa',
  ASIA_AND_OCEANIA = 'Asia & Oceania',
}

// Map from slugs to names for regions
export const REGIONS: Record<ERegionSlug, ERegionName> = {} as Record<
  ERegionSlug,
  ERegionName
>

Object.keys(ERegionSlug).forEach((key): void => {
  const name: ERegionName = ERegionName[key as keyof typeof ERegionName]
  const slug: ERegionSlug = ERegionSlug[key as keyof typeof ERegionSlug]
  REGIONS[slug] = name
})

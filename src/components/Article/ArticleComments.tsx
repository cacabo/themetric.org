import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import { ARTICLE_ROUTE } from '../../constants/routes'

export const ArticleComments = ({
  title,
  slug,
}: {
  title: string
  slug: string
}): React.ReactElement => (
  <DiscussionEmbed
    shortname={process.env.GATSBY_DISQUS_ID as string}
    config={{
      url: ARTICLE_ROUTE(slug),
      identifier: slug,
      title,
    }}
  />
)

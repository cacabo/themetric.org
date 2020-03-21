import * as React from 'react'
import { IArticlePreview } from '../../types'
import { ArticlePreview } from './ArticlePreview'

interface IArticlePreviewsProps {
  articles: IArticlePreview[]
}

export const ArticlePreviews = ({
  articles,
}: IArticlePreviewsProps): React.ReactElement => (
  <>
    {articles.map(a => (
      <ArticlePreview {...a} key={a.id} />
    ))}
  </>
)

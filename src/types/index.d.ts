export interface IAuthorPreview {
  id: string
  slug: string
  name: string
}

export interface ITag {
  id: string
  slug: string
  name: string
}

export interface IArticlePreview {
  id: string
  title: string
  excerpt?: string
  slug: string
  feature_image?: string
  published_at: string
  reading_time: number
  authors: IAuthorPreview[]
  tags: ITag[]
}

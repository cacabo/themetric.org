import { GatsbySourceNodes } from './types'

/**
 * Manually create "authors" who have no posts in Ghost
 *
 * This is necessary since the Ghost API does not return users who exist in
 * Ghost yet who have not authored any posts
 */
export const sourceNodes: GatsbySourceNodes = ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const cameronData = {
    bio: 'Driven developer, designer, and product builder.',
    cover_image: null,
    facebook: 'https://www.facebook.com/cam.cabo',
    facebookUsername: 'cam.cabo',
    ghostId: 'cameron',
    loc: 'Los Angeles',
    location: '',
    meta_title: null,
    meta_description: null,
    name: 'Cameron Cabo',
    postCount: 0,
    profile_image: 'https://s3.amazonaws.com/the-metric/2020/03/prof.jpg',
    role: 'Web Developer',
    url: 'https://the-metric.herokuapp.com/author/cameron',
    twitter: 'https://www.twitter.com/cameroncabo',
    twitterUsername: 'cameroncabo',
    slug: 'cameron',
    website: 'https://www.cameroncabo.com',
  }

  const nodeContent = JSON.stringify(cameronData)
  const nodeMeta = {
    id: createNodeId(cameronData.ghostId),
    parent: null,
    children: [],
    internal: {
      type: 'GhostAuthorManual',
      mediaType: 'text/html',
      content: nodeContent,
      contentDigest: createContentDigest(cameronData),
    },
  }
  const node = { ...cameronData, ...nodeMeta }
  createNode(node)
}

/* eslint-disable max-len */
import { GatsbySourceNodes } from './types'

const otherAuthors = [
  {
    bio: 'Driven developer, designer, and product builder.',
    cover_image: null,
    facebook: 'https://www.facebook.com/cam.cabo',
    facebookUsername: 'cam.cabo',
    ghostId: 'cameron',
    loc: 'Los Angeles, CA',
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
  },
  {
    bio:
      'Thabo is a graduate of the University of Pennsylvania. A Zimbabwean born young professional based in New York City.',
    cover_image: null,
    facebook: '',
    facebookUsername: '',
    ghostId: 'thabo',
    loc: 'New York, NY',
    location: '',
    meta_title: null,
    meta_description: null,
    name: 'Thabo Dhlamini',
    postCount: 0,
    profile_image: 'https://s3.amazonaws.com/the-metric/2020/06/IMG_6923.jpg',
    role: 'Publisher',
    url: 'https://the-metric.herokuapp.com/author/thabo',
    twitter: '',
    twitterUsername: '',
    slug: 'thabo',
    website: '',
  },
  {
    bio:
      "Shaheen studied advertising, PR & media at Middlesex University. She's Curriculum Contextualisation & Language Associate and a founder of the nascent African Languages program at African Leadership.",
    cover_image: null,
    facebook: 'https://www.facebook.com/shaheen.beeharry',
    facebookUsername: 'shaheen.beeharry',
    ghostId: 'shaheen',
    loc: 'Mauritius',
    location: '',
    meta_title: null,
    meta_description: null,
    name: 'Shaheen Beeharry',
    postCount: 0,
    profile_image:
      'https://s3.amazonaws.com/the-metric/2020/06/Shaheen_Beeharry_Casual_2.1.jpg',
    role: 'Publisher',
    url: 'https://the-metric.herokuapp.com/author/shaheen',
    twitter: '',
    twitterUsername: '',
    slug: 'shaheen',
    website: 'https://www.linkedin.com/in/shaheen-beeharry-42a842125/',
  },
]

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

  otherAuthors.forEach((otherAuthor): void => {
    const nodeContent = JSON.stringify(otherAuthor)
    const nodeMeta = {
      id: createNodeId(otherAuthor.ghostId),
      parent: null,
      children: [],
      internal: {
        type: 'GhostAuthorManual',
        mediaType: 'text/html',
        content: nodeContent,
        contentDigest: createContentDigest(otherAuthor),
      },
    }
    const node = { ...otherAuthor, ...nodeMeta }
    createNode(node)
  })
}

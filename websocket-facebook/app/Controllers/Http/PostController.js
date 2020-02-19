'use strict'
/**
 * Resourceful controller for interacting with posts
 */

const Post = use('App/Models/Post')

class PostController {

  async store ({ request, auth }) {
    const content = request.input('content')
    const post = await Post.create({ content, user_id: auth.user.id })
    await post.load('user')
    await post.load('comments')
    return post
  }
}

module.exports = PostController

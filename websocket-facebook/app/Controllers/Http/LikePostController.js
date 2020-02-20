'use strict'

const Like = use('App/Models/LikePost')

class LikePostController {
  async store({ params, request, auth }) {
    try {
      const like = await Like.findByOrFail(
        {
          post_id: params.posts_id,
          user_id: params.user_id
        }
      )

      await like.delete()

    } catch (error) {
      await Like.create({
        post_id: params.posts_id,
        user_id: auth.user_id
      })
    }

    const [{ count }] = await Like.query().where('post_id', params.posts_id).count()
    return { count, id: params.posts_id }
  }
}

module.exports = LikePostController

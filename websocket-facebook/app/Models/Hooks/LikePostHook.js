'use strict'

const Ws = use('Ws')
const Like = use('App/Models/LikePost')

const LikePostHook = exports = module.exports = {}

LikePostHook.method = async (modelInstance) => {

}

LikePostHook.sendWs = async like => {
  const topic = Ws.getChannel('post').topic('posts')
  if(topic) {
    const [{count}] = await Like.query().where('post_id', like.post_id).count()

    topic.broadcast('likes', { count, id: like.post_id})
  }

}

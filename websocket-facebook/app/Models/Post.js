'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  static boot () {
    super.boot()
    this.addHook('afterCreate', 'PostHook.sendWs')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  likes () {
    return this.hasMany('App/Models/LikePost')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }

  static scopeWithLikes (query) {
    return query.select("*", function() {
      return this.count("*")
                  .from('like_posts')
                  .whereRaw('post_id = post.id')
                  .as('likes')
    })
  }
}

module.exports = Post

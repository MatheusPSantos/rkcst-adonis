'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class LikePost extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', 'LikePostHook.sendWs')
    this.addHook('afterDelete', 'LikePostHook.sendWs')

  }

  post () {
    return this.belongsTo('App/Models/Post')
  }
}

module.exports = LikePost

'use strict'

const User = use('App/Models/User')
const crypto = require('crypto')
const Mail = use('Mail')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()
      await Mail.send(
        ['emails.forgot_password'],
        {
          email: user.email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)  
            .from('pereirasantos13@email.com', 'Matheus | teste adonis')
            .subject('Recuperação de senha')
        }
      )
    } catch(err) {
      return response.status(err.status).send({
        error: {
          message: 'Something is wrong. This email exists?'
        }
      })
    }
  }
}

module.exports = ForgotPasswordController

import User from '#models/user'
import { register } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import argon2 from 'argon2'

export default class AuthController {
  async register({request, response}: HttpContext) {
    await request.validateUsing(register)

    const checkUser = await User.findBy('email', request.input('email'))
    
    if(checkUser) {
      response.abort("Email sudah terdaftar")
    }

    const hashed = await argon2.hash(request.input('password'))

    const user = await User.create({
      fullName: request.input('fullName'),
      email: request.input('email'),
      password: hashed
    })

    response.status(201).json({
      message: "Berhasil register!",
      data: user
    })
  }
}
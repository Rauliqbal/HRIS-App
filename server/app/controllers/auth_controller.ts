import User from '#models/user'
import { login, register } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    await request.validateUsing(register)

    const checkUser = await User.findBy('email', request.input('email'))
    if (checkUser) {
      return response.status(204).json({ message: 'Email sudah terdaftar' })
    }

    const user = await User.create({
      fullName: request.input('fullName'),
      email: request.input('email'),
      password: request.input('password'),
    })

    response.status(201).json({
      success: true,
      message: 'Berhasil register!',
      data: user,
    })
  }

  async login({ request, response }: HttpContext) {
    await request.validateUsing(login)
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(401).json({
        message: 'Email tidak ditemukan',
      })
    }

    const isVerify = await hash.verify(user.password, password)
    if (isVerify) {
      const token = await User.accessTokens.create(user!)

      return response.status(200).json({
        success: true,
        message: 'Login Berhasil',
        data: user,
        token: token.value!.release(),
      })
    } else {
      return response.status(404).json({
        success: false,
        message: 'Email atau Password Salah',
      })
    }
  }

  me({ auth, response }: HttpContext) {
    const user = auth.user!

    return response.status(200).json({
      success: true,
      message: `Hello ${user.fullName}`,
      data: user,
    })
  }
}

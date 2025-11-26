/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import DepartmentsController from '#controllers/departments_controller'

router
  .group(() => {
    router
      .group(() => {
        router.get('/', async () => {
          return {
            message: 'VenSys API',
          }
        })

        router
          .group(() => {
            router.post('/register', [AuthController, 'register'])
            router.post('/login', [AuthController, 'login'])
          })
          .prefix('/auth')

        router
          .group(() => {
            router.get('/me', [AuthController, 'me'])

            router.post('/department', [DepartmentsController, 'createDepartment'])
          })
          .use(middleware.auth({ guards: ['api'] }))
      })
      .prefix('/v1')
  })
  .prefix('/api')

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
import RolesController from '#controllers/roles_controller'

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
            // ROUTER USER
            router.get('/me', [AuthController, 'me'])

            // ROUTER DEPARTMENT
            router
              .group(() => {
                router.get('', [DepartmentsController, 'getAllDepartment'])
                router.post('', [DepartmentsController, 'createDepartment'])
                router.get('/:id', [DepartmentsController, 'getDetailDepartment'])
                router.delete('/:id', [DepartmentsController, 'deleteDepartment'])
              })
              .prefix('/department')

            // ROUTER ROLE
            router
              .group(() => {
                router.post('/', [RolesController, 'createRole'])
              })
              .prefix('/role')
          })
          .use(middleware.auth({ guards: ['api'] }))
      })
      .prefix('/v1')
  })
  .prefix('/api')

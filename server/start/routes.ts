/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const DepartmentsController = () => import('#controllers/departments_controller')
const RolesController = () => import('#controllers/roles_controller')

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
                // router.put('/:id', [DepartmentsController, 'up'])
              })
              .prefix('/department')

            // ROUTER ROLE
            router
              .group(() => {
                router.post('/', [RolesController, 'createRole'])
                router.get('/', [RolesController, 'getAllRole'])
                router.get('/:id', [RolesController, 'getDetailRole'])
                router.put('/:id', [RolesController, 'updateRole'])
                router.delete('/:id', [RolesController, 'deleteRole'])
              })
              .prefix('/role')

            router.group(() => {
              // router.post('/', [])
              // router.get('/', [])
              // router.get('/:id', [])
              // router.put('/:id', [])
              // router.delete('/:id', [])
            })
          })
          .use(middleware.auth({ guards: ['api'] }))
      })
      .prefix('/v1')
  })
  .prefix('/api')

import Role from '#models/role'
import { roleInput } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  async createRole({request,response}: HttpContext) {
    await request.validateUsing(roleInput)
    const {name} = request.only(['name'])

    const checkRole = await Role.findBy('name', name)
    // Cek jika nama role sama
    if(checkRole){
      return response.status(204).json({
        message: "Role sudah ada"
      })
    } else {
      const role = await Role.create({
        name
      })

      return response.status(200).json({
        success: true,
        message: "Create role successfully!",
        data: role
      })
    }
  }

  async getAllRole({response}:HttpContext) {
    const role = await Role.all()
    
        return response.status(200).json({
          success: true,
          message: 'List Department',
          data: role,
        })
  }

  async getDetailRole({request, response}:HttpContext) {
      const id = request.param('id')
      const role = await Role.findBy('id', id)
  
      // cek jika  gada
      if(!role) {
        return response.status(404).json({
          messages: "Role Not Found"
        })
      }else {
        return response.status(200).json({
          success: true,
          message: `Get Detail Role ${role.name}!`,
          data: role
        })
      }
    }

    async updateRole({request,response}: HttpContext) {
      const id = request.param('id')
      const checkRole = await Role.findBy('id',id)

      if(!checkRole) {
        return response.status(404).json({
          success: false ,
          message: "Role not found!"
        })
      }else {
        return response.status(200).json({
          success: true,
          message: "Update Role Successfully!",
          data: role
        })
      }

    }
  
    async deleteRole({request,response} :HttpContext) {
      const id = request.param('id')
      const role = await Role.findBy('id', id)
  
      // cek jika gada 
      if(!role) {
        return response.status(404).json({
          messages: "Role Not Found"
        })
      } else {
        return response.status(200).json({
          success: true,
          message: `Deleteted ${Role.name} successfully!`
        })
      }
    }
}
import Department from '#models/department'
import { departmentInput } from '#validators/department'
import type { HttpContext } from '@adonisjs/core/http'

export default class DepartmentsController {
  async createDepartment({ request, response }: HttpContext) {
    await request.validateUsing(departmentInput)
    const { name, description } = request.only(['name', 'description'])

    const checkDepartment = await Department.findBy('name', name)
    if (checkDepartment) {
      return response.status(401).json({
        success: false,
        message: 'Department sudah ada',
      })
    }

    const department = await Department.create({
      name,
      description,
    })

    return response.status(200).json({
      success: true,
      message: 'Department berhasil dibuat',
      data: department,
    })
  }

  async getAllDepartment({ response }: HttpContext) {
    const department = await Department.all()

    return response.status(200).json({
      success: true,
      message: 'List Department',
      data: department,
    })
  }
}

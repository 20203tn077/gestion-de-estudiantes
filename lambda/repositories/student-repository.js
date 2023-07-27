const DbService = require('../services/db-service') 

class ExpenseCategoryRepository {
  #dbService

  constructor(handlerInput) {
    this.#dbService = new DbService(handlerInput)
  }

  async getAll() {
    const { students } = await this.#dbService.get()
    return Object.values(students).flat()
  }

  async countAll() {
    const students = await this.getAll()
    return students.length
  }

  async getByGroup(groupName) {
    const { students } = await this.#dbService.get()
    students[groupName] ??= []
    return students[groupName]
  }

  async countByGroup(groupName) {
    const students = await this.getByGroup(groupName) ?? []
    return students.length
  }

  async exists(id) {
    const students = await this.getAll()
    return students.map(({id}) => id).includes(id)
  }

  async addToGroup(groupName, student) {
    const group = await this.getByGroup(groupName)
    group.push(student)
    await this.#dbService.save()
  }
}

module.exports = ExpenseCategoryRepository
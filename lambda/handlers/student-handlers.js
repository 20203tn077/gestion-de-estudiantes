const Alexa = require('ask-sdk-core')
const { result, inject, isDenied, getSlot, handleIntent, handle } = require('../utils/handler-utils')
const StudentRepository = require('../repositories/student-repository')

const GetStudentCountIntentHandler = {
  canHandle: handleIntent('GetStudentCountIntent'),
  handle: handle(async () => {
    const studentRepository = inject(StudentRepository)

    const count = await studentRepository.countAll()
    const speakOutput = `En total cuentas con ${count} estudiante${(count - 1) ? 's' : ''} en tus grupos`

    return result(speakOutput, true)
  })
}

const GetStudentsByGroupIntentHandler = {
  canHandle: handleIntent('GetStudentsByGroupIntent'),
  handle: handle(async () => {
    const studentRepository = inject(StudentRepository)
    const group = getSlot('group')

    const students = await studentRepository.getByGroup(group)
    const speakOutput = students.length
    ? `Los estudiantes del grupo ${group} son: ${students.map(({id, name}) => `${name} con matrícula ${id}`).join(', ')}`
    : `El grupo ${group} no cuenta con ningún estudiante`

    return result(speakOutput, true)
  })
}

const GetStudentCountByGroupIntentHandler = {
  canHandle: handleIntent('GetStudentCountByGroupIntent'),
  handle: handle(async () => {
    const studentRepository = inject(StudentRepository)
    const group = getSlot('group')

    const count = await studentRepository.countByGroup(group)
    const speakOutput = `En el grupo ${group} cuentas con ${count} estudiante${(count - 1) ? 's' : ''}`

    return result(speakOutput, true)
  })
}

const AddStudentToGroupIntentHandler = {
  canHandle: handleIntent('AddStudentToGroupIntent'),
  handle: handle(async () => {
    if (isDenied()) return result('Entendido, no se agregó al estudiante', true)
    const studentRepository = inject(StudentRepository)
    const group = getSlot('group')
    const id = getSlot('studentId')
    const name = getSlot('studentName')

    if (await studentRepository.exists(id)) return result(`Ya existe un estudiante con la matrícula ${id}`)
    const student = {id, name}
    await studentRepository.addToGroup(group, student)
    const count = await studentRepository.countAll()
    const speakOutput = `He agregado al estudiante ${name} al grupo ${group}`

    return result(speakOutput, true)
  })
}

module.exports = {
  GetStudentCountIntentHandler,
  GetStudentsByGroupIntentHandler,
  GetStudentCountByGroupIntentHandler,
  AddStudentToGroupIntentHandler,
}

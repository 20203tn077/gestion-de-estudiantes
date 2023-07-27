const { getIntentName: _getIntentName, getRequestType, getSlotValue } = require('ask-sdk-core')

const handleLaunch = handlerInput => getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
const handleIntent = (...intents) => handlerInput => getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && (!intents.length || intents.some(intent => _getIntentName(handlerInput.requestEnvelope) === intent))
const handleSessionEnded = handlerInput => getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
const handleAny = () => true

let _handlerInput

const handle = handlerFunction => async (handlerInput, error) => {
  _handlerInput = handlerInput
  return await handlerFunction(error)
}

const inject = constructor => new constructor(_handlerInput)
const getRequestEnvelope = () => _handlerInput.requestEnvelope
const getIntentName = () => _getIntentName(_handlerInput.requestEnvelope)
const getSlot = slotName => getSlotValue(_handlerInput.requestEnvelope, slotName)
const isConfirmed = () => _handlerInput.requestEnvelope.request.intent.confirmationStatus === 'CONFIRMED'
const isDenied = () => _handlerInput.requestEnvelope.request.intent.confirmationStatus === 'DENIED'
const result = (speakOutput, reprompt = false) => {
  const result = _handlerInput.responseBuilder
  if (speakOutput) result.speak(speakOutput)
  if (reprompt) result.reprompt(speakOutput)
  return result.getResponse()
}

module.exports = {
  handleLaunch,
  handleIntent,
  handleSessionEnded,
  handleAny,
  handle,
  inject,
  getRequestEnvelope,
  getIntentName,
  getSlot,
  isConfirmed,
  isDenied,
  result,
}
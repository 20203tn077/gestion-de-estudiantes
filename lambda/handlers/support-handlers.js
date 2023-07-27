const { getIntentName, handle, handleAny, handleIntent, handleLaunch, handleSessionEnded, result, getRequestEnvelope, } = require('../utils/handler-utils')

const LaunchRequestHandler = {
  canHandle: handleLaunch,
  handle: handle(() => {
    const speakOutput = 'Bienvenido a tus listas de grupos ¿Qué deseas realizar?'
    return result(speakOutput, true)
  })
}

const HelloWorldIntentHandler = {
  canHandle: handleIntent('HelloWorldIntent'),
  handle: handle(() => {
    const speakOutput = 'Hello World!'
    return result(speakOutput)
  })
}

const HelpIntentHandler = {
  canHandle: handleIntent('AMAZON.HelpIntent'),
  handle: handle(() => {
    const speakOutput = 'You can say hello to me! How can I help?'
    return result(speakOutput, true)
  })
}

const CancelAndStopIntentHandler = {
  canHandle: handleIntent('AMAZON.CancelIntent', 'AMAZON.StopIntent'),
  handle: handle(() => {
    const speakOutput = 'Goodbye!'
    return result(speakOutput)
  })
}

const FallbackIntentHandler = {
  canHandle: handleIntent('AMAZON.FallbackIntent'),
  handle: handle(() => {
    const speakOutput = "Sorry, I don't know about that. Please try again."
    return result(speakOutput, true)
  })
}

const SessionEndedRequestHandler = {
  canHandle: handleSessionEnded,
  handle: handle(() => {
    console.log(`~~~~ Session ended: ${JSON.stringify(getRequestEnvelope)}`)
    return result()
  })
}

const IntentReflectorHandler = {
  canHandle: handleIntent(),
  handle: handle(() => {
    const intentName = getIntentName()
    const speakOutput = `You just triggered ${intentName}`
    return result(speakOutput)
  })
}

const ErrorHandler = {
  canHandle: handleAny,
  handle: handle((error) => {
    const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.'
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`)
    throw error
    // return result(speakOutput, true)
  })
}

module.exports = {
  LaunchRequestHandler,
  HelloWorldIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  FallbackIntentHandler,
  SessionEndedRequestHandler,
  IntentReflectorHandler,
  ErrorHandler,
}
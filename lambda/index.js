const { SkillBuilders } = require('ask-sdk-core')
const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter')
const { DynamoDB } = require('aws-sdk')
const {
  CancelAndStopIntentHandler,
  FallbackIntentHandler,
  HelloWorldIntentHandler,
  HelpIntentHandler,
  IntentReflectorHandler,
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  ErrorHandler,
} = require('./handlers/support-handlers')
const {
  GetStudentCountIntentHandler,
  GetStudentsByGroupIntentHandler,
  GetStudentCountByGroupIntentHandler,
  AddStudentToGroupIntentHandler,
} = require('./handlers/student-handlers')

module.exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,

    GetStudentCountIntentHandler,
    GetStudentsByGroupIntentHandler,
    GetStudentCountByGroupIntentHandler,
    AddStudentToGroupIntentHandler,

    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/hello-world/v1.2')
  .withPersistenceAdapter(
    new DynamoDbPersistenceAdapter({
      tableName: process.env.DYNAMODB_PERSISTENCE_TABLE_NAME,
      createTable: false,
      dynamoDBClient: new DynamoDB({
        apiVersion: 'latest',
        region: process.env.DYNAMODB_PERSISTENCE_REGION
      })
    })
  )
  .lambda()

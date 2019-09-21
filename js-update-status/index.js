const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

// Our connections
AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context) => {
  
  var params = {
    TableName: 'taskmaster-backend',
    Key:{
        'id' : `${event.pathParameters.id}`,
    },
    UpdateExpression: `set #stat = :newStatus`,
    ExpressionAttributeNames:{
        "#stat" : "status"
    },
    ExpressionAttributeValues:{
        ":newStatus": event.pathParameters.taskStatus
    },
    ReturnValues:"UPDATED_NEW"
  };
  
  const data = await ddbClient.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
};
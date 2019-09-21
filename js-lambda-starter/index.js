const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

// Our connections
AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context) => {
    
  console.log('Event old: ', event.Records[0].dynamodb.OldImage);
  console.log('Event new: ', event.Records[0].dynamodb.NewImage);
  
  let oldImage = event.Records[0].dynamodb.OldImage;
  let newImage = event.Records[0].dynamodb.NewImage;
  
  
  if ( oldImage == undefined ) {
      // add new/available history
  } else {
      if ( oldImage.history.L.length === newImage.history.L.length) {
          // history is the same, we can add one
          console.log("history is the same");
          
          var params = {
              TableName: 'taskmaster-backend',
              Key:{
                  'id' : `${event.pathParameters.id}`,
              },
                  UpdateExpression: `set assignee = :name`,
                  ExpressionAttributeValues:{
                      ":name": event.pathParameters.assignee
              },
              ReturnValues:"UPDATED_NEW"
          };
            
        const data = await ddbClient.update(params).promise();
      
        return {
          statusCode: 200,
          body: JSON.stringify(data)
        }
          
      } else {
          // history is what changed
          // DO NOT CHANGE IT AGAIN
          console.log("history is what changed, let's not do infinite loop stuff");
      }
  }
  
  // TODO implement
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
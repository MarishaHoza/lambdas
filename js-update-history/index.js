const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

// Our connections
AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context) => {
    
  console.log('current key: ', event.Records[0].dynamodb.Keys.id.S);
  
  let oldImage = event.Records[0].dynamodb.OldImage;
  let newImage = event.Records[0].dynamodb.NewImage;
  
  if ( oldImage == undefined || newImage == undefined) {
      // add new/available history
      
  } else {
      if ( oldImage.history.L.length === newImage.history.L.length) {
          // history is the same, we can add one
          console.log("history is the same");
          
          let date = new Date();
          let currentTime = date.toLocaleString();
          
          // trevor dobson is fabulous
          
          let change = [];
          
          if ( oldImage.status.S !== newImage.status.S ) {
            change.push(`Status changed to: ${newImage.status.S}`);
          }
          if ( oldImage.assignee.S !== newImage.assignee.S ) {
            change.push(`Assignee updated to: ${newImage.assignee.S}`)
          }
          if ( oldImage.imgUrl.S !== newImage.imgUrl.S ) {
            change.push(`Task image updated`)
          }
          
          var params = {
              TableName: 'taskmaster-backend',
              Key:{
                "id" : `${event.Records[0].dynamodb.Keys.id.S}`,
              },
              UpdateExpression: `set history = list_append (history, :newHistory)`,
              ExpressionAttributeValues:{
                ":newHistory": [ {"action":`${change.join(", ")}`, "time":`${currentTime}`} ]
              },
              ReturnValues:"UPDATED_NEW"
          };

            
        let data = await ddbClient.update(params).promise();

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
  
  // default response
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
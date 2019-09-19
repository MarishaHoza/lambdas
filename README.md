# AWS Lambdas

### [API Gateway Endpoint](https://vv7fgjnxgi.execute-api.us-west-2.amazonaws.com/dev)
Please note that this endpoint is not connected with the deployed front end yet, because of CORS issues yet to be figured out. Test with postman or similar.

## java-save
This lambda function can save new items to a dynamoDB database.
This `POST` route is exposed at `/tasks`

## js-get-all
This lambda function returns all tasks from the database
This `GET` route is exposed at `/tasks`

## js-get-by-user
This lambda function returns all tasks for a specific user
This `GET` route is exposed at `/tasks/{user}`

## js-update-assignee
This lambda function updates a task assignee
This `PUT` route is exposed at `/tasks/{id}/assign/{assignee}`

## js-delete
This lambda function deletes a specific task
This `DELETE` route is exposed at `/tasks/{id}`


## helpful docs
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.06



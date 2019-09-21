# AWS Lambdas

### [API Gateway Endpoint](https://vv7fgjnxgi.execute-api.us-west-2.amazonaws.com/dev)
### [React Front-End Endpoint](http://taskmaster-frontend-marisha.s3-website-us-west-2.amazonaws.com/)

## java-save
This lambda function saves new task items to the dynamoDB database.
This `POST` route is exposed at `/tasks`

## js-get-all
This lambda function returns all tasks from the database
This `GET` route is exposed at `/tasks`

## js-get-by-user
This lambda function returns all tasks for a specific user
This `GET` route is exposed at `/tasks/{user}`

## js-update-assignee
This lambda function updates a task assignee and status
This `PUT` route is exposed at `/tasks/{id}/assign/{assignee}`

## js-update-status
This lambda function updates a task's status
This `PUT` route is exposed at `/tasks/{id}/status/{taskStatus}`

## js-update-history
This lambda function is automatically invoked on dynamoDB changes. The function analyzes the DB change and creates a new history item with an action and timestamp.

## js-delete
This lambda function deletes a specific task
This `DELETE` route is exposed at `/tasks/{id}`


## helpful docs
- [DynamoDB Examples](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.06)
- [Examples using UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)


## Collaborators
- Peter Lee
- Trevor Dobson



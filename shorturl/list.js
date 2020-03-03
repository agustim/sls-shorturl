'use strict';

const dynamodb = require('./dynamodb');
const middleware = require('./middleware');

module.exports.list = (event, context, callback) => {

  if (!middleware.security(event,callback)) 
  return;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  // fetch all todos from the database
  dynamodb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

'use strict';

const dynamodb = require('./dynamodb');

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // fetch todo from the database
  dynamodb.get(params, (error, result) => {
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
    const item = result.Item
    if ((!item) || (!item.url)) {
      callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'This url is not exist.',
      });
      return;  
    }

    // create a response
    const response = {
      statusCode: 301,
      headers: {
        Location: result.Item.url
      }
    };
    callback(null, response);
  });
};

'use strict';

//const uuid = require('uuid');
const dynamodb = require('./dynamodb');
//const crypto = require('crypto');
const sh = require("shorthash");
const normalizeUrl = require('normalize-url');

const middleware = require('./middleware')

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();

  if (!middleware.security(event,callback)) 
    return;

  const data = JSON.parse(event.body);

  if (typeof data.u !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the url item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: sh.unique(normalizeUrl(data.u)),
      url: data.u,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

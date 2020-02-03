'use strict';

//const uuid = require('uuid');
const dynamodb = require('./dynamodb');
//const crypto = require('crypto');
const sh = require("shorthash");
const normalizeUrl = require('normalize-url');



module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  var XApiKey = ""
  for(const prop in event.headers) {
    if (prop.toLocaleLowerCase() == 'x-api-key') {
      XApiKey = event.headers[prop]
    }
  }

  const data = JSON.parse(event.body);

  if ((typeof data.u !== 'string') || (XApiKey != process.env.ADMIN_KEY)) {
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

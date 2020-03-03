'use strict'

module.exports.security = (event, callback) => {
    var XApiKey = ""
    for(const prop in event.headers) {
      if (prop.toLocaleLowerCase() == 'x-api-key') {
        XApiKey = event.headers[prop]
      }
    }
    
    if (XApiKey != process.env.ADMIN_KEY) {
      console.error('X-Api-Key is not correct or not exist.');
      callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'X-Api-Key is not correct or not exist.',
      });
      return false;
    }
    return true;
}
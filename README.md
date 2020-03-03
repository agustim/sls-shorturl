<!--
title: 'AWS Serverless REST API with DynamoDB and offline support example in NodeJS'
description: 'This example demonstrates how to run a service locally, using the ''serverless-offline'' plugin. It provides a REST API to manage Todos stored in DynamoDB.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/adambrgmn'
authorName: 'Adam Bergman'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13746650?v=4&s=140'
-->
# Serverless REST API with DynamoDB and offline support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Todos stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a ShortURL

```bash
curl -X POST -H "Content-Type:application/json" -H "X-Api-Key:test" http://localhost:3000/shorturl --data '{ "u": "https://www.google.com" }'
```

Example Result:
```bash
{"statusCode":200,"body":"[{"checked":false,"createdAt":1583237525308,"id":"ZSUcpm","url":"https://google.com","updatedAt":1583237525308}]"}
```

### List all ShortURL

```bash
curl -H "Content-Type:application/json" -H "X-Api-Key:test" http://localhost:3000/shorturl
```

Example output:
```bash
[{"checked":false,"createdAt":1583238016091,"id":"1qaPIA","url":"https://yahoo.com","updatedAt":1583238016091},{"checked":false,"createdAt":1583237994751,"id":"ZSUcpm","url":"https://google.com","updatedAt":1583237994751},{"checked":false,"createdAt":1583237985861,"id":"2aEU22","url":"https://reddit.com","updatedAt":1583237985861},{"checked":false,"createdAt":1583238056236,"id":"1vABqH","url":"http://ceeuropa.cat","updatedAt":1583238056236}]
```

### Get one ShortURL

```bash
# Replace the <id> part with a real id from your shorturl table
curl -H "Content-Type:application/json" http://localhost:3000/shorturl/<id>
```

Example Result:

Return Redirect

### Delete a Todo

```bash
# Replace the <id> part with a real id from your shorturl table
curl -X DELETE -H "Content-Type:application/json" -H "X-Api-Key:test" http://localhost:3000/shorturl/<id>
```

No output

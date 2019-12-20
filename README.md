<!--

  ** DO NOT EDIT THIS FILE
  **
  ** This file was automatically generated by the `build-harness`.
  ** 1) Make all changes to `README.yaml`
  ** 2) Run `make init` (you only need to do this once)
  ** 3) Run`make readme` to rebuild this file.
  **

  -->

[<img src="https://res.cloudinary.com/enter-at/image/upload/v1576145406/static/logo-svg.svg" alt="enter-at" width="100">][website]

# node-aws-lambda-handlers [![Build Status](https://github.com/enter-at/node-aws-lambda-handlers/workflows/Lint%20&%20Test/badge.svg)](https://github.com/enter-at/node-aws-lambda-handlers/actions) [![Release](https://img.shields.io/npm/v/@enter-at/lambda-handlers.svg)](https://www.npmjs.com/package/@enter-at/lambda-handlers) [![Install size](https://packagephobia.now.sh/badge?p=@enter-at/lambda-handlers)](https://packagephobia.now.sh/result?p=@enter-at/lambda-handlers)


An opinionated Typescript package that facilitates specifying AWS Lambda handlers including input validation,
error handling and response formatting.


---


It's 100% Open Source and licensed under the [APACHE2](LICENSE).






## Quick Start

Install from NPM:
```bash
npm install @enter-at/lambda-handlers
```






## Api
### Status code

```typescript
import {APIGatewayProxyHandler} from '@enter-at/lambda-handlers';

@APIGatewayProxyHandler()
export function handler(event, context) {
    return {
        message: `Hello ${event.queryStringParameters.name}!`
    };
}
```

Let's invoke the function:

```bash
payload='{"queryStringParameters": {"name": "Peter"}}'
aws lambda invoke --function-name hello-world --payload $payload /tmp/response.json
```

Responds with:

```json
{
    "headers":{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    "statusCode": 200,
    "body": "\"Hello Peter!\""
}
```

Default headers and status code have been added.

#### Respond with a specific status code

```typescript
import {APIGatewayProxyHandler, created} from '@enter-at/lambda-handlers';

@APIGatewayProxyHandler()
export function handler(event, context) {
    const resource = {id: 1, name: event.body.name};
    return created(resource);
}
```

```bash
payload='{"body": "{\"name\": \"Peter\"}"}'
aws lambda invoke --function-name create-resource --payload $payload /tmp/response.json
```

Responds with:

```json
{
    "headers":{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    "statusCode": 201,
    "body": "{\"id\":1,\"name\":\"Peter\"}"
}
```

#### Error handling

```typescript
import {APIGatewayProxyHandler, BadRequestError} from '@enter-at/lambda-handlers';

@APIGatewayProxyHandler()
export function handler(event, context) {
    throw new BadRequestError('missing email');
}
```

```bash
aws lambda invoke --function-name create-resource $payload /tmp/response.json
```

Responds with:

```json
{
    "headers":{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    "statusCode": 400,
    "body": "{\"errors\":[{\"name\": \"BadRequestError\", \"details\": [\"missing email\"]}]}"
}
```
### Errors

```
LambdaHandlerError
```
```
BadRequestError
```
```
ForbiddenError
```
```
InternalServerError
```
```
NotFoundError
```
```
FormatError
```
```
ValidationError
```



## Help

**Got a question?**

File a GitHub [issue](https://github.com/enter-at/node-aws-lambda-handlers/issues).

## Contributing

### Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/enter-at/node-aws-lambda-handlers/issues) to report any bugs or file feature requests.

### Developing

If you are interested in being a contributor and want to get involved in developing this project, we would love to hear from you!

In general, PRs are welcome. We follow the typical "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull Request** so that we can review your changes

**NOTE:** Be sure to merge the latest changes from "upstream" before making a pull request!





## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

See [LICENSE](LICENSE) for full details.

    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.




### Contributors


[![Steffen Leistner][sleistner_avatar]][sleistner_homepage]


  [sleistner_homepage]: https://github.com/sleistner
  [sleistner_avatar]: https://res.cloudinary.com/enter-at/image/fetch/f_png,r_max,w_100,h_100,c_thumb/https://github.com/sleistner.png



  [website]: https://github.com/enter-at

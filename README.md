# Holiday Extras Web Development API Task
Technical application for backend developer job at Holiday Extras.

`Your task is to create an API to manage a user persistence layer.`

See full description [here](https://github.com/holidayextras/culture/blob/master/recruitment/developer-API-task.md).

You are able to complete this task in any language you like. For this example I will use NodeJs.

Third party packages also used:
- [express](https://www.npmjs.com/package/express) (routing)
- [mongodb](https://www.npmjs.com/package/mongodb) (database)
- [joi](https://www.npmjs.com/package/joi) (request validation)
- [mocha](https://www.npmjs.com/package/mocha) (tests)
- [mongo-mock](https://www.npmjs.com/package/mongo-mock) (tests)

## Setup
- Clone this repository to your computer: `git clone git@github.com:TomFirth/nodeApi.git`.
- If you have `NVM` installed, type `nvm use` (this will automatically attempt to use the correct version of node for this repository) Then install the repository with `npm i`.
- [Install mongodb](https://docs.mongodb.com/v3.4/installation/) - If you have a Mac with Homebrew, you can follow [these instructions](https://docs.mongodb.com/v3.4/tutorial/install-mongodb-on-os-x/).
- (Optional) [Install compass](https://docs.mongodb.com/compass/master/install/) - to explore your local mongodb database.
- To test the api you can use either: [Postman](https://www.getpostman.com/apps) or [Swagger](https://swagger.io/swagger-ui/). A collection of Postman requests have been made for you [here](https://github.com/TomFirth/nodeApi#postman-usage).
- From terminal: `sudo mongod` - starts the mongo daemon.
- New terminal window: `sudo mongo` - this starts a local mongodb instance.
- You will create a new database and collection when you first save data to mongodb with this api.
- To start the api: go to the local dir where you cloned the repository and type `npm start` into your terminal.
- You can then use the below http requests in [Postman](https://github.com/TomFirth/nodeApi#postman) to test the api.

## Development
If you would like to use this api as a basis to build on, i've left `nodemon` in.

To use this start the server with `npm run dev`

## Postman
[Postman collection included](nodeApi.postman_collection.json)

#### ::PUT (Create)
- (Create One) Required params: `email, forename, surname`
#### ::GET (Read)
- (Read All)
- (Read One) Required params: `id || email || forename || surname`
#### ::POST (Update)
- (Update One) Required params: `id, email, forename, surname && newEmail || newForename || newSurname`
#### ::DELETE (Delete)
- (Delete One) Required params: `id || email || forename || surname`

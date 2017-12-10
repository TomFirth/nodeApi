## Holiday Extras Web Development API Task
Technical application for backend developer job at Holiday Extras.

`Your task is to create an API to manage a user persistence layer.`

See full description [here](https://github.com/holidayextras/culture/blob/master/recruitment/developer-API-task.md).

You were able to create this in any language you liked. For this example I will use NodeJs.
- express (routing)
- mongodb (database)

## Setup
- Clone this repository to your computer: `git clone git@github.com:TomFirth/nodeApi.git`.
- [Install mongodb](https://docs.mongodb.com/v3.4/installation/) - If you have a Mac with Homebrew, you can follow [these instructions](https://docs.mongodb.com/v3.4/tutorial/install-mongodb-on-os-x/).
- (Optional) [Install compass](https://docs.mongodb.com/compass/master/install/) - to explore your local mongodb database.

## Mongodb Terminal Usage
- From terminal: `sudo mongod`.
- New terminal window: `sudo mongo` - this starts a local mongodb instance.
- You will create a new database and collection when you first save data to mongodb with this api.

## Postman Usage
[Postman collection included](nodeApi.postman_collection.json)
#### ::PUT (Create)
- (Create One) Required params: `email, forename, surname`
#### ::GET (Read)
- (Read All)
- (Read One) Required params: `email, forename, surname`
#### ::POST (Update)
- (Update One) Required params: `email, forename, surname`
#### ::DELETE (Delete)
- (Delete One) Required params: `email, forename, surname`

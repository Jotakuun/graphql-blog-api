# graphql-blog-api
Web API in NodeJS using GraphQL, Express and MongoDB

## Build Setup

``` bash
# install dependencies
npm install

# serve at localhost:4000 with Nodemon restarting when detecting changes in code
npm run dev

# babel transpile the project into /dist folder
npm run build

# build and server for production
npm run server
```

## Requirements

- A MongoDB server (local or online)

## Examples of queries

``` bash
## Get list of blog posts

{
  blogPosts {
    _id
    title
  }
}
```
``` bash

# Register an user, returns any info of the created user
# password is hashed in the returned object

mutation {
  register(
    username: "admin",
    email: "admin@email.com",
    password: "admin1234")
}


# Login returns a web-token on successful request

{
  login(
    username: "admin",
    password: "admin1234"
  )
}

```
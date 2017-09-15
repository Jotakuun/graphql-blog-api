## Users
``` bash

# Register an user, returns any info of the created user except password

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

## Blog posts

``` bash
## Get list of blog posts

{
  blogPosts {
    _id
    title
    description
    category
    content
  }
}

## Example of paginated blog posts

{
  blogPosts(offset: 0, limit: 10) {
    title
    description
  }
}

# Get a blog post by id
{
  blogPost(id: $id) {
    _id
    title
    comments {
      _id
      blogPostId,
      message
    }
  }
}

# Delete a blog post
mutation{
  deleteBlogPost(id: $id)
}
```

## Comments

``` bash
# Get comments from a blog post 
# you can also get the comments in the blog posts queries
{
  commentsFromBlogPost(blogPostId: $id) {
    author {
      username
    }
    _id
    message
    likes
  }
}

# Update a comment
mutation{
  updateComment(commentId: $id, message: "updated message!") {
    _id
    message
    likes
  }
}
# Like a comment
mutation {
  likeComment(commentId: $id){
    _id
    likes
  }
}


# Dislike a comment
mutation {
  dislikeComment(commentId: $id){
    _id
    likes
  }
}

```
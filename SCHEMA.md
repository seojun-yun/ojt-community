## Models
<details>
<summary>User</summary>

### User

```json
{
    "id": number,
    "name": string,
    "userId": string,
    "password": string
}
```
</details>

<details>
<summary>Category</summary>

### Category

```json
{
    "id": number,
    "name": string,
    "parentId": number?(Category.id) //sub category
}
```
</details>

<details>
<summary>Post</summary>

### Post

```json
{
    "id": number,
    "title": string,
    "content": string,
    "createdAt": Date,
    "authorId": number(User.id),
    "categoryId": number(SubCategory.id)
}
```
</details>

<details>
<summary>Comment</summary>

### Comment

```json
{
    "id": number,
    "content": string,
    "createdAt": Date,
    "postId": number(Post.id),
    "commentId": number?(Comment.id), //sub comment
    "authorId": number(User.id)
}
```

</details>

## API

<details>
<summary>Categories</summary>

### Get Categories
```
GET /categories

Response:
{
    "success": true,
    "categories": [
        {
            //category models
        }
    ]
}
```

### Create Category
```
POST /categories
Authorization: jwt_token

Request:
{
    "name": string,
    "parentId": number?(Category.id) //sub category
}

Response:
{
    "success": true
}
```

### Update Category
```
PUT /categories/{Category.id}
Authorization: jwt_token

Reqeust:
{
    "name": string,
    "parentId": number?(Category.id) //sub category
}

Response:
{
    "success": true
}
```

### Delete Category
```
DELETE /categories/{Category.id}
Authorization: jwt_token

Response:
{
    "success": true
}
```

</details>


<details>
<summary>User</summary>

### Login
```
POST /auth/login

Request:
{
    "userid": string,
    "password": string
}

Response:
{
    "token": "JWT"
}
```

### Create User
```
POST /auth/register

Request:
{
    "userid": string,
    "password": string
}
Response:
{
    "success": true
}
```

</details>

<details>
<summary>Post</summary>

### Get Post
```
GET /posts?category={SubCategory.id} //none for all

Response:
{
    "success": true,
    "posts": [
        {
            //post models
        }
    ]
}
```


### New Post
```
POST /posts
Authorization: jwt_token

Request:
{
    "title": string,
    "categoryId": number(SubCategory.id),
    "content": string
}

Response:
{
    "success": true,
    "postId": number
}
```

### Update Post
```
PUT /posts/{Post.id}
Authorizationo: jwt_token

Request:
{
    "title": string,
    "content": string
}

Response:
{
    "success": true
}
```

### Delete Post
```
DELETE /posts/{Post.id}
Authorization: jwt_token

Response:
{
    "success": true
}
```
</details>

<details>
<summary>Comment</summary>

### Get Comment
```
GET /posts/{Post.id}/comments

Response:
{
    "success": true,
    "comments": [
        {
            //comment models
        }
    ]
}
```

### New Comment
```
POST /posts/{Post.id}/comments
Authorization: jwt_token

Request:
{
    "commentId": number?(Comment.id), //sub comment
    "content": string
}

Response:
{
    "success": true
}
```

### Update Comment
```
PUT /posts/{Post.id}/comments/{Comment.id}
Authorization: jwt_token

Request:
{
    "content": string
}

Response:
{
    "success": true
}
```

### Delete Comment
```
DELETE /posts/{Post.id}/comments/{Comment.id}
Authorization: jwt_token

Response:
{
    "success": true
}
```
</details>
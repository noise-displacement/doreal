# DoReal

BeReal clone that gives users a prompt that they have to do.

## API:

### Users

|  HTTP |  URL |  Options | Description |
| ------------ | ------------ | ------------ | ------------ |
| POST  |  /users/login |  email: String <br /> password: String | Posts login information
| POST  |  /users/register |  email: String <br /> username: String <br /> password: String | Creates new user

### Post

|  HTTP |  URL |  Options | Description |
| ------------ | ------------ | ------------ | ------------ |
| GET  |  /post/ |   | Gets all posts
| POST  |  /post/upload |  text: String | Creates new post
| POST  |  /post/delete |  id: Number | Deletes post based on id

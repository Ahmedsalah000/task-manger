task manger
﻿

Categories
﻿

POST
Create Category
http://localhost:3000/api/v1/categories
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json
{

"name": "business"


}
GET
Get All Categories
http://localhost:3000/api/v1/categories
﻿

Authorization
Bearer Token
Token
Query Params
limit
2
page
2
keyword
ahmed
name
Work
keyword
arm
sort
-1
GET
Get specific category
http://localhost:3000/api/v1/categories/6694794b3ffb6bc41348c6ce
﻿

Authorization
Bearer Token
Token
PUT
Update category
http://localhost:3000/api/v1/categories/669296e8bce0c325e57bfd86
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json
{
     "name": "gym"
}
DELETE
Delete category
http://localhost:3000/api/v1/categories/6694794b3ffb6bc41348c6ce
﻿

Authorization
Bearer Token
Token
taskes
﻿

POST
Create task
http://localhost:3000/api/v1/tasks
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json

{
        "title": "Birthday Party Plans",
        "type": "text",
        "body": "Venue: Centraatl Park\nGuests: 20",
        "listItems": ["pallon"],
        "isShared": false


}
GET
Get All tasks
http://localhost:3000/api/v1/tasks
﻿

Authorization
Bearer Token
Token
Query Params
limit
2
page
2
keyword
Notes
GET
Get specific task
http://localhost:3000/api/v1/tasks/669470fe39481e1f3521206b
﻿

Authorization
Bearer Token
Token
PUT
Update task
http://localhost:3000/api/v1/tasks/6692a47de5f97bacd47815e6
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json
{
"title": "super market Shopping"
}
DELETE
Delete task
http://localhost:3000/api/v1/tasks/669470fe39481e1f3521206b
﻿

Authorization
Bearer Token
Token
Authentication
﻿

POST
Signup
http://localhost:3000/api/v1/auth/signup
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json
{
    "username": "user5",
    "email":"user5@gmail.com",
    "password":"qazxsw",
    "passwordConfirm":"qazxsw"
}
POST
Login
http://localhost:3000/api/v1/auth/login
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json
{
    "email":"user5@gmail.com",
    "password":"qazxsw"
}
Users (Admin)
﻿

POST
Create User
http://localhost:3000/api/v1/users
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json
{
    "username": "aya",
    "email":"abayado@gmail.com",
    "password":"pass123",
    "passwordConfirm":"pass123"

}
GET
Get All Users
http://localhost:3000/api/v1/users
﻿

Authorization
Bearer Token
Token
Query Params
limit
10
keyword
c
GET
Get specific user
http://localhost:3000/api/v1/users/6694346a5e0daf34cd159758
﻿

Authorization
Bearer Token
Token
PUT
Update User
http://localhost:3000/api/v1/users/6694346a5e0daf34cd159758
﻿

Authorization
Bearer Token
Token
Body
raw (json)
json
{
    "username":"ahmed"
}
DELETE
Delete User
http://localhost:3000/api/v1/users/6694354a35a8a80be263811c
﻿

Authorization
Bearer Token
Token
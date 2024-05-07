# movies

Build movies list feature that allow user to add or view movies list by genre.

Steps to setup:

1. git clone repo-link
2. npm i
3. create developement.env inside enviroment folder using default.env
4. in database file replace mongodb url with your driver url
5. do npm run migration(this command will setup basic db , collection with initial data)
6. After success run npm run start:dev
7. open postman or swagger (on browser hit this URL http://localhost:3000/api-docs/ to open swagger)
8. first hit login api with username : testUser
9. point 8 will generate token , pass this token to jwt authorization in swagger
10. now hit post api of movies list with (contentId(get from db from movie collection), type:(movie or tvshow))
11. 10th point will save data for logged in user , now hit get API , it will fetch user detail with watch detail
12. to delete or unlist particular movie , hit delete api and pass contentId in params

Note: update.env as per your need

# DUGA

## Description 

Search platform for music and creating multiple playlist of music related to the searched artist. 


## User Stories

- **404** - Display a 404 page when a page does not exist.
- **homepage** - Users can acces the homepage and search related artists.
- **sign up** - User can sign up on the app to be able to login.
- **login** - User can log in in theyr account. 
- **logout** - User can logout from the app. 
- **profile** - User can display theyr account information and edit or delete saved playlists. 
- **editplaylist** - User can edit profile
- **deleteplaylist** - User can delete playlists from the profile
- **swipepage** - User will recieve songs and will be able to add them or not to theyr playlist. When the user adds 5 songs, a playlist will be created and stored in our profile. 
- **playlist** - User will display a playlist stored in the profile. Playlist will have 5 songs. 




## Server routes 


| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/users/login`                           | Renders `login` view. view.                                   |                                                          |
| `POST`     | `/users/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/users/signup`                          | Renders `signup-form` view. view.                                  |                                                          |
| `POST`     | `/users/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  name, email, password  }                                    |
| `GET`      | `/users/logout`                          |  Deletes session and redirects to `signup-form`              |                                                          |
| `GET`      | `/users/profile`                       |  Renders {avatarUrl, name , email} to the server |
| `POST`      | `/users/profile/:id`               | Deletes playlist on the server and updates playlist in DB redirectos to `/users/profile`.                |                                                          |
| `GET`     | `/users/edit-profile/`              | renders  `edit-profile` view.|                                 |
| `POST`   | `/users/edit-profile/` | edits users to the DB and redirects to  `/users/profile` |                                                          |
| `GET`      | `/playlist/artist-confirmation`                     | Calls Api and renders `artist-confirmation` view.                             |                                                          |
| `GET`      | `/playlist/discover`         | Renders `discover` view |                                                          |
| `POST`      | `/playlist/create/:id`         | Creates a Playlist and updates User  in the database. |                                                          |
| `GET`      | `/playlist/swipe/`         | Renders `swipe` view while calling the Api to display a loop that shows up multiple songs. |                                                          |
| `GET`      | `/playlist/create-list/`         | Renders `swipe` view. |                                                          |
| `POST`      | `/playlist/create-list/`        |  Updates playlist and stores it in on the DB. Redirects to `/playlist/playlist`. |                                                          |
| `GET`      | `/playlist/playlist/`         | Renders `playlist` view. Displays Playlist information called from the Api |                                                          |






## Models 

## User model 


```javascript
{
  "avatarUrl": { type: String, default: '../images/avatar.png' },
  "name": String, required
  "lastname": String,
  "email": String, unique, required
  "password": String, required
  "listplaylist": [{type:Schema.Types.ObjectId, ref: 'Playlist', default: [] }] 
}
```
  
## Playlist model 


```javascript
{
  "imgUrl": { type: String, default: '../images/avatar.png' },
  "name": String, default:"untitled"
  "tracks": [{type:String, default:[]}]
  "blacklist": [{type:String, default:[]}]
}
```


## Links

#### Git 

[Repository Link](https://github.com/project-duga/duga-app)

#### Trello 

[Our Trello board](https://trello.com/b/QdwbX5H7/project-2)

#### Slides 


[Our Trello board](https://docs.google.com/presentation/d/1N8_HSWnzgne9_8dj1KLjoEMJ34pD1nlf-oZLv6jhugI/edit)



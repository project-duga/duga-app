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
- **editplaylist** - User can edit playlists from the profile
- **deleteplaylist** - User can delete playlists from the profile
- **swipepage** - User will recieve songs and will be able to add them or not to theyr playlist. When the user adds 10 songs, a playlist will be created and stored in our profile. 
- **playlist** - User will display a playlist stored in the profile. Playlist will have a total of 5 songs. 
- **playlist** - User can delete songs from the playlist. 



## Server routes 


| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, cuisine, city, }                                 |
| `DELETE`   | `/private/favorites/:restaurantId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/restaurants`                     | Renders `restaurant-list` view.                              |                                                          |
| `GET`      | `/restaurants/details/:id`         | Renders `restaurant-details` view for the particular restaurant. |                                                          |

## Models 

## User model 


```javascript
{
  "image": { type: String, default: '../images/avatar.png' },
  "name": String, 
  "lastname": String,
  "email": String, unique 
  "password": String,
  "listplaylist": [{type:Schema.Types.ObjectId, ref: 'User' }] 
}
```
  
## Playlist model 


```javascript
{
  "image": { type: String, default: '../images/avatar.png' },
  "name": String, 
  "tracks": [{type:String}]
}
```


## Links

#### Git 

The url to your repository and to your deployed project

[Repository Link](https://github.com/project-duga/duga-app)

#### Trello 

[Our Trello board](https://trello.com/b/QdwbX5H7/project-2)

#### Slides 

[Our presentation]


# 🐦 bluebird

bluebird is a social networking website that allows people to meet new people and form connections. It was built using the MERN stack.

[Click here to go to the deployed application](https://thawing-eyrie-72166.herokuapp.com/)

* Email: zoidberg@gmail.com
* Password: zoidberg

## Features
- Has user authentication.
- Responsive on tablet, mobile, and desktop devices.
- Users can comment, like posts, and delete their comments.
- Users can make posts.
- Users receive notifications if their post is commented on or liked.
- Users can filter the notifications.
- Users can upload a profile picture and update their profile.
- Provide Toast notifications when liking, removing a comment and post, updating profile, updating profile picture, and creating a post.

<img src="./screenshots/1.gif" width="900" height="500" alt="bluebird" />
<img src="./screenshots/2.gif" width="900" height="500" alt="bluebird" />
<img src="./screenshots/3.gif" width="900" height="500" alt="bluebird" />
<img src="./screenshots/4.gif" width="900" height="500" alt="bluebird" />

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- You have installed the latest version of [Node.js and NPM](https://nodejs.org/en/).
- You have a Windows/Linux/Mac machine.

### Installing and using

To get acclimated, follow the steps below:

1. Fork and clone this repository.
2. Open a terminal and run npm install.
3. Create a free account on Cloudinary and create a database on MONGODB.
3. Create a file called .env and provide your environment variables for PORT, JWT_SECRET, MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_CLOUD, CLOUDINARY_KEY, CLOUDINARY_SECRET, and NODE_ENV.
4. Open a terminal and run npm run start to run the server.
4. Open a terminal and run cd client and npm run start to run the client.

## Built With

* [npm](https://www.npmjs.com/) - The package manager used to manage the various dependencies.
* [Material UI](https://material-ui.com/) - The framework used to design the user interface.
* [Express](https://expressjs.com/) - The JavaScript library used to handle HTTP requests.
* [Axios](https://github.com/axios/axios) - The JavaScript library used to make HTTP requests.
* [React-Router](https://reacttraining.com/react-router/) - The standard routing library for React that allows navigation without refreshing the page.
* [ESlint](https://eslint.org/) - The tool used to maintain code quality.
* [Prettier](https://prettier.io/) - The tool used to format code.
* [Mongoose](https://mongoosejs.com) - The MongoDB object modeling used.
* [MongoDB](https://www.mongodb.com/) - The database used.
* [React](https://reactjs.org) - The JavaScript framework used for building the user interface.
* [React Toast Notifications](https://github.com/jossmac/react-toast-notifications) - The notification system used.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ahtae/assemble/tags).

## Authors

* **Kristy Li** - *Initial work* - [ahtae](https://github.com/ahtae)

See also the list of [contributors](https://github.com/ahtae/bluebird/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ahtae/bluebird/blob/master/LICENSE) file for details

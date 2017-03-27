# The APP (The Almost Perfect Pick)

## Project 1 for NW Coding Boot Camp

### Created By
* [Liam Fox](https://github.com/FoxMessenger)
* [Andy Hang](https://github.com/ahang)
* [Shreya Kondilya](https://github.com/skondilya)
* [Louise Nyambati](https://github.com/LouiseNyambati)

### How to Run
[Click Here](https://stormy-ocean-12127.herokuapp.com/) to access the app.

### Objective
To assist users of Netflix to narrow down a good movie based on IMDB Rating of 6 or higher. More movie time and less browse time

### Coded Using
HTML, CSS, Bootstrap, Javascript, jQuery, AJAX and Firebase

### APIs Used
* [The Movie DB](https://www.themoviedb.org/documentation/api)
* [Unofficial Netflix Online Global Search](https://market.mashape.com/unogs/unogs)

### Libraries Used
* [FirebaseUi-Web](https://github.com/firebase/firebaseui-web)

### How the App works
Initially, the user will be required to login using Google. This will send the data to Firebase allowing us to track the user's name. It will then redirect the user to the landing page. The landing page will have 6 genres and depending on which genre the user selects, it will hit the first API call using themoviedb. The API will spit us a random title from a random page. That random title is then hitting the second API, UNOGS. The purposing of using UNOGS is to check to ensure the title is available to view on Netflix. If it isn't, then the user will be directed to hit the button again. Once a movie is chosen and is available on Netflix, the user can choose to click on the Netflix Button to view it and also "Love" it, if they enjoyed watching it. The Love it button will push the data to Firebase and that will allow us to call all the pushed loved movies onto a single page, which shows all the movies people enjoyed watching. 

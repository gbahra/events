angular
  .module('events')
  .factory('Auth', AuthFactory)
  .run(function(){
    var config = {
    apiKey: "AIzaSyC-QfeLxezCzFTp47ppke5_2I06fSGv3wo",
    authDomain: "events-dbe4e.firebaseapp.com",
    databaseURL: "https://events-dbe4e.firebaseio.com",
    storageBucket: "events-dbe4e.appspot.com",
    messagingSenderId: "780815985762"
  };
  firebase.initializeApp(config);
})

function AuthFactory($firebaseAuth){
  return $firebaseAuth()
}

angular
  .module('myApp')
  .factory('Auth', AuthFactory)
  .run(function(){
    var config = {
      apiKey: "AIzaSyDlufObj51cATk4RiMX1GDAja1QyWN01n8",
      authDomain: "fir-app-6336b.firebaseapp.com",
      databaseURL: "https://fir-app-6336b.firebaseio.com",
      storageBucket: "fir-app-6336b.appspot.com",
      messagingSenderId: "962671246283"
    };
    firebase.initializeApp(config);
  })

function AuthFactory($firebaseAuth){
  return $firebaseAuth()
}

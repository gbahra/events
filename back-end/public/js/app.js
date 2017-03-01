angular
  .module('events',['ui.router', 'firebase'])
  .constant('API', '/api')
  .constant('api', 'http://www.skiddle.com/api/v1/')
  .config(MainRouter)
  .run(AuthCatcher)

function AuthCatcher($rootScope, $state){
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    if(error === "AUTH_REQUIRED") $state.go('authRequired')
  })
}

function MainRouter($stateProvider, $urlRouterProvider){

  var authRequired = {
    currentAuth: function(Auth){
      return Auth.$requireSignIn()
    }
  }
  $stateProvider
    .state('authRequired',{
      url: '/authRequired',
      templateUrl: 'states/authRequired.html'
    })
    .state('new',{
      url: '/user/new',
      templateUrl: 'states/newUser.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: 'states/home.html',
    })
    .state('searchResult',{
      url: '/event/:id',
      templateUrl: 'states/searchResult.html',
      resolve: authRequired
    })
    .state('edit',{
      url: 'user/:id/edit',
      templateUrl: 'states/editUser.html',
      resolve: authRequired
    })
     .state('favourites',{
      url: '/favourites',
      templateUrl: 'states/favourites.html',
      resolve: authRequired
    })
    .state('signUp',{
      url: '/signUp',
      templateUrl: '/states/signup.html'
    })
    .state('login',{
      url: '/login',
      templateUrl: '/states/login.html'
    })
    .state('show',{
      url: '/show/:event',
      templateUrl: '/states/show.html'
    })
    $urlRouterProvider.otherwise('/')
}

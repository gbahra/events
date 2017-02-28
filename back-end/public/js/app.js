angular
  .module('events',['ui.router'])
  .constant('API', 'http://localhost:3000')
  .config(MainRouter)
  .run(AuthCatcher)

function AuthCatcher($rootScope, $state){
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    if(error === "AUTH_REQUIRED") $state.go('authRequired')
  })
}

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('authRequired',{
      url: '/user/authRequired',
      templateUrl: 'states/authRequired.html'
    })
    .state('new',{
      url: '/user/new',
      templateUrl: 'states/newUser.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: 'states/home.html'
    })
    .state('searchResult',{
      url: '/event/:id',
      templateUrl: 'states/searchResult.html'
    })
    .state('edit',{
      url: 'user/:id/edit',
      templateUrl: 'states/editUser.html'
    })
     .state('favourites',{
      url: '/favourites',
      templateUrl: '/states/favourites.html'
    })
    .state('signUp',{
      url: '/signUp',
      templateUrl: '/states/signup.html'
    })
    .state('login',{
      url: '/login',
      templateUrl: '/states/login.html'
    })
    $urlRouterProvider.otherwise('/')
}

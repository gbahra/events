angular
  .module('events',['ui.router'])
  .config(MainRouter)
// .constant('API', 'http://localhost:3000')

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('authRequired',{
      url: '/user/authRequired',
      templateUrl: '/states/authRequired.html'
    })
    .state('new',{
      url: '/user/new',
      templateUrl: '/states/newUser.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: '/states/home.html'
    })
    .state('searchResult',{
      url: '/event/:id',
      templateUrl: '/states/searchResult.html'
    })
    .state('edit',{
      url: 'user/:id/edit',
      templateUrl: '/states/editUser.html'
    })
     .state('favourites',{
      url: 'user/:id/favourites',
      templateUrl: '/states/favourites.html'
    })
    $urlRouterProvider.otherwise('/')
}

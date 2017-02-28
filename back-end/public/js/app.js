angular
  .module('events',['ui.router'])
  .constant('API', 'http://localhost:3000')
  .config(MainRouter)


function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('authRequired',{
      url: '/user/authRequired',
      templateUrl: 'js/states/authRequired.html'
    })
    .state('new',{
      url: '/user/new',
      templateUrl: 'js/states/newUser.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: 'js/states/home.html'
    })
    .state('searchResult',{
      url: '/event/:id',
      templateUrl: 'js/states/searchResult.html'
    })
    .state('edit',{
      url: 'user/:id/edit',
      templateUrl: 'js/states/editUser.html'
    })
     .state('favourites',{
      url: '/favourites',
      templateUrl: '/js/states/favourites.html'
    })
    $urlRouterProvider.otherwise('/')
}

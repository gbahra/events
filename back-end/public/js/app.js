angular
  .module('events',['ui.router'])
  // .constant('API', 'http://localhost:3000')
  // .config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('authRequired',{
      url: '/authRequired',
      templateUrl: '/states/authRequired.html'
    })
    .state('new',{
      url: '/new',
      templateUrl: '/states/newUser.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: '/states/home.html'
    })
    .state('searchResult',{
      url: '/searchResult',
      templateUrl: '/states/searchResult.html'
    })
    .state('edit',{
      url: '/criminals/:id/edit',
      templateUrl: '/states/editUser.html'
    })
     .state('favourites',{
      url: '/favourites',
      templateUrl: '/states/favourites.html'
    })
    $urlRouterProvider.otherwise('/')
}

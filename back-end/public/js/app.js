angular
  .module('events',['ui.router'])
  // .constant('API', 'http://localhost:3000')
  // .config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/criminals',
      templateUrl: '/states/home.html'
    })
    .state('new',{
      url: '/criminals/new',
      templateUrl: '/states/new.html'
    })
    .state('show',{
      url: '/criminals/:id',
      templateUrl: '/states/show.html'
    })
    .state('edit',{
      url: '/criminals/:id/edit',
      templateUrl: '/states/edit.html'
    })

    $urlRouterProvider.otherwise('/')
}

var app = angular.module('auth');

app.config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'loginController'
        })        
});
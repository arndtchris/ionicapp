var app = angular.module('chat');

app.config(function($stateProvider) {
    $stateProvider
        .state('chatList', {
            url: '/chatList',
            controller: 'chatListController',
            templateUrl : '/js/chat/views/chatList.html'
        })        
});

app.config(function($stateProvider) {
    $stateProvider
        .state('createChat', {
            url: '/createChat',
            controller: 'editChatController'
        })        
});

app.config(function($stateProvider) {
    $stateProvider
        .state('detailChat', {
            url: '/detailChat/:id',
            controller: 'detailChatController',
            templateUrl : '/js/chat/views/chat.html'
        })        
});
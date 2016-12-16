var app = angular.module('auth');

app.controller('loginController', function($scope,Auth,$state){
    Auth.$signInWithPopup('google')
        .then(function(firebaseUser){

            $state.go('chatList');
            
        }).catch(function(error){
            
            console.log("Authentication failed:", error);
        })
});
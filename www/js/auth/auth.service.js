var app = angular.module('auth');

app.factory("Auth", ["$firebaseAuth",
    function ($firebaseAuth){
        return $firebaseAuth();
    }
]);
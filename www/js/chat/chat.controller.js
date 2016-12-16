var app = angular.module('chat');

app.controller('chatListController',function($scope,$firebaseArray,Auth,chatProvider){
    //On récupère la liste des chats
    $scope.chats = chatProvider.list();
});

app.controller('editChatController',function($scope,Auth,$ionicModal,$state,chatProvider){

    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true

    $ionicModal.fromTemplateUrl('/js/chat/views/editChatModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.addChat = function(u) {        

        chatProvider.create(u);
        $scope.modal.hide();

        $state.go('chatList');
    };

    $scope.delete = function(u)
    {
        chatProvider.delete(u);
        $state.go('chatList');
    }

});

app.controller('detailChatController',function($scope,$stateParams,chatProvider,$state){

    $scope.selectedChat = chatProvider.getChat($stateParams.id);

    $scope.addMessage = function(idChat,msg)
    {
        chatProvider.addMessage(idChat,msg.texte);

        console.log(idChat);
        console.log(texte);

        $state.go('detailChat',{id : idChat});
    }

});
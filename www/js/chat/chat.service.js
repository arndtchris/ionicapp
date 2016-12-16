var app = angular.module('chat');

app.provider('chatProvider',function(){

    this.$get = function($firebaseArray, Auth, $firebaseObject)
    {
        var chatsRef = firebase.database().ref();
        var chats = $firebaseArray(chatsRef);

        //Par défaut on génère 3 chats
        //opération asynchrone, on attend que la liste soit chargée avant de vérifier si des chanels sont déjà créés
        chats.$loaded().then(function() 
        {
            if(chats.length === 0)
            {
                console.log("add");
                chats.$add({name : "sport",date : new Date().toISOString(), creator : Auth.$getAuth().displayName, messages : [
                    {timestamp : new Date().getTime(),
                    utililisateur: Auth.$getAuth().displayName,
                    texte : "bla bla blaaa"},
                    {timestamp : new Date().getTime(),
                    utilisateur: Auth.$getAuth().displayName,
                    texte : "blu blu bluuu"}
                ]});
                chats.$add({name : "informatique",date : new Date().toISOString(), creator : Auth.$getAuth().displayName, messages :[
                    {timestamp : new Date().getTime(),
                    utilisateur: Auth.$getAuth().displayName,
                    texte : "l'informatique c'est fantastique"}
                ]});
                chats.$add({name : "voyage",date : new Date().toISOString(), creator : Auth.$getAuth().displayName, messages :[
                    {timestamp : new Date().getTime(),
                    utilisateur: Auth.$getAuth().displayName,
                    texte : "les voyages forment la jeunesse"}
                ]});
            }
        }).catch(function(error) {
        console.log("Error:", error);
        });

        return {
            list: function(){
                return chats;
            },
            create: function (chat)
            {
                chats.$add({name : chat.name ,date : new Date().toISOString(), creator : Auth.$getAuth().displayName});
            },
            delete: function (chat)
            {
                chats.$remove(chat);
            },
            getChat: function (id)
            {
                return chats.$getRecord(id);
            },
            getMessages: function(idChat,nbMsg)
            {
                if(nbMsg === 0)
                {
                    nbMsg = 200;
                }

                var query =  chats.child('messages').orderByChild("timestamp").limitToLast(nbMsg);

                return $firebaseArray(query);
            },
            addMessage: function(idChat,msg)
            {

                $firebaseArray(chatsRef.child(idChat).child('messages'))
                .$add({timestamp : new Date().getTime(),
                    utilisateur: Auth.$getAuth().displayName,
                    texte : msg});
            }
        }
    }
});

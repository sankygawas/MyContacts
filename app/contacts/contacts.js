'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsController'
  });
})

.controller('ContactsController',['$scope','$firebaseObject','$firebaseArray',function($scope,$firebaseObject,$firebaseArray) {
    
    var ref = firebase.database().ref();
  $scope.data = $firebaseObject(ref);
     $scope.contacts = $firebaseArray(ref);
     console.log($scope.contacts);
  /*  var reference = new Firebase("mycontacts-a8f39.firebaseapp.com/contacts");  
   
    */
}]);

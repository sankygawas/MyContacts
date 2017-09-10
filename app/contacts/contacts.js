'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsController'
  });
})

//contacts Controller
.controller('ContactsController',['$scope','$firebaseObject','$firebaseArray',function($scope,$firebaseObject,$firebaseArray) {
    
    //initialize firebase
    var ref = firebase.database().ref();
    $scope.data = $firebaseObject(ref);
    
    //get contacts from firebase
    $scope.contacts = $firebaseArray(ref);
    
    //show/hide add form
    $scope.isAddFormShow = false;
    $scope.showAddForm = function(){
        $scope.isAddFormShow = !$scope.isAddFormShow;    
    }
    
    //add the contact
    $scope.submitAddContactForm = function(){
        console.log("ading contact");
    }
    
}]);

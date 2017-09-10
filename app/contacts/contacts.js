'use strict';

angular.module('myContacts.contacts', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsController'
  });
})

.controller('ContactsController',function($scope) {
    $scope.msg = "inside contacts";
    console.log($scope.msg);
});

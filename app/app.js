'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts',['ngRoute','myContacts.contacts'])

.config(['$locationProvider','$routeProvider',function($locationProvider, $routeProvider) {
/*  $locationProvider.hashPrefix('!');*/
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);


// Declare app level module which depends on views, and components
/*
angular.module('templatesStore', [
  'ngRoute',
  'templatesStore.view1',
  'templatesStore.view2',
  'templatesStore.templates'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
  .otherwise({redirectTo: '/templates'});
}]);
*/

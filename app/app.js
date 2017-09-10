'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts',['ngRoute','myContacts.contacts'])

.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/contacts'});
});

'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts','mycontacs.contacts' ['ngRoute']).
config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/contacts'});
});

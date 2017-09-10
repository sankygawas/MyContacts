'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts',['ngRoute','myContacts.contacts','firebase'])

.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/contacts'});
    
     var config = {
    apiKey: "AIzaSyDiXXVEpACr1BVgh0hdsPFjQMHsW1ui-_Y",
    authDomain: "mycontacts-a8f39.firebaseapp.com",
    databaseURL: "https://mycontacts-a8f39.firebaseio.com",
    projectId: "mycontacts-a8f39",
    storageBucket: "mycontacts-a8f39.appspot.com",
    messagingSenderId: "904068634727"
  };
  firebase.initializeApp(config);
});


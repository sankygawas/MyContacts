'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsController'
  });
})

//constants
.constant('constants', { EMPTY_STRING: '' })

//contacts Controller
.controller('ContactsController',['$scope','$firebaseObject','$firebaseArray','constants',function($scope,$firebaseObject,$firebaseArray,constants) {
    
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
        //Build and add object
        $scope.contacts.$add($scope.addObject())
            .then(function(){
            
            //clear the foem fileds
            $scope.clearFields();
            
            //hide the form
            $scope.isAddFormShow  = false;
        });
    }
    
     //delete the contact
    $scope.deleteContact = function(contact){
        console.log(contact)
        $scope.contacts.$remove(contact);
        $scope.isContactDeleted = true;
        
    };
    
    $scope.closeDeleteAlert = function(){
        $scope.isContactDeleted = false;
    }
    
    
    
    //clear fields
    $scope.clearFields = function(){
        $scope.name = constants.EMPTY_STRING;
        $scope.email = constants.EMPTY_STRING;
        $scope.company = constants.EMPTY_STRING;
        $scope.work_phone = constants.EMPTY_STRING;
        $scope.mobile_phone = constants.EMPTY_STRING;
        $scope.home_phone = constants.EMPTY_STRING;
        $scope.street_address = constants.EMPTY_STRING;
        $scope.city = constants.EMPTY_STRING;
        $scope.state = constants.EMPTY_STRING;
        $scope.zip = constants.EMPTY_STRING;

    }
    
    //build json object and return
    $scope.addObject = function(){
        //Assign Values
        if($scope.name)           { var name=$scope.name } else { var name = null; } 
        if($scope.email)          { var email=$scope.email } else { var email = null; } 
        if($scope.company)        { var company=$scope.company } else { var company = null; } 
        if($scope.work_phone)     { var work_phone=$scope.work_phone } else { var work_phone = null; } 
        if($scope.mobile_phone)   { var mobile_phone=$scope.mobile_phone } else { var mobile_phone = null; } 
        if($scope.home_phone)     { var home_phone=$scope.home_phone } else { var home_phone = null; } 
        if($scope.street_address) { var street_address=$scope.street_address } else { var street_address = null; } 
        if($scope.city)           { var city=$scope.city} else { var city = null; } 
        if($scope.zip)            { var zip=$scope.zip } else { var zip = null; } 
        
        return {
            name:name,
            email:email,
            phone:{
                work_phone:work_phone,
                mobile_phone:mobile_phone,
                home_phone:home_phone
            },
            address:{
                street_address:street_address,
                city:city,
                zip:zip
            }
            
        }
        
    }
    
}]);

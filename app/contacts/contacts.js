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
        $scope.isEditFormShow = false;
        $scope.clearFields();
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
            
            //show message
            $scope.isContactAdded = true;
        });
    }
    
     //delete the contact
    $scope.deleteContact = function(contact){
        console.log(contact)
        $scope.contacts.$remove(contact);
        $scope.isContactDeleted = true;
        
    };
    
    $scope.closeAlert = function(){
        $scope.isContactDeleted = false;
        $scope.isContactAdded = false;
    }
    
    
    //submit edit contact
    $scope.submitEditContactForm = function(){
        //get id
        var id = $scope.id
        //get record
        var record = $scope.contacts.$getRecord(id);
           console.log(record);
        
        //assign record
        record.name =          $scope.name;
        record.email =         $scope.email;
        record.company =       $scope.company ;
        record.phone.work_phone =    $scope.work_phone;
        record.phone.mobile_phone =  $scope.mobile_phone ;
        record.phone.home_phone =    $scope.home_phone;
        record.address.street_address =$scope.street_address;
        record.address.city =          $scope.city ;
        record.address.state =         $scope.state;
        record.address.zip =           $scope.zip;
        
        //save record to db
        $scope.contacts.$save(record);
        //clear all fields
        $scope.clearFields();
        $scope.isEditFormShow = false;
    };
    
     //show/hide edit form
    $scope.isEditFormShow = false;
    $scope.showEditForm = function(contact){
        $scope.isEditFormShow = !$scope.isEditFormShow;   
        $scope.isAddFormShow = false;
       console.log(contact);
        $scope.id =            contact.$id;
        $scope.name =          contact.name;
        $scope.email =         contact.email;
        $scope.company =       contact.company ;
        $scope.work_phone =    contact.phone.work_phone;
        $scope.mobile_phone =  contact.phone.mobile_phone ;
        $scope.home_phone =    contact.phone.home_phone;
        $scope.street_address =contact.address.street_address;
        $scope.city =          contact.address.city ;
        $scope.state =         contact.address.state;
        $scope.zip =           contact.address.zip;
        
        
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

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
        
        //Build object
        $scope.contacts.$add({
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
            
        }).then(function(){
            var id = ref.key;
            console.log(ref);
            console.log("adding conatc id"+id);
            console.log($scope.contacts);
            
            $scope.clearFields();
            $scope.isAddFormShow  =false;
        });
    }
    
    
    $scope.clearFields = function(){
        $scope.name = "";
        $scope.email = "";
        $scope.company = "";
        $scope.work_phone = "";
        $scope.mobile_phone = "";
        $scope.home_phone = "";
        $scope.street_address = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zip = "";

    }
    
}]);

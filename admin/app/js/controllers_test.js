angular.module('starter.controllers', ['ionic'])

.factory('allTripDatesService', ['starter.constants'],function($http) {
  var allTrips = [];
  var host = "http://ranjoy.comeze.com/trip"

  return {
    //getAccessPoints
    allTripDates: function(){

      var url = host+"/tripServer.php?route=allTripDates";
      return $http.get(url).then(function(response){
        allTrips = response.data;
        return allTrips;
      })
    },

    addTrip: function(data){

      var url = host+"/tripServer.php?route=addTrip";
      //alert("url "+url);
      return $http.post(url, data).then(function(response){
        return response.data;
      })
    }
  }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, allTripDatesService, $ionicPopup) {

  // var myPopup = $ionicPopup.show({
  //   template: '<a class="button button-full " style="font-weight: bolder;" id="bwlogin" ng-click="sendOrder()">Fermer</a>',
  //   scope: $scope,
  //   title: 'alert'
    
  // });

  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.addTripForm = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addTrip.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    
  });

  // Triggered in the login modal to close it
  $scope.closeAddTrip = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
    $scope.addTripSaveLoading = false;
    $scope.addTripSaveButton = true;
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear();
    var date = year + "-" + month + "-" + day;
    var time = currentDate.toLocaleTimeString().replace(/:\d+ /, ' ');

    //document.write("<b>" + day + "/" + month + "/" + year + "</b>")
    $scope.addTripForm.angularTripDate = date;//day + "/" + month + "/" + year;
    $scope.addTripForm.angularTripTime = time;
    var name = window.localStorage['profileName'] || 'you';
    $scope.addTripForm.angularTripPaidBy = name;
    $scope.addTripForm.angularTripAmount = 0;
    $scope.addTripForm.angularTripBy = "Bus";
  };

  // Perform the login action when the user submits the login form
  $scope.addTrip = function() {
    $scope.addTripSaveLoading = true;
    $scope.addTripSaveButton = false;
    //alert(JSON.stringify($scope.addTripForm));
    //SoftKeyboard.hide();
    //
    allTripDatesService.addTrip($scope.addTripForm).then(function(response){
      //alert(JSON.stringify(response));
      $scope.closeAddTrip();
      $scope.$broadcast('refreshTrips', {
            someProp: 'some object' // send whatever you want
      });
    });
  };
})

.controller('SignInCtrl', function($scope) {
alert("aa");
  $scope.signIn = function()
  {

    alert("a");
  };
})

.controller('SignUpCtrl', function($scope, $state) {
  $scope.signUp = function(data)
  {
    // alert("angularTripUserEmail "+data.angularTripUserEmail);
    // alert("angularTripUserPassword "+data.angularTripUserPassword);
    // alert("angularTripUserPhoneNo "+data.angularTripUserPhoneNo);
    // alert("angularTripUserName "+data.angularTripUserName);

    $state.go('userActivation');
  };
})

.controller('UserActivationCtrl', function($scope, $state) {
  $scope.userActvation = function(data)
  {
     alert("angularTripUserEmail "+data.angularTripUserEmail);
    // alert("angularTripUserPassword "+data.angularTripUserPassword);
    // alert("angularTripUserPhoneNo "+data.angularTripUserPhoneNo);
    // alert("angularTripUserName "+data.angularTripUserName);

    $state.go('app.trips');
  };
})

//AccessPointsCtrl
.controller('TripsCtrl', function($scope, $stateParams, allTripDatesService) {
  $scope.loadData = function()
  {
    $scope.loading = true;
    $scope.tripSummery = false;
    $scope.noTrip = false;
    

    
    //alert('Hello, ' + name);
    
    $scope.allTrips = [];
    $scope.allTripsSponsors = [];

    //getAccessPoints
    allTripDatesService.allTripDates().then(function(allTrips){
      if(allTrips.success)
      {
        //alert(JSON.stringify(allTrips.tripDetails));
        $scope.allTrips = allTrips.tripDetails; // response data
        $scope.tripTotalCostForMonth = allTrips.tripTotalCostForMonth; // response data
        $scope.tripAtAGance = allTrips.tripAtAGance; // response data
        $scope.noOfSponsor = allTrips.tripAtAGance.length;
        $scope.eachShouldSpent = Math.round(allTrips.tripTotalCostForMonth / allTrips.tripAtAGance.length);

        $scope.loading = false;
        $scope.tripSummery = true;
        $scope.noTrip = false;
      }
      else
      {

        $scope.loading = false;
        $scope.tripSummery = false;
        $scope.noTrip = true;
        //alert(allTrips.message);
      }
      
    });

    $scope.refreshData = function()
    {
      $scope.loadData();
    };

    $scope.deleteAParticularTrip = function (tip_id) {
      alert("tip_id "+tip_id);
    };
  };
  //listner
  $scope.$on('refreshTrips', function (event, data) {
    $scope.loadData();
    });

  $scope.loadData();
})

//ProfileCtrl
.controller('ProfileCtrl', function($scope) {
  $scope.saveProfileFrom = {};

  $scope.loadData = function() {
    $scope.saveProfileFrom.angularProfileName = window.localStorage['profileName'] || 'you';
    $scope.saveProfileFrom.angularProfilePhoneNo = window.localStorage['profilePhoneNo'] || '8976456312';
  };
  
  //saveProfile
  $scope.saveProfile = function() {
    localStorage.removeItem('profileName');
    window.localStorage['profileName'] = $scope.saveProfileFrom.angularProfileName;
    window.localStorage['profilePhoneNo'] = $scope.saveProfileFrom.angularProfilePhoneNo;
    alert("Profile saved");  
  };

  $scope.loadData();
});

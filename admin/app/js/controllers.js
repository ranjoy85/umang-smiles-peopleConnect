angular
	.module
	(
		'starter.controllers', 
		[
			'ionic', 'starter.factory', 'starter.services', 'starter.constants', 'starter.directives'
		]
	)

	//FrontCtrl
	.controller
	(
		'FrontCtrl', 
		function
		(
			$scope, $state, SERVICE 
		) 
		{
			//SERVICE.goTestServer();

			//goToSignIn
			$scope.goToSignIn = function()
			{
				$state.go('sign-in', {}, {reload: true});
			};

			//goToSignUp
			$scope.goToSignUp = function()
			{
				$state.go('sign-up', {}, {reload: true});
			};
		}
	)

	//SignInCtrl
	.controller
	(
		'SignInCtrl', 
		function
		(
			$scope, $http, $ionicLoading, SERVICE, $ionicPopup, PATTERN, $state, $ionicHistory, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, STRING, $timeout, FONT_ICON
		) 
		{

			var _storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
			
			$scope._signInFormData = {};
			$scope._stringConst = STRING;
			$scope._fontIconConst = FONT_ICON;

			//set pattern
			$scope._pattern = 
			{
				_passwordPattern : PATTERN.PASSWORD_PATTERN
			};

			//loadData
			$scope.loadData = function()
			{
				//load page with session user if present
				if(_storedSessionUserCredientils)
				{
					$scope._signInFormData = 
					{
						userEmail: _storedSessionUserCredientils._loggedInSessionUserEmail,
						userPassword : _storedSessionUserCredientils._loggedInSessionUserPassword,
						loggedInSessionId : _storedSessionUserCredientils._loggedInSessionId,
						userLoginType :'FRESH_LOGIN'
					};
				}

				//clear fields
				else
				{
					//initial load data
					$scope._signInFormData = 
					{
						userEmail: '',
						userPassword : '',
						loggedInSessionId : ''
					};
				} 
			};

			//goForgotPassword
			$scope.goForgotPassword = function()
			{
				$state.go('security-check-in', {}, {reload: true});
			};

			//saveAccessToken
			$scope.saveAccessToken = function(loggedInSessionId) {
				localStorage.removeItem('loggedInSessionId');
				window.localStorage['loggedInSessionId'] = loggedInSessionId;  
			};

			//cancelsignInForm
			$scope.cancelsignInForm = function()
			{
				//if text fields are filled up
				if($scope._signInFormData.userEmail || $scope._signInFormData.userPassword)
				{
					$ionicPopup
						.alert
						(
							{
								title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
								template: ALERT_TEXT.ALERT_TEXT_EXIT_SIGN_IN,
								scope: $scope,
								buttons: 
								[
							   		{ 
							   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
							   			type: 'alert-button-blue',
							   			onTap: function() 
							   			{
							   				$state.go('front', {}, {reload: true});
							   			}
							   		},
							   		{
							     		text: ALERT_BUTTON.ALERT_BUTTON_NO,
							     		type : 'alert-button-white',
							     		onTap: function() 
							     		{ 
							     			//
							     		}
							   		}
							  	]
							}
						);
				}
				//if not
				else
				{
					$state.go('front', {}, {reload: true});
				}
				
			};

			//getUserDetails
			$scope.getUserDetails = function()
			{
				//getStoredSessionUserCredientils
				var _storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
				$scope._userProfileData = {};

				//load page with session user if present
				if(_storedSessionUserCredientils)
				{
					$scope._userProfileData = 
					{
						userId: _storedSessionUserCredientils._loggedInSessionUserId
					};
				}

				SERVICE.getUserProfile($scope, $scope._userProfileData)
					.then
                        (
                            function() 
                            {
                                $ionicLoading.hide();
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                            }
                        );
			};

			//signIn
			$scope.signIn = function(_signInForm)
			{
				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_SIGNING_IN
				};
				
				//alert(JSON.stringify($scope.loading));
				//show loading
				$ionicLoading
					.show
					(
						{

	    					templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				)
	  				
				if(_signInForm.$valid) 
				{
					SERVICE.goSignIn($scope, $scope._signInFormData)
						.then
                            (
                                function() 
                                {
                                    $ionicLoading.hide();
                                }, 
                                function(err) 
                                {
                                    $ionicLoading.hide();
                                }
                            );
				}
			};

			//signInSuccessfull-broadcast
			$scope
				.$on
				(
					'signInSuccessfull-broadcast', 
					function (event, data) 
					{
						$scope.getUserDetails();
			    	}
			    );
				

			//userProfileReceavedSuccess-broadcast
			$scope
				.$on
				(
					'userProfileReceavedSuccess-broadcast', 
					function (event, data) 
					{
						$ionicLoading.hide();
						$state.go('app.system-events-landing', {}, {reload: true});
			    	}
			    );

			//$ionicView.afterEnter
			$scope
				.$on
				(

					'$ionicView.afterEnter', 
					function (event, data) 
					{
						//clearForm
						$scope.loadData();	
			    	}
			    );
		}
	)
	
	//AppCtrl
	.controller
	(
		'AppCtrl', 
		function
		(
			$rootScope, $scope, $state, SERVICE, $ionicPopup, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicSideMenuDelegate, $timeout, STRING, $ionicModal, FONT_ICON
		) 
		{
			//_stringConst
			$scope._stringConst = STRING;
			$scope._fontIconConst = FONT_ICON;
			$scope._sessionData = {};
			$scope._signInFormData = {};

			$scope.loadProfileData = function()
			{
				var _storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
				$scope._sessionData = 
				{
					userId: _storedSessionUserCredientils._loggedInSessionUserId,
					userEmail : _storedSessionUserCredientils._loggedInSessionUserEmail,
	                userFirstName : _storedSessionUserCredientils._loggedInSessionUserFirstName,
	                userLastName : _storedSessionUserCredientils._loggedInSessionUserLastName
				};
			};

			$scope.goLogoutServerUser = function()
			{
				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_LOG_OUT_USER
				};
	
				//show loading
				$ionicLoading
					.show
					(
						{
							templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				);
	  				
	  			//goLogoutServerUser
				SERVICE.goLogoutServerUser($scope, $scope._sessionData)
					.then
                        (
                            function() 
                            {
                                $ionicLoading.hide();
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                            }
                        );
			};

			//goLogout
			$scope.goLogout = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
				$ionicPopup
					.alert
					(
						{
							title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
							template: ALERT_TEXT.ALERT_TEXT_LOG_OUT,
							scope: $scope,
							buttons: 
							[
						   		{ 
						   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
						   			type: 'alert-button-blue',
						   			onTap: function() 
						   			{
						   				$scope.goLogoutServerUser();
						   				//destroy all user data
						   				
						   			}
						   		},
						   		{
						     		text: ALERT_BUTTON.ALERT_BUTTON_NO,
						     		type : 'alert-button-white',
						     		onTap: function() 
						     		{ 
						     			//
						     		}
						   		}
						  	]
						}
					);
			};

			//edit-profile ionicModal
			$ionicModal.fromTemplateUrl
			(
				'templates/about.html', 
				{
					scope: $scope,
			    	animation: 'slide-in-up'
			  	}
			).then
			(
				function(modal) 
				{
			    	$scope.modal = modal
			  	}
			);

			//goAbout
			$scope.goAbout = function()
			{
				//show
				$scope.modal.show();
			};

			$scope.cancelOperation = function()
			{
				$scope.modal.remove();
			};

			//serverUserLoggedOutSussess-broadcast
			$scope
				.$on
				(
					'serverUserLoggedOutSussess-broadcast', 
					function (event, data) 
					{
						$state.go('front', {}, {reload: true});
			    	}
			    );

			//updateUserProfileInMenu
			$rootScope
				.$on
				(
					'updateUserProfileInMenu-broadcast', 
					function (event, data) 
					{
						$scope.loadProfileData();
			    	}
			    );

			//$ionicView.afterEnter
			$scope
				.$on
				(
					'$ionicView.afterEnter', 
					function (event, data) 
					{
						//clearForm
						$scope.loadProfileData();
			    	}
			    );

			//invalidSession-broadcast
			$rootScope
				.$on
				(
					'invalidSession-broadcast', 
					function (event, data) 
					{
						_storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
						
						$scope._signInFormData = 
						{
							userEmail: _storedSessionUserCredientils._loggedInSessionUserEmail,
							userPassword : _storedSessionUserCredientils._loggedInSessionUserPassword,
							userLoginType :'IN_APP_LOGIN'

						};

						//resign in with stored data
						$scope.signIn();
			    	}
			    );
			
			//signIn
			$scope.signIn = function(_signInForm)
			{
				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_RE_SIGNING_IN
				};
				
				//alert(JSON.stringify($scope.loading));
				//show loading
				$ionicLoading
					.show
					(
						{

	    					templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				)
	  				
				SERVICE.goSignIn($scope, $scope._signInFormData)
					.then
                        (
                            function() 
                            {
                                //$ionicLoading.hide();
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                            }
                        );
			};

			//signInSuccessfull-broadcast
			$scope
				.$on
				(
					'signInSuccessfull-broadcast', 
					function (event, data) 
					{
						$ionicLoading.hide();
						$scope.loadProfileData();
						$rootScope[$rootScope._previousAPICall]();
			    	}
			    );
		}
	)
	
	//AboutCtrl
	.controller
	(
		'AboutCtrl', 
		function
		(
			$scope, $ionicNavBarDelegate, $ionicSideMenuDelegate
		) 
		{
			//hide back button
			$ionicNavBarDelegate.showBackButton(true);

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}
		}
	)

	//CreateEditEventModalCtrl
	.controller
	(
		'CreateEditEventModalCtrl', 
		function
		(
			$rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, STRING, PATTERN, FONT_ICON, API_URL, $filter
		) 
		{
			$scope._fontIconConst = FONT_ICON;

			$scope._pageTitle = null;

			//createEvent-broadcast
			$scope
				.$on
				(
					'createEvent-broadcast', 
					function (event, data) 
					{
						createEvent(data);
					}
			    );

			//editEvent-broadcast
			$scope
				.$on
				(
					'editEvent-broadcast', 
					function (event, data) 
					{
						editEvent(data);
					}
			    );

			//deleteEvent-broadcast
			$scope
				.$on
				(
					'deleteEvent-broadcast', 
					function (event, data) 
					{
						deleteEvent(data);
					}
			    );

			//createEvent
			function createEvent(data)
			{
				$scope._pageTitle = STRING.CREATE_EVENT;
				$scope.inputDisabled = false;
				//show
				$scope._createEditEventFormData = 
				{
					userId 					: data.userId,
					eventId 				: data.eventId,
					eventName				: data.eventName,
					eventDescription		: data.eventDescription,
					eventDate 				: new Date(data.eventDate),
					eventYoutubeLink 		: data.eventYoutubeLink,
					eventWebLink 			: data.eventWebLink,
					eventTwitterLink 		: data.eventTwitterLink,
					eventFacebookLink 		: data.eventFacebookLink,
					operationType 			: data.operationType,
				};

				$scope.modal.show();
			}

			//editEvent
			function editEvent(data)
			{
				$scope.inputDisabled = true;
				$scope._pageTitle = STRING.EDIT_EVENT;
				//show
				$scope._createEditEventFormData = 
				{
					userId 					: data.userId,
					eventId 				: data.eventId,
					eventName				: data.eventName,
					eventDescription		: data.eventDescription,
					eventDate 				: new Date(data.eventDate),
					eventYoutubeLink 		: data.eventYoutubeLink,
					eventWebLink 			: data.eventWebLink,
					eventTwitterLink 		: data.eventTwitterLink,
					eventFacebookLink 		: data.eventFacebookLink,
					operationType 			: data.operationType,
				};

				$scope.modal.show();
			}

			//deleteEvent
			function deleteEvent(data)
			{
				//show
				$scope._createEditEventFormData = 
				{
					userId 					: data.userId,
					eventId 				: data.eventId,
					eventName				: data.eventName,
					eventDescription		: data.eventDescription,
					eventDate 				: new Date(data.eventDate),
					eventYoutubeLink 		: data.eventYoutubeLink,
					eventWebLink 			: data.eventWebLink,
					eventTwitterLink 		: data.eventTwitterLink,
					eventFacebookLink 		: data.eventFacebookLink,
					operationType 			: data.operationType,
				};

				$ionicPopup
					.alert
					(
						{
							title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
							template: ALERT_TEXT.ALERT_TEXT_DELETE_PROJECT,
							scope: $scope,
							buttons: 
							[
						   		{ 
						   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
						   			type: 'alert-button-blue',
						   			onTap: function() 
						   			{
						   				//pass on
						   				$rootScope.CRUDProjectDetails();
						   			}
						   		},
						   		{
						     		text: ALERT_BUTTON.ALERT_BUTTON_NO,
						     		type : 'alert-button-white',
						     		onTap: function() 
						     		{ 
						     			$scope.modal.remove();
						     		}
						   		}
						  	]
						}
					);
			};

			//set pattern
			$scope._pattern = 
			{
				_namePattern : PATTERN.NAME_PATTERN,
				_descriptionPattern : PATTERN.DESCRIPTION_PATTERN,
				_urlPattern : PATTERN.URL_PATTERN
			};

		  	//cancelOperation
			$scope.cancelOperation = function()
			{

				//if text fields are filled up
				if($scope._createEditEventFormData._eventName || $scope._createEditEventFormData._eventDescription)
				{
					$ionicPopup
						.alert
						(
							{
								title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
								template: ALERT_TEXT.ALERT_TEXT_LEAVE_OPERATION,
								scope: $scope,
								buttons: 
								[
							   		{ 
							   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
							   			type: 'alert-button-blue',
							   			onTap: function() 
							   			{
							   				$scope.modal.remove();
							   			}
							   		},
							   		{
							     		text: ALERT_BUTTON.ALERT_BUTTON_NO,
							     		type : 'alert-button-white',
							     		onTap: function() 
							     		{ 
							     			//
							     		}
							   		}
							  	]
							}
						);
				}
				//if not
				else
				{
					$scope.modal.remove();
				}
				
			};

			//CRUDProjectDetails
			$rootScope.CRUDEventDetails = function()
			{
				var _contextloadingText = null;
				if($scope._createEditEventFormData._operationType == "create")
				{
					_contextloadingText = LOADING_TEXT.LOADING_TEXT_CREATE_EVENT;
				}
				else if($scope._createEditEventFormData._operationType == "edit")
				{
					_contextloadingText = LOADING_TEXT.LOADING_TEXT_EDIT_EVENT;
				}
				else if($scope._createEditEventFormData._operationType == "delete")
				{
					_contextloadingText = LOADING_TEXT.LOADING_TEXT_DELETE_EVENT;
				}
				
				//loading
				$scope._loading = 
				{
					_ladingText :	_contextloadingText
				};
			
				//show loading
				$ionicLoading
					.show
					(
						{

	    					templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
					  )
				//convert to date
				$scope._createEditEventFormData.eventDate = $filter('date')($scope._createEditEventFormData.eventDate, "yyyy-MM-dd");
					
				//goCreateEditdeleteEvent
				SERVICE.goCRUDService($scope, $scope._createEditEventFormData, API_URL.CRUD_EVENT)
					.then
                        (
                            function() 
                            {
                                $ionicLoading.hide();
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();

                                //register as previous call
								$rootScope._previousAPICall = "CRUDEventDetails";
                            }
                        );
			};

			//CRUDProjectSuccessfull-broadcast
			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast', 
					function (event, data) 
					{

						$scope.modal.remove();

						//TaskOperationSuccessfull
						$scope
			                .$emit
			                (
			                    'EventOperationSuccessfull-broadcast', 
			                    {
			                        data: null
			                    }
							);
			    	}
			    );
		}
	)

	//SystemEventsLandingCtrl
	.controller
	(
		'SystemEventsLandingCtrl', 
		function
		(
			$rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, STRING, PATTERN, $q, $ionicActionSheet, FONT_ICON, API_URL, $http, $cordovaFileTransfer
		) 
		{
			$scope._fontIconConst = FONT_ICON;

			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_stringConst
			$scope._stringConst = STRING;

			//_userProfileData
			$scope._userProfileData = {};

			//_events
			$scope._events = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_project
			$scope._project = false;

			//_pageTitle
			$scope._pageTitle = null;

			$scope.isChecked = false;

			$scope._modalOperationType = null;

			$scope._event = null;

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			//_createEditEventFormData
			$scope._createEditEventFormData = 
				{
					userId: '',
					eventId:'',
					eventName:'',
					eventDescription:'',
					operationType:'',
				};

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			

			//getAllSystemEvents
			$rootScope.getAllSystemEvents = function()
			{
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData = 
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					_userAccess : 'root',
				};

				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_ALL_SYSTEM_EVENTS
				};
	
				//show loading
				$ionicLoading
					.show
					(
						{
							templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				)
	  				
				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.USER_EVENTS_ALL)
					.then
                        (
                            function(data) 
                            {
                                $ionicLoading.hide();
								$scope._systemEvents = data.data;
								
								console.log(JSON.stringify($scope._systemEvents));
								$scope._noData = false;
								$scope._hasData = true;
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                                $scope._message = err;
                                $scope._noData = true;
								$scope._hasData = false;

								//register as previous call
								$rootScope._previousAPICall = "getAllSystemEvents";

                            }
                        );
			};
			
			//loadCreateEditEventModal
            function loadCreateEditEventModal()
            {
                var q = $q.defer();
                var _modalReady = false;
                //create-edit-sprint ionicModal
                $ionicModal.fromTemplateUrl
                (
                    'templates/create-edit-event-modal.html', 
                    {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }
                ).then
                (
                    function(modal) 
                    {
                        $scope.modal = modal;
                        _modalReady = true;
                        if (_modalReady) 
                        {
                            q.resolve();
                        } 
                        else 
                        {
                           q.reject();
                        }
                    }
                );

                return q.promise;
            }

            //createNewSprint
            $scope.createEvent = function()
            {
                loadCreateEditEventModal()
                    .then
                    (

                        function() 
                        {
                        	_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

                            $scope
			                    .$broadcast
			                    (
			                        'createEvent-broadcast', 
			                        {
			                            'userId' 				: _storedSessionUserProfile._loggedInSessionUserId,
										'eventName'				: '',
										'eventDescription'		: '',
										'eventDate'				: new Date(),
										'eventYoutubeLink'		: '',
										'eventWebLink'			: '',
										'eventTwitterLink'		: '',
										'eventFacebookLink'		: '',
										'operationType' 		: 'create',
			                        }
			                    );
                        }
                    );
            };

			//editEvent
			$scope.editEvent = function(_event)
			{
				loadCreateEditEventModal()
                    .then
                    (

                        function() 
                        {
                        	_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

                            $scope
			                    .$broadcast
			                    (
			                        'editEvent-broadcast', 
			                        {
			                        	'userId' 				: _storedSessionUserProfile._loggedInSessionUserId,
										'eventId' 				: _event.eventId,
										'eventName' 			: _event.eventName,
										'eventDescription' 		: _event.eventDescription,
										'eventDate'				: _event.eventDate,
										'eventYoutubeLink'		: _event.eventYoutubeLink,
										'eventWebLink'			: _event.eventWebLink,
										'eventTwitterLink'		: _event.eventTwitterLink,
										'eventFacebookLink'		: _event.eventFacebookLink,
										'operationType' 		: 'edit',
			                        }
			                    );
                        }
                    );
				
			};

			//deleteEvent
			$scope.deleteEvent = function(_event)
			{
				loadCreateEditEventModal()
                    .then
                    (

                        function() 
                        {
                        	_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

                            $scope
			                    .$broadcast
			                    (
			                        'deleteEvent-broadcast', 
			                        {
			                            'userId' 				: _storedSessionUserProfile._loggedInSessionUserId,
										'eventId' 				: _event.eventId,
										'eventName' 			: _event.eventName,
										'eventDescription' 		: _event.eventDescription,
										'eventDate'				: _event.eventDate,
										'eventYoutubeLink'		: _event.eventYoutubeLink,
										'eventWebLink'			: _event.eventWebLink,
										'eventTwitterLink'		: _event.eventTwitterLink,
										'eventFacebookLink'		: _event.eventFacebookLink,
										'operationType' 		: 'delete',
			                        }
			                    );
                        }
                    );
			};

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//teamUserManagement
			$scope.teamUserManagement = function(_eventId, _teamId)
			{
				//alert(_sprint.sprintId);	
				$state.go('app.user-management', {"eventId":_eventId, "teamId":_teamId}, {reload: true});
			};

			//moreTitleBarActions
			$scope.moreTitleBarActions = function()
			{

				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class="fa fa-plus-circle"></i> Create new Event'},
     						],
     						titleText: "More action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
						    			$scope.createEvent();
						    			return true;
						    	}
						    	
						    	
						    	
						    		
						    }
						}
					);
			}

			//moreProjectActions
			$scope.moreProjectActions = function(_event)
			{
				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class="fa fa-pencil-square-o"></i> Edit event details'},
								{ text: '<i class="fa fa-trash"></i> Delete event'},
								{ text: '<i class="ion-images"></i> Event images'}
     						],
     						titleText: "More project action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
						    			$scope.editEvent(_event);
						    			return true;
						    		case 1 :
						    			$scope.deleteEvent(_event);
										return true;
									case 2 :
						    			$scope.eventImages(_event);
						    			return true;
						    	}
						    }
						}
					);
			}

			$scope.eventImages = function(_data)
			{
				$state.go('app.event-photos', {"eventId":_data.eventId}, {reload: true});
			}

			$scope.uploadedFile = function(element) 
			{
				var _fileReader = new FileReader();
				_fileReader.onload = function(event) 
				{
					$scope
						.$apply
						(
							function($scope) 
							{
								$scope.files = element.files;
								 $scope.src = event.target.result ;
								 $scope.myFile = $scope.files[0];
								 var file = $scope.myFile; 
								 console.log(file);
				 
								 var _eventImageData = new FormData();
								 _eventImageData.append("userId", _storedSessionUserProfile._loggedInSessionUserId);
								 _eventImageData.append("eventId", _event.eventId);
								 _eventImageData.append("operationType", 'create');
								 _eventImageData.append('file', $scope.myFile);
				 
								 _contextloadingText = LOADING_TEXT.LOADING_TEXT_CREATE_EVENT;
								 
								 //loading
								 $scope._loading = 
								 {
									 _ladingText :	_contextloadingText
								 };
							 
								 //show loading
								 $ionicLoading
									 .show
									 (
										 {
				 
											 templateUrl: 'templates/loader.html',
											 scope : $scope
										   }
									   )
								 //convert to date
									 
								 //goCreateEditdeleteEvent
								 SERVICE.goCRUDService($scope, _eventImageData, API_URL.CRUD_EVENT_IMAGE)
									 .then
										 (
											 function() 
											 {
												 $ionicLoading.hide();
											 }, 
											 function(err) 
											 {
												 $ionicLoading.hide();
				 
												 //register as previous call
												 $rootScope._previousAPICall = "CRUDEventDetails";
											 }
										 ); 
							 }
						);
				}
				_fileReader.readAsDataURL(element.files[0]);

				
			  }

			//CRUDProjectDetails
			$scope.uploadFile = function(_event)
			{
				$scope.myFile = $scope.files[0];
				var file = $scope.myFile; 
				console.log(file);

				var _eventImageData = new FormData();
				_eventImageData.append("userId", _storedSessionUserProfile._loggedInSessionUserId);
				_eventImageData.append("eventId", _event.eventId);
				_eventImageData.append("operationType", 'create');
				_eventImageData.append('file', $scope.myFile);

				_contextloadingText = LOADING_TEXT.LOADING_TEXT_CREATE_EVENT;
				
				//loading
				$scope._loading = 
				{
					_ladingText :	_contextloadingText
				};
			
				//show loading
				$ionicLoading
					.show
					(
						{

	    					templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
					  )
				//convert to date
					
				//goCreateEditdeleteEvent
				SERVICE.goCRUDService($scope, _eventImageData, API_URL.CRUD_EVENT_IMAGE)
					.then
                        (
                            function() 
                            {
                                $ionicLoading.hide();
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();

                                //register as previous call
								$rootScope._previousAPICall = "CRUDEventDetails";
                            }
                        );
			};

			
			//CRUDProjectSuccessfull-broadcast
			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast', 
					function (event, data) 
					{
						console.log(JSON.stringify(data));

			    	}
			    );

			//doRefresh
			$scope.doRefresh = function() {
		    	$scope.getAllSystemEvents();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter', 
					function (event, data) 
					{
						$scope.getAllSystemEvents();
			    	}
			    );

			$scope
				.$on
				(
					'dataRetrivedSuccess-broadcast', 
					function (event, data) 
					{
			    		//
			    	}
				);
			
			$scope
				.$on
				(
					'EventOperationSuccessfull-broadcast', 
					function (event, data) 
					{
			    		$scope.getAllSystemEvents();
			    	}
				);
				

			
		}
	)

	//EventPhotosCtrl
	.controller
	(
		'EventPhotosCtrl', 
		function
		(
			$stateParams, $rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, STRING, PATTERN, $q, $ionicActionSheet, FONT_ICON, API_URL, $http, $cordovaFileTransfer, $ionicHistory,
		) 
		{
			$scope._fontIconConst = FONT_ICON;

			//_stringConst
			$scope._stringConst = STRING;

			//_userProfileData
			$scope._userProfileData = {};

			//_events
			$scope._events = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//getAllEventPhotos
			$rootScope.getAllEventPhotos = function()
			{
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData = 
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					eventId : $stateParams.eventId,
				};

				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_ALL_SYSTEM_EVENTS
				};
	
				//show loading
				$ionicLoading
					.show
					(
						{
							templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				)
	  				
				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.EVENT_IMAGES)
					.then
                        (
                            function(data) 
                            {
                                $ionicLoading.hide();
								$scope._eventPhotos = data.data;
								
								if($scope._eventPhotos.data.photos.success)
								{
									$scope._noData = false;
									$scope._hasData = true;
								}
								else{
									$scope._noData = true;
									$scope._hasData = false;
								}
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                                $scope._message = err;
                                $scope._noData = true;
								$scope._hasData = false;

								//register as previous call
								$rootScope._previousAPICall = "getAllEventPhotos";

                            }
                        );
			};
			
			//moreEventPhotoActions
			$scope.moreEventPhotoActions = function()
			{

				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class="fa fa-plus-circle"></i> Upload image'},
     						],
     						titleText: "More action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
									document.getElementById('fileElem').click();
						    			return true;
						    	}	
						    }
						}
					);
			}

			$scope.imageSource = function(_photo)
			{
				return API_URL.IMAGE_URL+_photo.fileName;
			}

			$scope.uploadedFile = function(element) 
			{
				var _fileReader = new FileReader();
				_fileReader.onload = function(event) 
				{
					$scope
						.$apply
						(
							function($scope) 
							{
								$scope.files = element.files;
								 $scope.src = event.target.result ;
								 $scope.myFile = $scope.files[0];
								 var file = $scope.myFile; 
								 
								 var _eventImageData = new FormData();
								 _eventImageData.append("userId", _storedSessionUserProfile._loggedInSessionUserId);
								 _eventImageData.append("eventId", $stateParams.eventId);
								 _eventImageData.append("operationType", 'create');
								 _eventImageData.append('file', $scope.myFile);
				 
								 _contextloadingText = LOADING_TEXT.LOADING_TEXT_CREATE_EVENT;
								 
								 //loading
								 $scope._loading = 
								 {
									 _ladingText :	_contextloadingText
								 };
							 
								 //show loading
								 $ionicLoading
									 .show
									 (
										 {
				 
											 templateUrl: 'templates/loader.html',
											 scope : $scope
										   }
									   )
								 //convert to date
									 
								 //goCreateEditdeleteEvent
								 SERVICE.goCRUDService($scope, _eventImageData, API_URL.CRUD_EVENT_IMAGE)
									 .then
										 (
											 function() 
											 {
												 $ionicLoading.hide();
											 }, 
											 function(err) 
											 {
												 $ionicLoading.hide();
				 
												 //register as previous call
												 //$rootScope._previousAPICall = "CRUDEventDetails";
											 }
										 ); 
							 }
						);
				}
				_fileReader.readAsDataURL(element.files[0]);
				
			}

			$scope.goBack = function()
			{
				$state.go('app.system-events-landing', {}, {reload: true});
			};
			//CRUDProjectSuccessfull-broadcast
			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast', 
					function (event, data) 
					{
						$scope.getAllEventPhotos();
			    	}
			    );

			//doRefresh
			$scope.doRefresh = function() {
		    	$scope.getAllEventPhotos();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter', 
					function (event, data) 
					{
						$scope.getAllEventPhotos();
			    	}
			    );

			$scope
				.$on
				(
					'dataRetrivedSuccess-broadcast', 
					function (event, data) 
					{
			    		//
			    	}
				);
		}
	)

	//TrackingHoursCtrl
	.controller
	(
		'TrackingHoursCtrl', 
		function
		(
			$stateParams, $rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, STRING, PATTERN, $q, $ionicActionSheet, FONT_ICON, API_URL, $filter, APP_ALERT_FACTORY, DATE_FACTORY
		) 
		{
			$scope._fontIconConst = FONT_ICON;

			$scope._dateFactory= DATE_FACTORY;

			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_stringConst
			$scope._stringConst = STRING;

			//_userProfileData
			$scope._userProfileData = {};

			//_events
			$scope._events = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_project
			$scope._project = false;

			//_pageTitle
			$scope._pageTitle = null;

			$scope.isChecked = false;

			$scope._modalOperationType = null;

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			$scope._reportComponents = 
			{
				userId: _storedSessionUserProfile._loggedInSessionUserId,
				fromDate : new Date(),
				toDate : new Date(),
			};

			//trackingHours
			$rootScope.trackingHours = function(_segment)
			{
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				if(new Date($scope._reportComponents.fromDate) >= new Date($scope._reportComponents.toDate))
				{
					APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE, ALERT_TEXT.ALERT_TEXT_DATE_LESS);	
				}
				else
				{
					$scope._reportComponents.segment = _segment;
					$scope._reportComponents.fromDate = $filter('date')($scope._reportComponents.fromDate, "yyyy-MM-dd");
					$scope._reportComponents.toDate = $filter('date')($scope._reportComponents.toDate, "yyyy-MM-dd");
					
					//loading
					$scope._loading = 
					{
						_ladingText :	LOADING_TEXT.LOADING_TEXT_ALL_SYSTEM_EVENTS
					};
		
					//show loading
					$ionicLoading
						.show
						(
							{
								templateUrl: 'templates/loader.html',
								scope : $scope
							  }
						  )
						  
					SERVICE.goPullDataFromNetworkService($scope, $scope._reportComponents, API_URL.TRACKING_HOUR)
						.then
							(
								function(data) 
								{
									$ionicLoading.hide();
									$scope._reportData = data.data;
								}, 
								function(err) 
								{
									$ionicLoading.hide();
									$scope._message = err;
									$scope._noData = true;
									$scope._hasData = false;
	
									//register as previous call
									$rootScope._previousAPICall = "trackingHours";
	
								}
							);
				}
			};
			
			//moreEventPhotoActions
			$scope.moreEventReoirtActions = function()
			{

				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class="fa fa-plus-circle"></i> Tracking number of hours per volunteer'},
								{ text: '<i class="fa fa-plus-circle"></i> Tracking number of hours per event'},
     						],
     						titleText: "More action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
										$rootScope.trackingHours('USER');
										return true;
									case 1 :
										$rootScope.trackingHours('EVENT');
						    			return true;
						    	}	
						    }
						}
					);
			}

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			$scope
				.$on
				(
					'$ionicView.afterEnter', 
					function (event, data) 
					{
						//
			    	}
			    );

			$scope
				.$on
				(
					'dataRetrivedSuccess-broadcast', 
					function (event, data) 
					{
			    		//
			    	}
				);
		}
	)

	//RegistededUsersCtrl
	.controller
	(
		'RegistededUsersCtrl', 
		function
		(
			$stateParams, $rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, STRING, PATTERN, $q, $ionicActionSheet, FONT_ICON, API_URL, $http, $cordovaFileTransfer
		) 
		{
			$scope._fontIconConst = FONT_ICON;

			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_stringConst
			$scope._stringConst = STRING;

			//_userProfileData
			$scope._userProfileData = {};

			//_events
			$scope._events = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_project
			$scope._project = false;

			//_pageTitle
			$scope._pageTitle = null;

			$scope.isChecked = false;

			$scope._modalOperationType = null;

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getAllRegistededUsers
			$rootScope.getAllRegistededUsers = function()
			{
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData = 
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					eventId : $stateParams.eventId,
				};

				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_ALL_SYSTEM_EVENTS
				};
	
				//show loading
				$ionicLoading
					.show
					(
						{
							templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				)
	  				
				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.REGISTEDED_USERS)
					.then
                        (
                            function(data) 
                            {
                                $ionicLoading.hide();
								$scope._users = data.data;
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                                $scope._message = err;
                                $scope._noData = true;
								$scope._hasData = false;

								//register as previous call
								$rootScope._previousAPICall = "getAllRegistededUsers";

                            }
                        );
			};
			
			//moreUserActions
			$scope.moreUserActions = function()
			{

				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class="fa fa-plus-circle"></i> Upload user from csv file'},
     						],
     						titleText: "More action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
									document.getElementById('fileElem').click();
						    			return true;
						    	}	
						    }
						}
					);
			}

			$scope.imageSource = function(_photo)
			{
				return API_URL.IMAGE_URL+_photo.fileName;
			}

			$scope.uploadedFile = function(element) 
			{
				var _fileReader = new FileReader();
				_fileReader.onload = function(event) 
				{
					$scope
						.$apply
						(
							function($scope) 
							{
								$scope.files = element.files;
								 $scope.src = event.target.result ;
								 $scope.myFile = $scope.files[0];
								 var file = $scope.myFile; 
								 
								 var _eventImageData = new FormData();
								 _eventImageData.append("userId", _storedSessionUserProfile._loggedInSessionUserId);
								 _eventImageData.append('file', $scope.myFile);
				 
								 _contextloadingText = LOADING_TEXT.LOADING_TEXT_CREATE_EVENT;
								 
								 //loading
								 $scope._loading = 
								 {
									 _ladingText :	_contextloadingText
								 };
							 
								 //show loading
								 $ionicLoading
									 .show
									 (
										 {
				 
											 templateUrl: 'templates/loader.html',
											 scope : $scope
										   }
									   )
								 //convert to date
									 
								 //goCreateEditdeleteEvent
								 SERVICE.goPullDataFromNetworkService($scope, _eventImageData, API_URL.CRUD_UPLOAD_USER)
									 .then
										 (
											function(data) 
											{
												$ionicLoading.hide();
												$scope._userUploadMessage = data.data;

												$scope.getAllRegistededUsers();
											}, 
											function(err) 
											{
												$ionicLoading.hide();
												
												//register as previous call
												//$rootScope._previousAPICall = "getAllRegistededUsers";
				
											}
										 ); 
							 }
						);
				}
				_fileReader.readAsDataURL(element.files[0]);
				
			  }

			//CRUDProjectSuccessfull-broadcast
			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast', 
					function (event, data) 
					{
						//
			    	}
			    );

			//doRefresh
			$scope.doRefresh = function() {
		    	$scope.getAllRegistededUsers();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter', 
					function (event, data) 
					{
						$scope.getAllRegistededUsers();
			    	}
			    );

			$scope
				.$on
				(
					'dataRetrivedSuccess-broadcast', 
					function (event, data) 
					{
			    		//$scope.getAllRegistededUsers();
						//console.log(JSON.stringify(data));
			    	}
				);
		}
	)

	//VolunteersSpeakCtrl
	.controller
	(
		'VolunteersSpeakCtrl',
		function
		(
			$rootScope, $scope, API_URL, SERVICE, LOADING_TEXT, $ionicLoading, $ionicSideMenuDelegate, $ionicNavBarDelegate
		)
		{
			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;
			
			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//getAllUserFeedbacks
			$rootScope.getAllUserFeedbacks = function()
			{
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData = 
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId
				};

				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_ALL_SYSTEM_EVENTS
				};
	
				//show loading
				$ionicLoading
					.show
					(
						{
							templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				)
	  				
				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.USER_FEEDBACKS)
					.then
                        (
                            function(data) 
                            {
                                $ionicLoading.hide();
								$scope._userFeedbacks = data.data;
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                                $scope._message = err;
                                $scope._noData = true;
								$scope._hasData = false;

								//register as previous call
								$rootScope._previousAPICall = "getAllUserFeedbacks";

                            }
                        );
			};

			//doRefresh
			$scope.doRefresh = function() {
		    	$scope.getAllUserFeedbacks();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter', 
					function (event, data) 
					{
						$scope.getAllUserFeedbacks();
			    	}
			    );
			$scope
				.$on
				(
					'dataRetrivedSuccess-broadcast', 
					function (event, data) 
					{
						//
					}
				);
		}
	)

	//CorporateDetailsCtrl
	.controller
	(
		'CorporateDetailsCtrl',
		function
		(
			$rootScope, $scope, API_URL, SERVICE, LOADING_TEXT, $ionicLoading, $ionicSideMenuDelegate, $ionicNavBarDelegate
		)
		{
			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;
			
			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//getAllCorporateDetails
			$rootScope.getAllCorporateDetails = function()
			{
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData = 
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId
				};

				//loading
				$scope._loading = 
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_ALL_SYSTEM_EVENTS
				};
	
				//show loading
				$ionicLoading
					.show
					(
						{
							templateUrl: 'templates/loader.html',
	    					scope : $scope
	  					}
	  				)
	  				
				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.CORPORATE_DETAILS)
					.then
                        (
                            function(data) 
                            {
                                $ionicLoading.hide();
								$scope._corporateDetails = data.data;
                            }, 
                            function(err) 
                            {
                                $ionicLoading.hide();
                                $scope._message = err;
                                $scope._noData = true;
								$scope._hasData = false;

								//register as previous call
								$rootScope._previousAPICall = "getAllCorporateDetails";

                            }
                        );
			};

			//doRefresh
			$scope.doRefresh = function() {
		    	$scope.getAllCorporateDetails();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter', 
					function (event, data) 
					{
						$scope.getAllCorporateDetails();
			    	}
			    );
			$scope
				.$on
				(
					'dataRetrivedSuccess-broadcast', 
					function (event, data) 
					{
						//
					}
				);
		}
	)

	
	//test
	.controller
	(
		'', 
		function
		(
			$scope, $stateParams
		) 
		{
			//
		}
	);

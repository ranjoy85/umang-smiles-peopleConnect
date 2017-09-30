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
		['$scope', '$state', 'SERVICE', '$cordovaPush', '$cordovaDialogs', '$cordovaMedia', '$cordovaToast', '$ionicPlatform', '$q', '$ionicModal', function
		(
			$scope, $state, SERVICE, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, $ionicPlatform, $q, $ionicModal
		)
		{
			//SERVICE.goTestServer();

			if(ionic.Platform.isAndroid() || ionic.Platform.isIOS())
           	{
            	var _isSessionUserPresent = SERVICE.isSessionUserPresent();

                if(_isSessionUserPresent)
				{
					$state.go('app.my-events-landing', {}, {reload: true});
				}
           	}

            //$ionicView.afterEnter
			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						var _isSessionUserPresent = SERVICE.isSessionUserPresent();

			                if(!_isSessionUserPresent)
							{
								//getStarted
								//$scope.getStarted();
							}
			    	}
			    );

            //getStarted
			$scope.getStarted = function()
			{
				//create-edit-sprint ionicModal
                $ionicModal.fromTemplateUrl
                (
                    'templates/get-started.html',
                    {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }
                ).then
                (
                    function(modal)
                    {
                    	$scope.modal = modal;
                        $scope.modal.show();
                    }
                );
			};

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
		}]
	)

	//SignUpCtrl
	.controller
	(
		'SignUpCtrl',
		['$scope', '$ionicPopup', 'PATTERN', 'LOADING_TEXT', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', '$state', '$ionicLoading', 'SERVICE', '$q', '$ionicModal', '$filter', function
		(
			$scope, $ionicPopup, PATTERN, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $state, $ionicLoading, SERVICE, $q, $ionicModal, $filter
		)
		{
			$scope._signUpFormData = {};

			//clearForm
			$scope.clearForm = function()
			{
				$scope._signUpFormData =
				{
					userEmail: '',
					userPassword : '',
					userFirstName : '',
					userLastName : '',
					userDob : new Date()
				};
			};

			//set pattern
			$scope._pattern =
			{
				_namePattern : PATTERN.NAME_PATTERN,
				_passwordPattern : PATTERN.PASSWORD_PATTERN
			};

			//termsAndConditions
			$scope.termsAndConditions = function()
			{
				var q = $q.defer();
                var _modalReady = false;
                //create-edit-sprint ionicModal
                $ionicModal.fromTemplateUrl
                (
                    'templates/terms-and-conditions.html',
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
                            $scope.modal.show();
                        }
                        else
                        {
                           q.reject();
                        }
                    }
                );

                return q.promise;
			}

			//cancelSignUp
			$scope.cancelSignUp = function()
			{
				//if text fields are filled up
				if($scope._signUpFormData.userEmail || $scope._signUpFormData.userPassword || $scope._signUpFormData.userFirstName || $scope._signUpFormData.userLastName)
				{
					$ionicPopup
						.alert
						(
							{
								title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
								template: ALERT_TEXT.ALERT_TEXT_EXIT_SIGN_UP,
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

			//signUp
			$scope.signUp = function(_signUpFormDataForm)
			{
				$scope._signUpFormData.userDob = $filter('date')($scope._signUpFormData.userDob, "yyyy-MM-dd");
				
				//alert(JSON.stringify($scope._signUpFormData));
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_SIGNING_UP
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

				if(_signUpFormDataForm.$valid)
				{
					SERVICE.goSignUp($scope, $scope._signUpFormData)
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

			//activateUserAccount
			$scope.activateUserAccount = function()
			{
				$state.go('user-account-activation', {}, {reload: true});
			};

			//$ionicView.afterEnter
			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						//clearForm
						$scope.clearForm();
			    	}
			    );

			//signInSuccessfull-broadcast
			$scope
				.$on
				(
					'signUpSuccessfull-broadcast',
					function (event, data)
					{
						$scope.clearForm();
				      	$state.go('user-account-activation', {}, {reload: true});
				      	$ionicLoading.hide();
			    	}
			    );

		}]
	)

	//SignInCtrl
	.controller
	(
		'SignInCtrl',
		['$scope', '$http', '$ionicLoading', 'SERVICE', '$ionicPopup', 'PATTERN', '$state', '$ionicHistory', 'LOADING_TEXT', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', function
		(
			$scope, $http, $ionicLoading, SERVICE, $ionicPopup, PATTERN, $state, $ionicHistory, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON
		)
		{
			var _storedSessionUserCredientils =null;
			$scope._authorizationFormData = {};

			//set pattern
			$scope._pattern =
			{
				_passwordPattern : PATTERN.PASSWORD_PATTERN
			};

			//loadData
			$scope.loadData = function()
			{
				_storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();

				if(_storedSessionUserCredientils._loggedInSessionId)
				{
					$state.go('app.my-events-landing', {}, {reload: true});
				}
				else
				{
					//load page with session user if present
					if(_storedSessionUserCredientils)
					{
						$scope._authorizationFormData =
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
						$scope._authorizationFormData =
						{
							userEmail: '',
							userPassword : '',
							loggedInSessionId : ''
						};
					}
				}
			};

			//
			$scope.goForgotPassword = function()
			{
				$state.go('reset-password-code', {}, {reload: true});
			};

			//saveAccessToken
			$scope.saveAccessToken = function(loggedInSessionId) {
				localStorage.removeItem('loggedInSessionId');
				window.localStorage['loggedInSessionId'] = loggedInSessionId;
			};

			//activateUserAccount
			$scope.activateUserAccount = function()
			{
				$state.go('user-account-activation', {}, {reload: true});
			};

			//cancelSignIn
			$scope.cancelSignIn = function()
			{
				//if text fields are filled up
				if($scope._authorizationFormData.userEmail || $scope._authorizationFormData.userPassword)
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

				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_FETCHING_USER
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


			//facebook
			$scope.goToFBSignIn = function () 
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_FETCHING_USER
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

				SERVICE.goFBSignIn($scope)
					.then
                        (
                            function(data)
                            {
                            	//get user detaild form facebook
                                SERVICE.getFBUserDetails($scope)
									.then
				                        (
				                            function(facebookUserData)
				                            {
												console.log(JSON.stringify(facebookUserData));
				                            	//sign up facebook user
				                            	$scope._signUpFormData =
												{
													userEmail: facebookUserData.email,
													userFirstName : facebookUserData.first_name,
													userLastName : facebookUserData.last_name,
													thirdPartyUserId : facebookUserData.id,
													userPassword : 'fb'+facebookUserData.id,
													userType : 'FB'
												};
				                            	
				                            	SERVICE.goThirdPartyUserSignUp($scope, $scope._signUpFormData)
													.then
								                        (
								                            function()
								                            {
								                                $scope._authorizationFormData =
																{
																	userEmail: facebookUserData.email,
																	userPassword : 'fb'+facebookUserData.id,
																	userLoginType :'FRESH_LOGIN'
																};

								                                SERVICE.goSignIn($scope, $scope._authorizationFormData)
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
								                            },
								                            function(err)
								                            {
								                                $ionicLoading.hide();
								                            }
								                        );
				                            },
				                            function(err)
				                            {
				                                $ionicLoading.hide();
				                            }
				                        );
                            },
                            function(err)
                            {
                                $ionicLoading.hide();
                            }
                        );

				// _goFBSignIn
				// facebookConnectPlugin.browserInit('656009051221496');
			 //    facebookConnectPlugin.login(['public_profile', 'email'], function (data) 
			 //    {
			 //        console.log(JSON.stringify(data));
			 //        $scope.getData();
			 //    }, function (data) {
			 //        console.log(JSON.stringify(data));
			 //    });
			};

			// $scope.getData = function () {
			//     facebookConnectPlugin.api('/me?fields=id,email,first_name,last_name,gender,age_range, birthday, location', ['public_profile'], function (data) {
			//         console.log(JSON.stringify(data));
			//         $scope.$apply(function () {
			//             $scope.fb_data = data;
			//         });
			//     });
			// };

			$scope.goToFBLoginStatus = function ()
			{
				facebookConnectPlugin.browserInit('656009051221496');
				facebookConnectPlugin
					.getLoginStatus
					(
						function (response)
						{
							console.log(JSON.stringify(response));
							if (response.status === 'connected')
							{
								console.log('User Already LoggedIn');
								//self.getData();
							}
							else
							{
								console.log('User Not Logged In');
							}
						},
						function ()
						{
							console.log('Get Login Status Error');
						}
					);
			};

			
			$scope.goToFBSignOut = function()
			{
				FB.logout(function(response) {
				console.log('You are logged out!');
			});

			};

			//signIn
			$scope.signIn = function(_authorizationFormDataForm)
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

				if(_authorizationFormDataForm.$valid)
				{
					SERVICE.goSignIn($scope, $scope._authorizationFormData)
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
						$ionicLoading.hide();
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
			    		$state.go('app.my-events-landing', {}, {reload: true});
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
		}]
	)

	//UserActivationCtrl
	.controller
	(
		'UserAccountActivationCtrl',
		['$scope', '$ionicPopup', 'PATTERN', 'LOADING_TEXT', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', '$state', '$ionicLoading', 'SERVICE', '$ionicHistory', function
		(
			$scope, $ionicPopup, PATTERN, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $state, $ionicLoading, SERVICE, $ionicHistory
		)
		{
			//getStoredSessionUserCredientils
			var _storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
			$scope._accountActivationFormData = {};

			//load page with session user if present
			if(_storedSessionUserCredientils)
			{
				$scope._accountActivationFormData =
				{
					userEmail: _storedSessionUserCredientils._loggedInSessionUserEmail
				};
			}
			//clear fields
			else
			{
				//_accountActivationFormData
				$scope._accountActivationFormData =
				{
					userEmail: ''
				};

			}

			//set pattern
			$scope._pattern =
			{
				_passwordPattern : PATTERN.PASSWORD_PATTERN,
				_verificationCodePattern : PATTERN.VERIFICATION_CODE_PATTERN
			};

			//goToSignIn
			$scope.goToSignIn = function()
			{
				$state.go('sign-in', {}, {reload: true});
			};

			//cancelUserAccountVerification
			$scope.cancelUserAccountVerification = function()
			{
				//if text fields are filled up
				if($scope._accountActivationFormData.userEmail)
				{
					$ionicPopup
						.alert
						(
							{
								title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
								template: ALERT_TEXT.ALERT_TEXT_EXIT_USER_ACTIVATION,
								scope: $scope,
								buttons:
								[
							   		{
							   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
							   			type: 'alert-button-blue',
							   			onTap: function()
							   			{
							   				$ionicHistory.goBack();
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
					$ionicHistory.goBack();
				}

			};

			//userAccountVerification
			$scope.userAccountVerification = function(_accountActivationForm)
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_ACTIVATIONG_YOUR_ACCOUNT
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

				if(_accountActivationForm.$valid)
				{
					SERVICE.goActivateUserAccount($scope, $scope._accountActivationFormData)
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

			//resendActivationCode
			$scope.resendActivationCode = function(_accountActivationForm)
			{
				if($scope._accountActivationFormData.userEmail == null)
				{
					$ionicPopup
                        .alert
                        (
                            {
                                title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
                                template: ALERT_TEXT.ALERT_TEXT_EMAIL_REQUIRED,
                                buttons:
                                [
                                    {
                                        text: ALERT_BUTTON.ALERT_BUTTON_OK ,
                                        type: 'alert-button-blue',
                                        onTap: function()
                                        {
                                            //
                                        }
                                    }
                                ]
                            }
                        );
				}
				else
				{
					$scope._loading =
					{
						_ladingText :	LOADING_TEXT.LOADING_TEXT_SENDING_ACTIVATION_CODE
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

		  			//goResendUserAccountActivationCode
		  			SERVICE.goResendUserAccountActivationCode($scope, $scope._accountActivationFormData)
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

			//goToSignIn-broadcast
			$scope
				.$on
				(
					'goToSignIn-broadcast',
					function (event, data)
					{
						$ionicLoading.hide();
			    		$state.go('sign-in', {}, {reload: true});
			    	}
			    );

		}]
	)

	//ResetPasswordCodeCtrl
	.controller
	(
		'ResetPasswordCodeCtrl',
		['$scope', '$ionicPopup', 'PATTERN', 'LOADING_TEXT', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', '$state', '$ionicLoading', 'SERVICE', '$ionicHistory', function
		(
			$scope, $ionicPopup, PATTERN, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $state, $ionicLoading, SERVICE, $ionicHistory
		)
		{
			//getStoredSessionUserCredientils
			var _storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
			$scope._accountActivationFormData = {};

			//load page with session user if present
			if(_storedSessionUserCredientils)
			{
				$scope._resetPasswordCodeFormData =
				{
					userEmail: _storedSessionUserCredientils._loggedInSessionUserEmail
				};
			}
			//clear fields
			else
			{
				//_resetPasswordCodeFormData
				$scope._resetPasswordCodeFormData =
				{
					userEmail: ''
				};

			}

			//cancelResetPasswordCodeForm
			$scope.cancelResetPasswordCodeForm = function()
			{
				//if text fields are filled up
				if($scope._resetPasswordCodeFormData.userEmail)
				{
					$ionicPopup
						.alert
						(
							{
								title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
								template: ALERT_TEXT.ALERT_TEXT_PASSWORD_RESET,
								scope: $scope,
								buttons:
								[
							   		{
							   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
							   			type: 'alert-button-blue',
							   			onTap: function()
							   			{
							   				$ionicHistory.goBack();
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
					$ionicHistory.goBack();
				}

			};

			//resetPasswordCode
			$scope.resetPasswordCode = function(_resetPasswordCodeForm)
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_SENDING_RESET_PASSWORD_CODE
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

				if(_resetPasswordCodeForm.$valid)
				{
					SERVICE.goPasswordResetCode($scope, $scope._resetPasswordCodeFormData)
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

			//goUpdatePassword
			$scope.goUpdatePassword = function()
			{
				$state.go('update-password', {}, {reload: true});
				$ionicLoading.hide();
			};

			//goUpdatePassword-broadcast
			$scope
				.$on
				(
					'goUpdatePassword-broadcast',
					function (event, data)
					{
			    		$state.go('update-password', {}, {reload: true});
			    	}
			    );
		}]
	)

	//UpdatePasswordCtrl
	.controller
	(
		'UpdatePasswordCtrl',
		['$scope', '$ionicPopup', 'PATTERN', 'LOADING_TEXT', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', '$state', '$ionicLoading', 'SERVICE', '$ionicHistory', function
		(
			$scope, $ionicPopup, PATTERN, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $state, $ionicLoading, SERVICE, $ionicHistory
		)
		{
			//getStoredSessionUserCredientils
			var _storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
			$scope._accountActivationFormData = {};

			//load page with session user if present
			if(_storedSessionUserCredientils)
			{
				$scope._updatePasswordFormData =
				{
					userEmail: _storedSessionUserCredientils._loggedInSessionUserEmail,
					userPassword : '',
					userPasswordResetCode : ''
				};
			}
			//clear fields
			else
			{
				//_updatePasswordFormData
				$scope._updatePasswordFormData =
				{
					userEmail: '',
					userPassword : '',
					userPasswordResetCode : ''
				};

			}

			//set pattern
			$scope._pattern =
			{
				_passwordResetCodePattern : PATTERN.RESET_PASSWORD_CODE_PATTERN,
				_passwordPattern : PATTERN.PASSWORD_PATTERN
			};

			//cancelResetPasswordCodeForm
			$scope.cancelUpdatePasswordForm = function()
			{
				//if text fields are filled up
				if($scope._updatePasswordFormData.userEmail)
				{
					$ionicPopup
						.alert
						(
							{
								title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
								template: ALERT_TEXT.ALERT_TEXT_PASSWORD_UPDATE,
								scope: $scope,
								buttons:
								[
							   		{
							   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
							   			type: 'alert-button-blue',
							   			onTap: function()
							   			{
							   				$ionicHistory.goBack();
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
					$ionicHistory.goBack();
				}

			};

			//resetPasswordCode
			$scope.updatePassword = function(_resetPasswordCodeForm)
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_UPDATE_PASSWORD
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

				if(_resetPasswordCodeForm.$valid)
				{
					SERVICE.goUpdatePassword($scope, $scope._updatePasswordFormData)
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

			//goToSignIn-broadcast
			$scope
				.$on
				(
					'goToSignIn-broadcast',
					function (event, data)
					{
			    		$state.go('sign-in', {}, {reload: true});
			    		$ionicLoading.hide();
			    	}
			    );

			//goUpdatePassword
			$scope.goUpdatePassword = function()
			{
				$state.go('update-password', {}, {reload: true});
			};
		}]
	)

	//AppCtrl
	.controller
	(
		'AppCtrl',
		['$rootScope', '$scope', '$state', 'SERVICE', '$ionicPopup', '$ionicLoading', 'LOADING_TEXT', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', '$ionicSideMenuDelegate', '$ionicPopup', 'FONT_ICON', function
		(
			$rootScope, $scope, $state, SERVICE, $ionicPopup, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicSideMenuDelegate, $ionicPopup, FONT_ICON
		)
		{
			$scope._fontIconConst = FONT_ICON;
			
			$rootScope.$ionicGoBack = function() {
			    //
			  };

			$scope._sessionData = {};

			//_updateMenuNotificaitonNumber
			$rootScope._updateMenuNotificaitonNumber =
			{
				eventsUserIn : 0,
				eventJoinRequest : 0 ,
				eventAdminRequest : 0,
				userHistory : 0
			};

			//loadProfileData
			$scope.loadProfileData = function()
			{
				var _storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();
				$scope._sessionData =
				{
					userId: _storedSessionUserCredientils._loggedInSessionUserId,
					userEmail : _storedSessionUserCredientils._loggedInSessionUserEmail,
	                userFirstName : _storedSessionUserCredientils._loggedInSessionUserFirstName,
	                userLastName : _storedSessionUserCredientils._loggedInSessionUserLastName,
	                userPassword : '',
				};

				if(_storedSessionUserCredientils._loggedInSessionThirdPartyUserId != 'NONE')
				{
					$scope._sessionThirdPartyUserData = 
					{
						userPicture : "http://graph.facebook.com/" + _storedSessionUserCredientils._loggedInSessionThirdPartyUserId + "/picture?type=large",
		                thirdPartyUserId : _storedSessionUserCredientils._loggedInSessionThirdPartyUserId
					}
				}

				else
				{
					$scope._sessionThirdPartyUserData = 
					{
						userPicture : '',
		                thirdPartyUserId : _storedSessionUserCredientils._loggedInSessionThirdPartyUserId
					}
				}
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

						$scope._sessionData =
						{
							userId: _storedSessionUserCredientils._loggedInSessionUserId,
							userEmail : _storedSessionUserCredientils._loggedInSessionUserEmail,
			                userFirstName : _storedSessionUserCredientils._loggedInSessionUserFirstName,
			                userLastName : _storedSessionUserCredientils._loggedInSessionUserLastName,
			                userPassword : '',
			                userLoginType :'IN_APP_LOGIN'

						};


						//if facebook user then get in to login flow and do not pop asking user password
						if(_storedSessionUserCredientils._loggedInSessionUserType == "FACEBOOK")
						{
							$scope.signIn();
						}
						else
						{
							$ionicPopup
								.prompt
								(
									{
										title: ALERT_TITLE.ALERT_TITLE_OOPS,
										template: ALERT_TEXT.ALERT_TEXT_SESSION_WRONG+'<br><input type="password" ng-model="_sessionData.userPassword" class="item-input-alert">',
										scope: $scope,
										buttons:
										[
									   		{
									   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
									   			type: 'alert-button-blue',
									   			onTap: function()
									   			{
									   				$scope.signIn();
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
						}
						

			    	}
			    );

			//signIn
			$scope.signIn = function()
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_SIGNING_IN
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
	  			_storedSessionUserCredientils = SERVICE.getStoredSessionUserCredientils();

	  			//if facebook user, then get valid user details form cacebook and then proceed further
				if(_storedSessionUserCredientils._loggedInSessionUserType == "FACEBOOK")
				{
					SERVICE.goFBSignIn($scope)
						.then
	                        (
	                            function(data)
	                            {
									console.log('a');

									//get user detaild form facebook
	                                SERVICE.getFBUserDetails($scope, data)
										.then
					                        (
					                            function(facebookUserData)
					                            {
													console.log(JSON.stringify(facebookUserData));
					                            	$scope._sessionData.userPassword = 'fb'+facebookUserData.id;
					                                SERVICE.goSignIn($scope, $scope._sessionData)
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
					                            },
					                            function(err)
					                            {
					                                $ionicLoading.hide();
					                            }
					                        );
	                            },
	                            function(err)
	                            {
	                                $ionicLoading.hide();
	                            }
	                        );	
				}
				else
				{
					SERVICE.goSignIn($scope, $scope._sessionData)
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
						$ionicLoading.hide();
						$scope.loadProfileData();
						$rootScope[$rootScope._previousAPICall]();
			    	}
			    );

		}]
	)

	//ProfileCtrl
	.controller
	(
		'ProfileCtrl',
		['$scope', '$ionicModal', '$timeout', '$ionicPopup', 'SERVICE', '$state', '$ionicNavBarDelegate', '$ionicSideMenuDelegate', 'APP_ALERT_FACTORY', 'ALERT_TITLE', 'ALERT_TEXT', '$http', function
		(
			$scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicNavBarDelegate, $ionicSideMenuDelegate, APP_ALERT_FACTORY, ALERT_TITLE, ALERT_TEXT, $http
		)
		{
			//hide back button
			$ionicNavBarDelegate.showBackButton(true);

			$scope._userProfileData = {};

			$scope._userProfileData =
			{
				userId : '',
				userEmail : '',
                userFirstName : '',
				userLastName : '',
				userDob : '',
                userType: '',
                userPicture: '',
                thirdPartyUserId: ''
			};

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//loadProfilePage
			$scope.loadProfilePage = function()
			{
				//getStoredSessionUserCredientils
				var _storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();
				$scope._userProfileData = {};

				$scope._userProfileData =
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					userEmail : _storedSessionUserProfile._loggedInSessionUserEmail,
	                userFirstName : _storedSessionUserProfile._loggedInSessionUserFirstName,
					userLastName : _storedSessionUserProfile._loggedInSessionUserLastName,
					userDob : _storedSessionUserProfile._loggedInSessionUserDob,
	                userType : _storedSessionUserProfile._loggedInSessionUserType,
	                userPicture : "http://graph.facebook.com/" + _storedSessionUserProfile._loggedInSessionThirdPartyUserId + "/picture?type=large",
	                thirdPartyUserId : _storedSessionUserProfile._loggedInSessionThirdPartyUserId
				};
			};

			//goEditProfile
			$scope.goEditProfile = function()
			{
				if($scope._userProfileData.userType == "FACEBOOK")
				{
					APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_MODEFY_PROFILE_NOT_ALLOWED);
				}
				else
				{
					$state.go('app.edit-profile', {}, {reload: true});
				}
			};

			//$ionicView.afterEnter
			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						$scope.loadProfilePage();
			    	}
			    );

			//$ionicView.afterEnter
			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						//loadProfilePage
						$scope.loadProfilePage();
			    	}
			    );

		}]
	)

	//AboutCtrl
	.controller
	(
		'AboutCtrl',
		['$scope', '$ionicNavBarDelegate', '$ionicSideMenuDelegate', '$ionicModal', '$q', function
		(
			$scope, $ionicNavBarDelegate, $ionicSideMenuDelegate, $ionicModal, $q
		)
		{
			//hide back button
			$ionicNavBarDelegate.showBackButton(true);

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//termsAndConditions
			$scope.termsAndConditions = function()
			{
				var q = $q.defer();
                var _modalReady = false;
                //create-edit-sprint ionicModal
                $ionicModal.fromTemplateUrl
                (
                    'templates/terms-and-conditions.html',
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
                            $scope.modal.show();
                        }
                        else
                        {
                           q.reject();
                        }
                    }
                );

                return q.promise;
			}

			//privacyPolicy
			$scope.privacyPolicy = function()
			{
				var q = $q.defer();
                var _modalReady = false;
                //create-edit-sprint ionicModal
                $ionicModal.fromTemplateUrl
                (
                    'templates/privacy-policy.html',
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
                            $scope.modal.show();
                        }
                        else
                        {
                           q.reject();
                        }
                    }
                );

                return q.promise;
			};
		}]
	)

	//EditProfileCtrl
	.controller
	(
		'EditProfileCtrl',
		function
		(
			$rootScope, $scope, $ionicNavBarDelegate, $ionicPopup, PATTERN, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $state, $ionicLoading, SERVICE, API_URL, $filter
		)
		{
			//hide back button
			$ionicNavBarDelegate.showBackButton(false);

			$scope._updateProfileFormData = {};

			var _storedSessionUserProfile = null;

			//loadProfilePage
			$scope.loadProfilePage = function()
			{
				var _storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._updateProfileFormData =
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					userEmail : _storedSessionUserProfile._loggedInSessionUserEmail,
					userPassword : _storedSessionUserProfile._loggedInSessionUserPassword,
	                userFirstName : _storedSessionUserProfile._loggedInSessionUserFirstName,
					userLastName : _storedSessionUserProfile._loggedInSessionUserLastName,
					userDob : new Date(_storedSessionUserProfile._loggedInSessionUserDob),
				};
			};

			//set pattern
			$scope._pattern =
			{
				_namePattern : PATTERN.NAME_PATTERN,
				_passwordPattern : PATTERN.PASSWORD_PATTERN
			};

			//goBack
			$scope.goBack = function()
			{
				$state.go('app.profile', {}, {reload: true});
			};

			//cancelProfileUpdate
			$scope.cancelProfileUpdate = function()
			{
				//if text fields are filled up
				if($scope._updateProfileFormData.userEmail || $scope._updateProfileFormData.userPassword || $scope._updateProfileFormData.userFirstName || $scope._updateProfileFormData.userLastName)
				{
					$ionicPopup
						.alert
						(
							{
								title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
								template: ALERT_TEXT.ALERT_TEXT_EXIT_SIGN_UP,
								scope: $scope,
								buttons:
								[
							   		{
							   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
							   			type: 'alert-button-blue',
							   			onTap: function()
							   			{
							   				$state.go('app.profile', {}, {reload: true});
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
					$state.go('app.profile', {}, {reload: true});
				}

			};

			//updateProfile
			$rootScope.updateProfile = function(_updateProfileForm)
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_UPDATE_PROFILE
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

				if(_updateProfileForm.$valid)
				{
					$scope._updateProfileFormData.userDob = $filter('date')($scope._updateProfileFormData.userDob, "yyyy-MM-dd");
					
					SERVICE.goCRUDService($scope, $scope._updateProfileFormData, API_URL.USER_PROFILE_UPDATE)
						.then
                            (
                                function()
                                {
                                    $ionicLoading.hide();
                                },
                                function(err)
                                {
                                    $ionicLoading.hide();

                                    $rootScope._previousAPICall = "updateProfile";
                                }
                            );
				}
			};

			//userProfileUpdatedSuccess-broadcast
			$scope
				.$on
				(
					'userProfileUpdatedSuccess-broadcast',
					function (event, data)
					{
						$state.go('app.profile', {}, {reload: true});

						//updateUserProfileInMenu-broadcast
						$rootScope
							.$broadcast
							(
								'updateUserProfileInMenu-broadcast',
								function (event, data)
								{
									$ionicLoading.hide();
						    	}
						    );
			    	}
			    );

			//$ionicView.afterEnter
			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						//loadProfilePage
						$scope.loadProfilePage();
			    	}
			    );

				//userProfileUpdatedSuccess-broadcast
				$scope
				.$on
				(
					'CRUDSuccessfull-broadcast',
					function (event, data)
					{
						SERVICE.updateSessionUserProfile($scope._updateProfileFormData)
							.then
								(
									function()
									{
										//
									},
									function(err)
									{
										//
									}
								);
					}
				);
				
				
		}
	)

	//MyEventsLandingCtrl
	.controller
	(
		'MyEventsLandingCtrl',
		function
		(
			$rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, $ionicNavBarDelegate, $ionicScrollDelegate, PATTERN, $ionicSideMenuDelegate, $q, API_URL, $stateParams, FONT_ICON
		)
		{
			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_userProfileData
			$scope._userProfileData = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_pageTitle
			$scope._pageTitle = null;

			$scope._modalOperationType = null;

			$scope._fontIconConst = FONT_ICON;

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//set pattern
			$scope._pattern = 
			{
				_namePattern : PATTERN.NAME_PATTERN,
				_descriptionPattern : PATTERN.DESCRIPTION_PATTERN
			};
			
			//getAllEventsForUser
			$rootScope.getAllEventsForUser = function()
			{
				//getStoredSessionUserCredientils
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData =
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId
				};

				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_FETCHING_USER
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

				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.USER_EVENTS)
					.then
                        (
                            function(data)
                            {
                                $ionicLoading.hide();
								$scope._events = data.data;
								console.log(JSON.stringify($scope._events));
								
								if($scope._events.success)
                                {
                                	$scope._noData = false;
									$scope._hasData = true;

									//update notification
                                }
                                else
                                {
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

								$rootScope._previousAPICall = "getAllEventsForUser";
                            }
                        );
			};

			//getUserStoryDetails
            $scope.getEventDetails = function(_data)
            {
                $state.go('app.event-details', {"eventId":_data.eventId}, {reload: true});
			};
			
			//doRefresh
			$scope.doRefresh = function() {
		    	$rootScope.getAllEventsForUser();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						$rootScope.getAllEventsForUser();
			    	}
				);
			
			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						$rootScope.getAllEventsForUser();
			    	}
				);
			
			$scope
				.$on
				(
					'EventOperationSuccessfull-broadcast',
					function (event, data)
					{
						$rootScope.getAllEventsForUser();
			    	}
			    );

			
			//loadProfilePage
			//$scope.loadProfilePage();
		}
	)

	//EventDetailsCtrl
	.controller
	(
		'EventDetailsCtrl',
		function
		(
			$rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, $ionicNavBarDelegate, $ionicScrollDelegate, PATTERN, $ionicSideMenuDelegate, $q, API_URL, $stateParams, FONT_ICON, $ionicActionSheet, ALERT_TEXT, ALERT_TITLE, APP_ALERT_FACTORY, $cordovaBarcodeScanner, DATE_TIME_FACTORY
		)
		{
			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_userProfileData
			$scope._userProfileData = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_pageTitle
			$scope._pageTitle = null;

			$scope._modalOperationType = null;

			$scope._eventId = $stateParams.eventId;

			$scope._userId = null; 

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			$scope._fontIconConst = FONT_ICON;

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();
			
			//getEventDetails
			$rootScope.getEventDetails = function()
			{
				//getStoredSessionUserCredientils
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData =
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					eventId : $scope._eventId
				};

				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_FETCHING_USER
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

				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.EVENT_DETAILS)
					.then
                        (
                            function(data)
                            {
                                $ionicLoading.hide();
								$scope._eventDetails = data.data;
								
								$scope.userAttendence = attendenceDetails();;
								
								console.log(JSON.stringify($scope._eventDetails));

								if($scope._eventDetails.success)
                                {
                                	$scope._noData = false;
									$scope._hasData = true;
                                }
                                else
                                {
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

								$rootScope._previousAPICall = "getEventDetails";
                            }
                        );
			};

			$scope.mediaCoverage = function(_event, _mediaType)
			{
				var _url = null;
				if(_mediaType == 'FB')
				{
					_url = _event.data.eventFacebookLink;
				}
				else if(_mediaType == 'TW')
				{
					_url = _event.data.eventTwitterLink;
				}
				else if(_mediaType == 'YT')
				{
					_url = _event.data.eventYoutubeLink;
				}
				else if(_mediaType == 'WEB')
				{
					_url = _event.data.eventWebLink;
				}

				if(!_url)
				{
					APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_URL_NOT_FOUND);
				}
				else{
					window.open(_url, '_blank');
				}

				
			}

			//moreEventActions
			$scope.moreEventActions = function()
			{
				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class='+$scope._fontIconConst.SIGN_IN+'></i> Scan QR Code to sign in to Event'},
								{ text: '<i class='+$scope._fontIconConst.SIGN_OUT+'></i> Scan QR Code to sign out from Event'},
								{ text: '<i class='+$scope._fontIconConst.ACHIEVEMENT+'></i> Add any of your achievements for the event'},
								{ text: '<i class='+$scope._fontIconConst.IMAGES+'></i> Event images'}
     						],
     						titleText: "More event action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
						    			userSignInEvent();
						    			return true;
						    		case 1 :
						    			userSignOutEvent();
										return true;
									case 2 :
						    			$scope.createAchievement();
										return true;
									case 3 :
						    			$scope.eventImages();
						    			return true;
						    	}
						    }
						}
					);
			}

			$scope.eventImages = function()
			{
				$state.go('app.event-photos', {"eventId":$scope._eventId}, {reload: true});
			}


			function userSignInEvent()
			{
				if (window.cordova) 
				{
					if($scope.userAttendence[0])
					{
						APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_ALREADY_SIGNED_IN);
					}
					else
					{
						$cordovaBarcodeScanner.scan().then(function(imageData) {
							if(imageData.text == $scope._eventId)
							{
								$scope._userEventSignInData =
								{
									userId: _storedSessionUserProfile._loggedInSessionUserId,
									eventId : $scope._eventId,
									userEventAttendenceType : 'IN',
								};
		
								$rootScope.userEventAtendence();
							}
							else{
								APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_NOT_RIGHT_EVENT);
							}
						}, function(error) {
							console.log("An error happened -> " + error);
						});
					}
				} 
				else 
				{
					APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_SIGN_IN_OUT);
				}
			}

			function userSignOutEvent()
			{
				if (window.cordova) 
				{
					if($scope.userAttendence[1])
					{
						APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_ALREADY_SIGNED_OUT);
					}
					else
					{
						$cordovaBarcodeScanner.scan().then(function(imageData) {
							if(imageData.text == $scope._eventId)
							{
								$scope._userEventSignInData =
								{
									userId: _storedSessionUserProfile._loggedInSessionUserId,
									eventId : $scope._eventId,
									userEventAttendenceType : 'OUT',
								};
	
								$rootScope.userEventAtendence();
							}
							else{
								APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_NOT_RIGHT_EVENT);
							}
						}, function(error) {
							console.log("An error happened -> " + error);
						});
					}
				} 
				else 
				{
					APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, ALERT_TEXT.ALERT_TEXT_SIGN_IN_OUT);
				}
			}

			//updateProfile
			$rootScope.userEventAtendence = function()
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_UPDATE_DETAILS
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

				SERVICE.goCRUDService($scope, $scope._userEventSignInData, API_URL.USER_EVENT_ATTENDENCE)
					.then
						(
							function()
							{
								$ionicLoading.hide();
							},
							function(err)
							{
								$ionicLoading.hide();
								$rootScope._previousAPICall = "userEventAtendence";
							}
						);
			};

			function attendenceDetails()
			{
				attendence = ['', '', ''];

				for(i=0;i<$scope._eventDetails.data.users.data.length;i++)
				{
					if($scope._eventDetails.data.users.data[i].userId == _storedSessionUserProfile._loggedInSessionUserId)
					{
						attendence[0] = $scope._eventDetails.data.users.data[i].userEventSignIn;
						attendence[1] = $scope._eventDetails.data.users.data[i].userEventSignOut;
						attendence[3] = DATE_TIME_FACTORY.secondToHHMMSS($scope._eventDetails.data.users.data[i].userEventLoggedTime)
						
					}
				}
				return attendence;
			}

			//goBack
			$scope.goBack = function()
			{
				$state.go('app.my-events-landing');
			};

			//loadCreateEditAchievementModal
            function loadCreateEditAchievementModal()
            {
                var q = $q.defer();
                var _modalReady = false;
                //create-edit-sprint ionicModal
                $ionicModal.fromTemplateUrl
                (
                    'templates/create-edit-achievement-modal.html', 
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
            $scope.createAchievement = function()
            {
                loadCreateEditAchievementModal()
                    .then
                    (

                        function() 
                        {
                        	_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

                            $scope
			                    .$broadcast
			                    (
			                        'createAchievement-broadcast', 
			                        {
			                            'userId' 				: _storedSessionUserProfile._loggedInSessionUserId,
										'eventId' 				: $stateParams.eventId,
										'achievementId'			: 0,
										'achievementName'		: '',
										'achievementDescription': '',
										'achievementReceavedOn'	: new Date().toISOString().split("T")[0],
										'operationType' 		: 'create',
			                        }
			                    );
                        }
                    );
            };

			//userProfileUpdatedSuccess-broadcast
			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast',
					function (event, data)
					{
						$rootScope.getEventDetails();
			    	}
			    );

			//doRefresh
			$scope.doRefresh = function() {
		    	$rootScope.getEventDetails();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						$rootScope.getEventDetails();
			    	}
				);
			
			$scope
				.$on
				(
					'EventOperationSuccessfull-broadcast',
					function (event, data)
					{
						$rootScope.getAllEventsForUser();
			    	}
			    );

			
			//loadProfilePage
			//$scope.loadProfilePage();
		}
	)

	//CreateEditAchievementModalCtrl
	.controller
	(
		'CreateEditAchievementModalCtrl', 
		function
		(
			$rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, PATTERN, FONT_ICON, API_URL, $filter
		) 
		{
			$scope._fontIconConst = FONT_ICON;

			$scope._pageTitle = null;

			//createAchievement-broadcast
			$scope
				.$on
				(
					'createAchievement-broadcast', 
					function (event, data) 
					{
						createAchievement(data);
					}
			    );

			//editAchievement-broadcast
			$scope
				.$on
				(
					'editAchievement-broadcast', 
					function (event, data) 
					{
						editAchievement(data);
					}
			    );

			//deleteAchievement-broadcast
			$scope
				.$on
				(
					'deleteAchievement-broadcast', 
					function (event, data) 
					{
						deleteAchievement(data);
					}
			    );

			//createAchievement
			function createAchievement(data)
			{
				$scope._pageTitle = 'Add New Achievement';
				$scope.inputDisabled = false;
				//show
				$scope._createEditAchievementFormData = 
				{
					userId 					        : data.userId,
					eventId 				        : data.eventId,
					achievementId 					: data.achievementId,
					achievementName					: data.achievementName,
					achievementDescription			: data.achievementDescription,
					achievementReceavedOn 			: data.achievementReceavedOn,
					operationType 			        : data.operationType,
				};

				$scope.modal.show();
			}

			//editAchievement
			function editAchievement(data)
			{
				$scope.inputDisabled = true;
				$scope._pageTitle = 'Update Achievement';
				//show
				$scope._createEditAchievementFormData = 
				{
					userId 					        : data.userId,
					eventId 				        : data.eventId,
					achievementId 					: data.achievementId,
					achievementName					: data.achievementName,
					achievementDescription			: data.achievementDescription,
					achievementReceavedOn 			: data.achievementReceavedOn,
					operationType 			        : data.operationType,
				};

				$scope.modal.show();
			}

			//deleteAchievement
			function deleteAchievement(data)
			{
				//show
				$scope._createEditAchievementFormData = 
				{
					userId 					        : data.userId,
					eventId 				        : data.eventId,
					achievementId 					: data.achievementId,
					achievementName					: data.achievementName,
					achievementDescription			: data.achievementDescription,
					achievementReceavedOn 			: data.achievementReceavedOn,
					operationType 			        : data.operationType,
				};

				$ionicPopup
					.alert
					(
						{
							title: ALERT_TITLE.ALERT_TITLE_CONFIRM_ACTION,
							template: ALERT_TEXT.ALERT_TEXT_DELETE_GENERIC,
							scope: $scope,
							buttons: 
							[
						   		{ 
						   			text: ALERT_BUTTON.ALERT_BUTTON_YES ,
						   			type: 'alert-button-blue',
						   			onTap: function() 
						   			{
						   				//pass on
						   				$rootScope.CRUDAchievementDetails();
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
				_descriptionPattern : PATTERN.DESCRIPTION_PATTERN
			};

		  	//cancelOperation
			$scope.cancelOperation = function()
			{

				//if text fields are filled up
				if($scope._createEditAchievementFormData._achievementName || $scope._createEditAchievementFormData._achievementDescription)
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

			//CRUDAchievementDetails
			$rootScope.CRUDAchievementDetails = function()
			{
				var _contextloadingText = null;
				_contextloadingText = LOADING_TEXT.LOADING_TEXT_UPDATE_DETAILS;
				
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
				$scope._createEditAchievementFormData.achievementReceavedOn = $filter('date')($scope._createEditAchievementFormData.achievementReceavedOn, "yyyy-MM-dd");
					
				//goCreateEditdeleteAchievement
				SERVICE.goCRUDService($scope, $scope._createEditAchievementFormData, API_URL.CRUD_USER_ACHIEVEMENT)
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

						//AchievementOperationSuccessfull
						$scope
			                .$emit
			                (
			                    'AchievementOperationSuccessfull-broadcast', 
			                    {
			                        data: null
			                    }
							);
			    	}
			    );
		}
	)

	//MyAchievementsCtrl
	.controller
	(
		'MyAchievementsCtrl',
		function
		(
			$rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, $ionicNavBarDelegate, $ionicScrollDelegate, PATTERN, $ionicSideMenuDelegate, $q, API_URL, $stateParams, FONT_ICON, $ionicActionSheet, ALERT_TEXT, ALERT_TITLE, APP_ALERT_FACTORY, $cordovaBarcodeScanner, DATE_TIME_FACTORY
		)
		{
			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_userProfileData
			$scope._userProfileData = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_pageTitle
			$scope._pageTitle = null;

			$scope._modalOperationType = null;

			$scope._eventId = $stateParams.eventId;

			$scope._userId = null; 

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			$scope._fontIconConst = FONT_ICON;

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();
			
			//getMyAchievements
			$rootScope.getMyAchievements = function()
			{
				//getStoredSessionUserCredientils
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData =
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					eventId : $scope._eventId
				};

				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_FETCHING_USER
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

				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.USER_ACHIEVEMENTS)
					.then
                        (
                            function(data)
                            {
                                $ionicLoading.hide();
								$scope._myAchievements = data.data;
								
								if($scope._myAchievements.success)
                                {
                                	$scope._noData = false;
									$scope._hasData = true;
                                }
                                else
                                {
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

								$rootScope._previousAPICall = "getMyAchievements";
                            }
                        );
			};

			//moreAchievementActions
			$scope.moreAchievementActions = function(_achievement)
			{
				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class='+$scope._fontIconConst.EDIT+'></i> Update achievment'},
								{ text: '<i class='+$scope._fontIconConst.DELETE+'></i> Delete achievment'}
     						],
     						titleText: "More achievment action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
										$scope.editAchievement(_achievement);
						    			return true;
						    		case 1 :
										$scope.deleteAchievement(_achievement);
										return true;
						    	}
						    }
						}
					);
			}

			//loadCreateEditAchievementModal
            function loadCreateEditAchievementModal()
            {
                var q = $q.defer();
                var _modalReady = false;
                //create-edit-sprint ionicModal
                $ionicModal.fromTemplateUrl
                (
                    'templates/create-edit-achievement-modal.html', 
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
			
			//editAchievement
			$scope.editAchievement = function(_achievement)
			{
				loadCreateEditAchievementModal()
                    .then
                    (

                        function() 
                        {
                        	_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

                            $scope
			                    .$broadcast
			                    (
			                        'editAchievement-broadcast', 
			                        {
			                        	'userId' 				: _storedSessionUserProfile._loggedInSessionUserId,
										'eventId' 				: _achievement.eventId,
										'achievementId'			: _achievement.achievementId,
										'achievementName' 		: _achievement.achievementName,
										'achievementDescription': _achievement.achievementDescription,
										'achievementReceavedOn'	: new Date(_achievement.achievementReceavedOn),
										'operationType' 		: 'edit',
			                        }
			                    );
                        }
                    );
				
			};

			//deleteAchievement
			$scope.deleteAchievement = function(_achievement)
			{
				loadCreateEditAchievementModal()
                    .then
                    (

                        function() 
                        {
                        	_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

                            $scope
			                    .$broadcast
			                    (
			                        'deleteAchievement-broadcast', 
			                        {
			                            'userId' 				: _storedSessionUserProfile._loggedInSessionUserId,
										'eventId' 				: _achievement.eventId,
										'achievementId'			: _achievement.achievementId,
										'achievementName' 		: _achievement.achievementName,
										'achievementDescription' 		: _achievement.achievementDescription,
										'achievementReceavedOn'	: new Date(_achievement.achievementReceavedOn),
										'operationType' 		: 'delete',
			                        }
			                    );
                        }
                    );
			};

			//userProfileUpdatedSuccess-broadcast
			$scope
				.$on
				(
					'AchievementOperationSuccessfull-broadcast',
					function (event, data)
					{
						$rootScope.getMyAchievements();
			    	}
			    );

			//doRefresh
			$scope.doRefresh = function() {
		    	$rootScope.getMyAchievements();
		  	};

			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						$rootScope.getMyAchievements();
			    	}
				);
			
			//loadProfilePage
			//$scope.loadProfilePage();
		}
	)

	//SystemEventsLandingCtrl
	.controller
	(
		'SystemEventsLandingCtrl',
		function
		(
			$rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, $ionicNavBarDelegate, $ionicScrollDelegate, PATTERN, $ionicSideMenuDelegate, $q, API_URL, $stateParams, FONT_ICON, $ionicActionSheet
		)
		{
			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
			//_userProfileData
			$scope._userProfileData = {};

			//_message
			$scope._message= null;

			//_noData
			$scope._noData = false;

			//_pageTitle
			$scope._pageTitle = null;

			$scope._modalOperationType = null;

			$scope._fontIconConst = FONT_ICON;

			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;

			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//set pattern
			$scope._pattern = 
			{
				_namePattern : PATTERN.NAME_PATTERN,
				_descriptionPattern : PATTERN.DESCRIPTION_PATTERN
			};
			
			//getAllSystemEvent
			$rootScope.getAllSystemEvent = function()
			{
				//getStoredSessionUserCredientils
				_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

				$scope._userProfileData =
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId
				};

				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_FETCHING_USER
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

				SERVICE.goPullDataFromNetworkService($scope, $scope._userProfileData, API_URL.SYSTEM_EVENTS)
					.then
                        (
                            function(data)
                            {
                                $ionicLoading.hide();
								$scope._events = data.data;
								console.log(JSON.stringify($scope._events));
								
								if($scope._events.success)
                                {
                                	$scope._noData = false;
									$scope._hasData = true;

									//update notification
                                }
                                else
                                {
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

								$rootScope._previousAPICall = "getAllSystemEvent";
                            }
                        );
			};

			//moreEventActions
			$scope.moreEventActions = function(_event)
			{
				// Show the action sheet
				$ionicActionSheet.show
   					(
   						{
     						buttons: 
     						[
								{ text: '<i class='+$scope._fontIconConst.SIGN_IN+'></i> Nominate yourself for event'},
     						],
     						titleText: "More event action",
						    buttonClicked: function(index) 
						    {
						    	switch (index)
						    	{
						    		case 0 :
						    			userEventNominnation(_event);
						    			return true;
						    	}
						    }
						}
					);
			}

			function userEventNominnation(_event)
			{
				$scope._userEventSignInData =
				{
					userId: _storedSessionUserProfile._loggedInSessionUserId,
					eventId : _event.eventId
				};

				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_UPDATE_DETAILS
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

				SERVICE.goCRUDService($scope, $scope._userEventSignInData, API_URL.USER_EVENT_NOMINATION)
					.then
						(
							function()
							{
								$ionicLoading.hide();
							},
							function(err)
							{
								$ionicLoading.hide();
								$rootScope._previousAPICall = "userEventNominnation";
							}
						);
			}

			//getUserStoryDetails
            $scope.getEventDetails = function(_data)
            {
                $state.go('app.event-details', {"eventId":_data.eventId}, {reload: true});
			};
			
			//doRefresh
			$scope.doRefresh = function() {
		    	$rootScope.getAllSystemEvent();
			};
			  
			//getVolunteers
			$scope._getVolunteers = function(_users) 
			{
				_volunteers = 0;

				for(i=0;i<_users.data.length;i++)
				{
					if(_users.data[i].userType != 'ADMIN')
					{
						_volunteers++;
					}
				}

				if(_volunteers == 0)
				{
					_volunteers = 'No';
				}

				return _volunteers;
			};

			$scope
				.$on
				(
					'$ionicView.afterEnter',
					function (event, data)
					{
						$rootScope.getAllSystemEvent();
			    	}
				);
			
			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast',
					function (event, data)
					{
						$rootScope.getAllSystemEvent();
			    	}
			    );
			
			
			//loadProfilePage
			//$scope.loadProfilePage();
		}
	)

	//EventPhotosCtrl
	.controller
	(
		'EventPhotosCtrl', 
		function
		(
			$ionicHistory, $stateParams, $rootScope, $scope, $ionicModal, $timeout, $ionicPopup, SERVICE, $state, $ionicLoading, LOADING_TEXT, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, $ionicNavBarDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, PATTERN, $q, $ionicActionSheet, FONT_ICON, API_URL, $http, $cordovaFileTransfer
		) 
		{
			$scope._fontIconConst = FONT_ICON;

			//showBackButton
			$ionicNavBarDelegate.showBackButton(false);
			
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

			//set pattern
			$scope._pattern = 
			{
				_namePattern : PATTERN.NAME_PATTERN,
				_descriptionPattern : PATTERN.DESCRIPTION_PATTERN
			};

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
								$rootScope._previousAPICall = "getAllEventPhotos";

                            }
                        );
			};
			
			$scope.imageSource = function(_photo)
			{
				return API_URL.IMAGE_URL+_photo.fileName;
			}

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
			
			$scope.goBack = function()
			{
				$ionicHistory.goBack();
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

	//
	//VolunteerSpeakCtrl
	.controller
	(
		'VolunteerSpeakCtrl',
		function
		(
			$rootScope, $scope, API_URL, SERVICE, PATTERN, API_URL, LOADING_TEXT, $ionicLoading, $ionicSideMenuDelegate
		)
		{
			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;
			
			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//set pattern
			$scope._pattern = 
			{
				_descriptionPattern : PATTERN.DESCRIPTION_PATTERN
			};

			$scope._volunteerSpeakFormData =
			{
				userId: _storedSessionUserProfile._loggedInSessionUserId,
				userFeedback : ''
			};

			$rootScope.volunteerSpeak = function()
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_UPDATE_DETAILS
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

				SERVICE.goCRUDService($scope, $scope._volunteerSpeakFormData, API_URL.VOLUNTEER_SPEAK)
					.then
						(
							function()
							{
								$ionicLoading.hide();
							},
							function(err)
							{
								$ionicLoading.hide();
								$rootScope._previousAPICall = "userEventNominnation";
							}
						);
			}

			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast',
					function (event, data)
					{
						$scope._volunteerSpeakFormData.userFeedback = '';
			    	}
			    );
		}
	)

	//CaptureCorporateDetailsCtrl
	.controller
	(
		'CaptureCorporateDetailsCtrl',
		function
		(
			$rootScope, $scope, API_URL, SERVICE, PATTERN, API_URL, LOADING_TEXT, $ionicLoading, $ionicSideMenuDelegate
		)
		{
			//_storedSessionUserProfile
			var _storedSessionUserProfile = null;
			
			//openLeftMenu
			$scope.openLeftMenu = function()
			{
				$ionicSideMenuDelegate.toggleLeft();
			}

			//getStoredSessionUserCredientils
			_storedSessionUserProfile = SERVICE.getStoredSessionUserCredientils();

			//set pattern
			$scope._pattern = 
			{
				_namePattern : PATTERN.NAME_PATTERN,
				_phoneNoPattern : PATTERN.PHONE_NO_PATTERN,
				_descriptionPattern : PATTERN.DESCRIPTION_PATTERN
			};

			$scope._captureCorporateDetailsFormData =
			{
				userId: _storedSessionUserProfile._loggedInSessionUserId,
				corporateId : 0,
				corporateName : '',
				corporatePhoneNo : '',
				corporateEmail : '',
				corporateAddress : '',
				operationType : 'create',
			};

			//captureCorporateDetails
			$rootScope.captureCorporateDetails = function()
			{
				//loading
				$scope._loading =
				{
					_ladingText :	LOADING_TEXT.LOADING_TEXT_UPDATE_DETAILS
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

				SERVICE.goCRUDService($scope, $scope._captureCorporateDetailsFormData, API_URL.CRUD_CORPORATE_DETAILS)
					.then
						(
							function()
							{
								$ionicLoading.hide();
							},
							function(err)
							{
								$ionicLoading.hide();
								$rootScope._previousAPICall = "captureCorporateDetails";
							}
						);
			}

			$scope
				.$on
				(
					'CRUDSuccessfull-broadcast',
					function (event, data)
					{
						$scope._captureCorporateDetailsFormData =
						{
							userId: _storedSessionUserProfile._loggedInSessionUserId,
							corporateId : 0,
							corporateName : '',
							corporatePhoneNo : '',
							corporateEmail : '',
							corporateAddress : '',
							operationType : 'create',
						};
			    	}
			    );
		}
	)

	//testCtrl
	.controller
	(
		'testCtrl', 
		['$scope', '$stateParams', function($scope, $stateParams) 
		{
		//
		}
	]
);

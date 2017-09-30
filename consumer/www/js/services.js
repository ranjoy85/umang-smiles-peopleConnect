

angular
    .module
    (
        'starter.services', 
        [
            'ionic', 'starter.constants', 'starter.factory'
        ]
    )

    .service
    (
        'SERVICE', 
        [
            '$rootScope','$http', '$q', 'LOCAL_STORE_KEY', 'WEB_API_FACTORY', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', 'API_URL', 'CONNECTION_MONITOR_FACTORY', 'APP_ALERT_FACTORY', '$ionicPopup',
            function
            (
                $rootScope, $http, $q, LOCAL_STORE_KEY, WEB_API_FACTORY, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, API_URL, CONNECTION_MONITOR_FACTORY, APP_ALERT_FACTORY, $ionicPopup
            )
            {
                var _storeSessionUserCredientils = null;
                var _getStoredSessionUserCredientils = null;
                var _goSignIn = null;
                var _goFBSignIn = null;
                var _getFBUserDetails = null;
                var _goSignUp = null;
                var _goThirdPartyUserSignUp = null;
                var _goTestServer = null;
                var _goActivateUserAccount = null;
                var _goResendUserAccountActivationCode = null;
                var _goPasswordResetCode = null;
                var _goUpdatePassword = null;
                var _isSessionUserPresent = null;
                var _destroyUserCredentials = null;
                var _goLogoutServerUser = null;
                var _getUserProfile = null;
                var _storeSessionUserProfile = null;
                var _updateSessionUserProfile = null;
                var _goPullDataFromNetworkService = null
                var _goCRUDService = null;

                _service = {};

                //storeSessionId
                function storeSessionId(_loggedInSessionId)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_SESSION_ID, _loggedInSessionId);
                }

                //storeSessionUserEmail
                function storeSessionUserEmail(_loggedInSessionUserEmail)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_EMAIL, _loggedInSessionUserEmail);
                }

                //storeSessionUserId
                function storeSessionUserId(_loggedInSessionUserId)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_ID, _loggedInSessionUserId);
                }

                //storeSessionUserFirstName
                function storeSessionUserFirstName(_loggedInSessionUserFirstName)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_FIRST_NAME, _loggedInSessionUserFirstName);
                }

                //storeSessionUserLastName
                function storeSessionUserLastName(_loggedInSessionUserLastName)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_LAST_NAME, _loggedInSessionUserLastName);
                }

                //storeSessionUserDob
                function storeSessionUserDob(_loggedInSessionUserDob)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_DOB, _loggedInSessionUserDob);
                }

                //storeSessionUserPushStatus
                function storeSessionUserPushStatus(_loggedInSessionUserPushStatus)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_PUSH_STATUS, _loggedInSessionUserPushStatus);
                }

                //storeSessionUserType
                function storeSessionUserType(_loggedInSessionUserType)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_TYPE, _loggedInSessionUserType);
                }

                //storeSessionThirdPartyUserId
                function storeSessionThirdPartyUserId(_loggedInSessionThirdPartyUserId)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_THIRD_PARTY_USER_ID, _loggedInSessionThirdPartyUserId);
                }

                //storeSessionUserCredientils
                function storeSessionUserCredientils(_sessionUserCred) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if (_sessionUserCred) 
                        {
                            if(_sessionUserCred._loggedInSessionUserEmail != null)
                            {
                                storeSessionUserEmail(_sessionUserCred._loggedInSessionUserEmail);
                            }
                            resolve('Credientils stored');
                        } 
                        else 
                        {
                            reject('Credientils store Failed.');
                        }
                    });
                };

                //storeSessionData
                function storeSessionData(_sessionData) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if (_sessionData) 
                        {
                            // store user cred in local storage
                            if(_sessionData._loggedInSessionId != null)
                            {
                                storeSessionId(_sessionData._loggedInSessionId);;    
                            }
                            if(_sessionData._loggedInSessionUserId != null)
                            {
                                storeSessionUserId(_sessionData._loggedInSessionUserId);
                            }
                            resolve('Session stored');
                        } 
                        else 
                        {
                            reject('Session Failed.');
                        }
                    });
                };

                //storeSessionUserProfile
                function storeSessionUserProfile(_sessionUserProfile) 
                {
                    return $q(function(resolve, reject) 
                    {
                        //alert(JSON.stringify(_sessionUserProfile));
                        if (_sessionUserProfile) 
                        {
                            //_loggedInSessionUserFirstName
                            if(_sessionUserProfile._loggedInSessionUserFirstName != null)
                            {
                                var _fiestName = _sessionUserProfile._loggedInSessionUserFirstName;
                                _fiestName = _fiestName.charAt(0).toUpperCase() + _fiestName.slice(1);
                                storeSessionUserFirstName(_fiestName);
                            }

                            //_loggedInSessionUserLastName
                            if(_sessionUserProfile._loggedInSessionUserLastName != null)
                            {
                                var _lastName = _sessionUserProfile._loggedInSessionUserLastName;
                                _lastName = _lastName.charAt(0).toUpperCase() + _lastName.slice(1);
                                storeSessionUserLastName(_lastName);
                            }

                            //_loggedInSessionUserDob
                            if(_sessionUserProfile._loggedInSessionUserDob != null)
                            {
                                var _dob = _sessionUserProfile._loggedInSessionUserDob;
                                storeSessionUserDob(_dob);
                            }

                            //_loggedInSessionUserPushStatus
                            if(_sessionUserProfile._loggedInSessionUserPushStatus != null)
                            {
                                storeSessionUserPushStatus(_sessionUserProfile._loggedInSessionUserPushStatus);
                            }

                            //_loggedInSessionUserPushStatus
                            if(_sessionUserProfile._loggedInSessionUserType != null)
                            {
                                storeSessionUserType(_sessionUserProfile._loggedInSessionUserType);
                            }

                            //_loggedInSessionUserPushStatus
                            if(_sessionUserProfile._loggedInSessionThirdPartyUserId != null)
                            {
                                storeSessionThirdPartyUserId(_sessionUserProfile._loggedInSessionThirdPartyUserId);
                            }

                            // store user cred in local storage
                            resolve('User profile stored');
                        } 
                        else 
                        {
                            reject('User profile stored Failed.');
                        }
                    });
                };

                //updateSessionUserProfile
                _updateSessionUserProfile = function(_data) 
                {
                    return $q(function(resolve, reject) 
                    {
                        //alert(JSON.stringify(_sessionUserProfile));
                        if (_data) 
                        {
                            //userFirstName
                            if(_data.userFirstName != null)
                            {
                                var _fiestName = _data.userFirstName;
                                _fiestName = _fiestName.charAt(0).toUpperCase() + _fiestName.slice(1);
                                storeSessionUserFirstName(_fiestName);
                            }

                            //userlastName
                            if(_data.userLastName != null)
                            {
                                var _lastName = _data.userLastName;
                                _lastName = _lastName.charAt(0).toUpperCase() + _lastName.slice(1);
                                storeSessionUserLastName(_lastName);
                            }

                            //_loggedInSessionUserDob
                            if(_data.userDob != null)
                            {
                                var _dob = _data.userDob;
                                storeSessionUserDob(_dob);
                            }

                            // store user cred in local storage
                            resolve('User profile stored');
                        } 
                        else 
                        {
                            reject('User profile stored Failed.');
                        }
                    });
                };

                //handleUnsuccessfullRequest
                function handleUnsuccessfullRequest(response)
                {

                    if(response.error.errorCode == "INVALID_SESSION")
                    {

                        $rootScope
                            .$emit
                            (
                                'invalidSession-broadcast', 
                                {
                                    data: null
                                }
                            );
                    }
                    else if (response.error.errorCode == "NO_TRIPS")
                    {
                        //do not show alert
                    }
                    else if (response.error.errorCode == "NO_TRIP_MEMBER_REQUEST")
                    {
                        //do not show alert
                    }
                    else if (response.error.errorCode == "NO_PENDING_REQUEST")
                    {
                        //do not show alert
                    }
                    else if (response.error.errorCode == "NO_CLOSED_TRIPS")
                    {
                        //do not show alert
                    }
                    else
                    {
                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_TRIPS, response.error.message);
                    }
                };

                //destroyUserCredentials
                function destroyUserCredentials()
                {
                    //alert("a");
                    return $q(function(resolve, reject) 
                    {
                        var _storedSessionUserCredientils = _getStoredSessionUserCredientils();
                        var userEmail = _storedSessionUserCredientils._loggedInSessionUserEmail;

                        if (userEmail != null) 
                        {
                            //alert("a1");
                            //remove key from local storage
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_SESSION_ID);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_EMAIL);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_ID);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_FIRST_NAME);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_LAST_NAME);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_DOB);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_PUSH_STATUS);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_TYPE);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_THIRD_PARTY_USER_ID);
                            
                            resolve('Local storage Destroyed');
                        } 
                        else 
                        {
                            //alert("a3");
                            reject('Session Failed.');
                        }
                    });
                };

                //storeUserEmail
                function storeUserEmail(_email) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if (_email) 
                        {
                            // store user cred in local storage
                            storeSessionUserEmail(_email);
                            resolve();
                        } 
                        else 
                        {
                            reject();
                        }
                    });
                };

                //goTestServer
                function goTestServer($scope) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = null;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.TEST;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    //
                                alert("response +"+JSON.stringify(response));
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    //
                                }
                            );

                    });
                };

                //goSignUp
                function goSignUp($scope, _signUpUserDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _signUpUserDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.SIGN_UP_USER;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    //success
                                    if(response.success)
                                    {
                                        resolve('User created');
                                        $scope._sessionUserCred = 
                                        {
                                            _loggedInSessionUserEmail: _signUpUserDetails.userEmail,
                                        };   

                                        storeSessionUserCredientils($scope._sessionUserCred)
                                        .then
                                        (

                                            function(_dataStored) 
                                            {
                                                resolve('Credientils stored');
                                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGNED_UP, response.message);
                                                //valid user

                                                //signUpSuccessfull-broadcast
                                                $scope
                                                    .$broadcast
                                                    (
                                                        'signUpSuccessfull-broadcast', 
                                                        {
                                                            data: null
                                                        }
                                                    );
                                            }, 
                                            function(err) 
                                            {
                                                reject('Credientils store Failed.');
                                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                            }
                                        );
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        reject('Credientils store Failed.');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );
                    });
                };

                //goThirdPartyUserSignUp
                function goThirdPartyUserSignUp($scope, _signUpUserDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _signUpUserDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.THIRD_PARTY_USER_SIGN_UP;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    //success
                                    if(response.success)
                                    {
                                        resolve('User created');
                                        $scope._sessionUserCred = 
                                        {
                                            _loggedInSessionUserEmail: _signUpUserDetails.userEmail,
                                        };   

                                        storeSessionUserCredientils($scope._sessionUserCred)
                                        .then
                                        (

                                            function(_dataStored) 
                                            {
                                                resolve('Credientils stored');
                                            }, 
                                            function(err) 
                                            {
                                                reject('Credientils store Failed.');
                                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                            }
                                        );
                                    }
                                    else if(!response.success)
                                    {
                                        resolve('User created');
                                        $scope._sessionUserCred = 
                                        {
                                            _loggedInSessionUserEmail: _signUpUserDetails.userEmail,
                                        };   

                                        storeSessionUserCredientils($scope._sessionUserCred)
                                        .then
                                        (

                                            function(_dataStored) 
                                            {
                                                resolve('Credientils stored');
                                            }, 
                                            function(err) 
                                            {
                                                reject('Credientils store Failed.');
                                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                            }
                                        );
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        reject('Credientils store Failed.');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );
                    });
                };

                //_goSignIn
                function goSignIn ($scope, _sessionUserCred) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _sessionUserCred;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.SIGN_IN_USER;

                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    
                                    //success
                                    if(response.success)
                                    {
                                        //store user credientials
                                        $scope._sessionUserCred = 
                                        {
                                            _loggedInSessionUserEmail: _sessionUserCred.userEmail,
                                        };   

                                        storeSessionUserCredientils($scope._sessionUserCred)
                                        .then
                                        (
                                            function(_dataStored) 
                                            {
                                                resolve('Credientils stored');
                                                
                                                //store session data
                                                $scope._sessionData = 
                                                {
                                                    _loggedInSessionId: response.loggedInSessionId,
                                                    _loggedInSessionUserId: response.userId
                                                };   

                                                storeSessionData($scope. _sessionData)
                                                .then
                                                (
                                                    function(_dataStored) 
                                                    {
                                                        resolve('session stored');
                                                        //APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGNED_IN, response.message);

                                                        //goToSignIn-broadcast
                                                        $scope
                                                            .$broadcast
                                                            (
                                                                'signInSuccessfull-broadcast', 
                                                                {
                                                                    data: null
                                                                }
                                                            );
                                                    }, 
                                                    function(err) 
                                                    {

                                                        reject('session store Failed.');
                                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_IN_FAILED, response.error.message);
                                                    }
                                                );
                                            }, 
                                            function(err) 
                                            {
                                                reject('Credientils store Failed.');
                                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_IN_FAILED, response.error.message);
                                            }
                                        );
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        reject('Sign in failed');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong.');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };

                //goActivateUserAccount
                function goActivateUserAccount($scope, _accountActivationDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _accountActivationDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.ACTIVATE_USER;

                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    //alert(JSON.stringify(response));
                                    //success
                                    if(response.success)
                                    {
                                        resolve('User activated');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_ACCOUNT_ACTIVATION, response.message);
                                        //

                                        //goToSignIn-broadcast
                                        $scope
                                            .$broadcast
                                            (
                                                'goToSignIn-broadcast', 
                                                {
                                                    data: null
                                                }
                                            );
                                    }
                                    //invalid credientials 
                                    else
                                    {
                                        reject('User could not be activated.');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                        if(response.error.errorCode == "ALREADY_ACTIVE_USER")
                                        {
                                            //goToSignIn-broadcast
                                            $scope
                                                .$broadcast
                                                (
                                                    'goToSignIn-broadcast', 
                                                    {
                                                        data: null
                                                    }
                                                );
                                        }
                                        
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };
                
                //goResendUserAccountActivationCode
                function goResendUserAccountActivationCode($scope, _accountActivationDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _accountActivationDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.RESEND_USER_ACTIVATION_CODE;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    
                                    //success
                                    if(response.success)
                                    {
                                        resolve('User activated');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_ACCOUNT_ACTIVATION, response.message);
                                        //
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        reject('User could not be activated.');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_ACCOUNT_ACTIVATION, response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };

                //goPasswordResetCode
                function goPasswordResetCode($scope, _accountDetails) 
                {

                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _accountDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.RESET_PASSWORD_CODE;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    
                                    //success
                                    if(response.success)
                                    {
                                        resolve('successs');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_RESET_PASSWORD, response.message);
                                        
                                        //storeUserEmail
                                        storeUserEmail(_accountDetails.userEmail)
                                        .then
                                        (

                                            function(_dataStored) 
                                            {
                                                resolve('Credientils stored');
                                            }, 
                                            function(err) 
                                            {
                                                reject('Credientils store Failed.');
                                            }
                                        );

                                        //goUpdatePassword-broadcast
                                        $scope
                                            .$broadcast
                                            (
                                                'goUpdatePassword-broadcast', 
                                                {
                                                    data: null
                                                }
                                            );
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        reject('User could not be activated.');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_RESET_PASSWORD_FAILED, response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };

                //goLogoutServerUser
                function goLogoutServerUser($scope, _sessionDetails) 
                {

                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _sessionDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.USER_LOGOUT;
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    //success
                                    if(response.success)
                                    {
                                        resolve('successs');
                                        //APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_UPDATE_PASSWORD, response.message);
                                        destroyUserCredentials()
                                            .then
                                            (
                                                function() 
                                                {
                                                    resolve('Logged out');
                                                    //serverUserLoggedOutSussess-broadcast
                                                    $scope
                                                        .$broadcast
                                                        (
                                                            'serverUserLoggedOutSussess-broadcast', 
                                                            {
                                                                data: null
                                                            }
                                                        );
                                                }, 
                                                function(err) 
                                                {
                                                    reject('Logged out Failed.');
                                                }
                                            );
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        //alert("response.error "+JSON.stringify(response));
                                        reject('failure');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_OUT_FAILED, response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };

                //goUpdatePassword
                function goUpdatePassword($scope, _accountDetails) 
                {

                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _accountDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.UPDATE_PASSWORD;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    
                                    //success
                                    if(response.success)
                                    {
                                        resolve('successs');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_UPDATE_PASSWORD, response.message);
                                        
                                        //goToSignIn-broadcast
                                        $scope
                                            .$broadcast
                                            (
                                                'goToSignIn-broadcast', 
                                                {
                                                    data: null
                                                }
                                            );
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        reject('User could not be activated.');
                                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_UPDATE_PASSWORD_FAILED, response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };

                //getUserProfile
                function getUserProfile($scope, _accountDetails) 
                {

                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _accountDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.USER_DETAILS;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    //alert("response "+JSON.stringify(response));
                                    
                                    //success
                                    if(response.success)
                                    {
                                        resolve('successs');
                                        var _userData = response.data;
                                        $scope._sessionUserProfile = 
                                        {
                                            _loggedInSessionUserFirstName: _userData.userFirstName,
                                            _loggedInSessionUserLastName : _userData.userLastName,
                                            _loggedInSessionUserDob : _userData.userDob,
                                            _loggedInSessionUserPushStatus : _userData.userPushStatus,
                                            _loggedInSessionUserType : _userData.userType,
                                            _loggedInSessionThirdPartyUserId : _userData.thirdPartyUserId

                                        };   

                                        storeSessionUserProfile($scope._sessionUserProfile)
                                        .then
                                        (

                                            function(_dataStored) 
                                            {

                                                resolve('Credientils stored');
                                                
                                                //store session data
                                                $scope._sessionData = 
                                                {
                                                    _loggedInSessionId: response.updatedLoggedInSessionId
                                                };   

                                                storeSessionData($scope. _sessionData)
                                                .then
                                                (
                                                    function(_dataStored) 
                                                    {
                                                        resolve('session stored');
                                                        //APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGNED_IN, response.message);
                                                        //userProfileReceavedSuccess-broadcast
                                                        $scope
                                                            .$broadcast
                                                            (
                                                                'userProfileReceavedSuccess-broadcast', 
                                                                {
                                                                    data: null
                                                                }
                                                            );
                                                    }, 
                                                    function(err) 
                                                    {
                                                        reject('session store Failed.');
                                                        //APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_IN_FAILED, response.error.message);
                                                    }
                                                );

                                            }, 
                                            function(err) 
                                            {
                                                reject('Credientils store Failed.');
                                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGN_UP_FAILED, response.error.message);
                                            }
                                        );
                                        //APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_UPDATE_PASSWORD, response.message);
                                        
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        //handleUnsuccessfullRequest
                                        handleUnsuccessfullRequest(response);
                                        reject(response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };

                //goPullDataFromNetworkService
                function goPullDataFromNetworkService($scope, _details, _url) 
                {

                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _details;
                        var _webBaseUrl = API_URL.HOST_URL+_url;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {

                                    //success
                                    if(response.success)
                                    {
                                        //store session data
                                        $scope._sessionData = 
                                        {
                                            _loggedInSessionId: response.updatedLoggedInSessionId
                                        };   

                                        storeSessionData($scope. _sessionData)
                                        .then
                                        (
                                            function(_dataStored) 
                                            {
                                                resolve(response);
                                                
                                                //dataRetrivedSuccess-broadcast
                                                $scope
                                                    .$broadcast
                                                    (
                                                        'dataRetrivedSuccess-broadcast', 
                                                        {
                                                            data: null
                                                        }
                                                    );
                                            }, 
                                            function(err) 
                                            {
                                                reject('session store Failed.');
                                            }
                                        );
                                        
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        //handleUnsuccessfullRequest
                                        handleUnsuccessfullRequest(response);
                                        reject(response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };

                //goCRUDSettings
                function goCRUDService($scope, _details, _url) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _details;
                        var _webBaseUrl = API_URL.HOST_URL+_url;
                        
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    //success
                                    if(response.success)
                                    {
                                        resolve('successs');
                                        //store session data
                                        $scope._sessionData = 
                                        {
                                            _loggedInSessionId: response.updatedLoggedInSessionId
                                        };   

                                        storeSessionData($scope. _sessionData)
                                        .then
                                        (
                                            function(_dataStored) 
                                            {
                                                resolve('session stored');
                                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE, response.message);
                                                //userProfileReceavedSuccess-broadcast
                                                $scope
                                                    .$broadcast
                                                    (
                                                        'CRUDSuccessfull-broadcast', 
                                                        {
                                                            data: null
                                                        }
                                                    );
                                            }, 
                                            function(err) 
                                            {
                                                reject('session store Failed.');
                                            }
                                        );
                                    }
                                    //invalid credientials
                                    else
                                    {
                                        //handleUnsuccessfullRequest
                                        handleUnsuccessfullRequest(response);
                                        reject(response.error.message);
                                    }
                                    
                                },
                                //any error
                                function(error)
                                {
                                    reject('Something went wrong');
                                    APP_ALERT_FACTORY.somethingWentWrongAlert();
                                }
                            );

                    });
                };
                
                //_getStoredSessionUserCredientils
                _getStoredSessionUserCredientils = function () {
                    //alert("tes");
                    var _sessionUserCred = 
                    {
                        _loggedInSessionUserEmail: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_EMAIL),
                        _loggedInSessionId: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_SESSION_ID),
                        _loggedInSessionUserId: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_ID),
                        _loggedInSessionUserFirstName: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_FIRST_NAME),
                        _loggedInSessionUserLastName: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_LAST_NAME),
                        _loggedInSessionUserDob: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_DOB),
                        _loggedInSessionUserPushStatus: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_PUSH_STATUS),
                        _loggedInSessionUserType: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_TYPE),
                        _loggedInSessionThirdPartyUserId: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_THIRD_PARTY_USER_ID),
                        

                    }; 
                    return _sessionUserCred;
                };

                //_goSignUp
                _goTestServer = function($scope)
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goTestServer ($scope)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goPullDataFromNetworkService
                _goPullDataFromNetworkService = function($scope, _userDetails, _url) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goPullDataFromNetworkService ($scope, _userDetails, _url)
                                .then
                                (
                                    function(data) 
                                    {
                                        resolve(data);
                                    }, 
                                    function(err) 
                                    {
                                        reject(err)
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goCRUDService
                _goCRUDService = function($scope, _details, _url) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goCRUDService ($scope, _details, _url)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject(err);
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };
                
                //_goSignUp
                _goSignUp = function($scope, _signUpUserDetails)
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goSignUp ($scope, _signUpUserDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goThirdPartyUserSignUp
                _goThirdPartyUserSignUp = function($scope, _signUpUserDetails)
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goThirdPartyUserSignUp ($scope, _signUpUserDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goSignIn
                _goSignIn = function($scope, _sessionUserCred)
                {

                    //var deferObject = $q.defer();
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goSignIn ($scope, _sessionUserCred)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            APP_ALERT_FACTORY.noInternetAlert();
                            reject();
                        }
                    })

                    //return deferObject;
                    
                };

                //_goFBSignIn
                _goFBSignIn = function($scope)
                {

                    //var deferObject = $q.defer();
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            var _fbLoginData = null;
                            
                            if (window.cordova) 
                            {
                                //only for browser
                            } 
                            else 
                            {
                                facebookConnectPlugin.browserInit('1456908671060271');
                            }
                            
                            facebookConnectPlugin
                                .login
                                (   
                                    ['public_profile', 'email'], 
                                    function (data) 
                                    {
                                        console.log(JSON.stringify(data));
                                        $scope._fbUserId = data.authResponse.userID;
                                        resolve(data);
                                    }, 
                                    function (err) 
                                    {
                                        reject(err);
                                    }
                                );
                        }
                        else
                        {
                            APP_ALERT_FACTORY.noInternetAlert();
                            reject();
                        }
                    })

                    //return deferObject;
                    
                };

                //_getFBUserDetails
                _getFBUserDetails = function($scope)
                {

                    //var deferObject = $q.defer();
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            facebookConnectPlugin
                                .api
                                (
                                    '/'+$scope._fbUserId+'/?fields=id,email,first_name,last_name', ['public_profile'],
                                    function onSuccess (data) 
                                    {
                                        console.log(JSON.stringify(data));
                                        resolve(data);
                                    }, 
                                    function onError (err) 
                                    {
                                        reject(err);
                                    }
                                );
                        }
                        else
                        {
                            APP_ALERT_FACTORY.noInternetAlert();
                            reject();
                        }
                    })
                };

                //_getEcosystemMembersList
                _getEcosystemMembersList = function($scope, _userDetails)
                {

                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            getEcosystemMembersList ($scope, _userDetails)
                                .then
                                (
                                    function(data) 
                                    {
                                        resolve(data);
                                    }, 
                                    function(err) 
                                    {
                                        reject(err);
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                };
                
                //_goActivateUserAccount
                _goActivateUserAccount = function($scope, _accountActivationDetails)
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goActivateUserAccount ($scope, _accountActivationDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goActivateUserAccount
                _goResendUserAccountActivationCode = function($scope, _accountActivationDetails)
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goResendUserAccountActivationCode ($scope, _accountActivationDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goActivateUserAccount
                _goPasswordResetCode = function($scope, _accountDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goPasswordResetCode ($scope, _accountDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goUpdatePassword
                _goUpdatePassword = function($scope, _accountDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goUpdatePassword ($scope, _accountDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };
                
                //_getUserProfile
                _getUserProfile = function($scope, _accountDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            getUserProfile ($scope, _accountDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_goLogoutServerUser
                _goLogoutServerUser = function($scope, _sessionDetails) 
                {
                    return $q(function(resolve, reject) 
                    {
                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goLogoutServerUser ($scope, _sessionDetails)
                                .then
                                (
                                    function() 
                                    {
                                        resolve();
                                    }, 
                                    function(err) 
                                    {
                                        reject()
                                    }
                                );
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                };

                //_isSessionUserPresent
                _isSessionUserPresent = function()
                {
                    var isSessionUserPresent = false;
                    var _storedSessionUserCredientils = _getStoredSessionUserCredientils();
                    var userEmail = _storedSessionUserCredientils._loggedInSessionUserEmail;
                    var loggedInSessionId = _storedSessionUserCredientils._loggedInSessionId;

                    if(userEmail !== null && loggedInSessionId !== null)
                    {
                        isSessionUserPresent = true;
                    }
                    else
                    {
                        isSessionUserPresent = false;
                    }
                    
                    return isSessionUserPresent;
                };

                _setCurrentTripDetails = function(details)
                {
                    _currentTripDetails = null;
                    _currentTripDetails = details;
                };
                _getCurrentTripDetails = function()
                {
                    return _currentTripDetails;
                };

                //_service.storeSessionUserCredientils =  _storeSessionUserCredientils;
                _service.getStoredSessionUserCredientils = _getStoredSessionUserCredientils;
                _service.goSignIn = _goSignIn;
                _service.goFBSignIn = _goFBSignIn;
                _service.getFBUserDetails = _getFBUserDetails;
                _service.goSignUp = _goSignUp;
                _service.goThirdPartyUserSignUp = _goThirdPartyUserSignUp;
                _service.goActivateUserAccount = _goActivateUserAccount;
                _service.goTestServer = _goTestServer;
                _service.goResendUserAccountActivationCode = _goResendUserAccountActivationCode;
                _service.goPasswordResetCode = _goPasswordResetCode;
                _service.goUpdatePassword = _goUpdatePassword;
                _service.isSessionUserPresent = _isSessionUserPresent;
                _service.goLogoutServerUser = _goLogoutServerUser;
                _service.getUserProfile = _getUserProfile;
                _service.storeSessionUserProfile = storeSessionUserProfile;
                _service.updateSessionUserProfile = _updateSessionUserProfile;
                
                _service.goPullDataFromNetworkService = _goPullDataFromNetworkService;
                _service.goCRUDService = _goCRUDService;
                
                return _service;
            }
        ]
    );

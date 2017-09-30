

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
            '$rootScope', '$http', '$q', 'LOCAL_STORE_KEY', 'WEB_API_FACTORY', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', 'API_URL', 'CONNECTION_MONITOR_FACTORY', 'APP_ALERT_FACTORY', '$ionicPopup', 'LOG_FACTORY',
            function
            (
               $rootScope, $http, $q, LOCAL_STORE_KEY, WEB_API_FACTORY, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, API_URL, CONNECTION_MONITOR_FACTORY, APP_ALERT_FACTORY, $ionicPopup, LOG_FACTORY
            )
            {
                var _storeSessionUserCredientils = null;
                var _getStoredSessionUserCredientils = null;
                var _goSignIn = null;
                var _isSessionUserPresent = null;
                var _goLogoutServerUser = null;
                var _goPullDataFromNetworkService = null;
                var _goCRUDService = null;
                var _getUserProfile = null;

                // *********************
                
                _service = {};

                //storeSessionId
                function storeDefaultProjectId(_defaulProjectId)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.DEFAULT_PROJECT, _defaulProjectId);
                }

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

                //storeSessionUserPassword
                function storeSessionUserPassword(_loggedInSessionUserPassword)
                {
                    window.localStorage.setItem(LOCAL_STORE_KEY.LOGGED_IN_USER_PASSWORD, _loggedInSessionUserPassword);
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
                            if(_sessionUserCred._loggedInSessionUserPassword != null)
                            {
                                storeSessionUserPassword(_sessionUserCred._loggedInSessionUserPassword);
                            }
                            
                            resolve('Credientils stored');
                        } 
                        else 
                        {
                            reject('Credientils store Failed.');
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

                            // store user cred in local storage
                            resolve('User profile stored');
                        } 
                        else 
                        {
                            reject('User profile stored Failed.');
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

                
                //destroyUserCredentials
                function destroyUserCredentials()
                {
                    //alert("a");
                    return $q(function(resolve, reject) 
                    {
                        var _storedSessionUserCredientils = _getStoredSessionUserCredientils();
                        var psrUserEmail = _storedSessionUserCredientils._loggedInSessionUserEmail;

                        if (psrUserEmail != null) 
                        {
                            //alert("a1");
                            //remove key from local storage
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_SESSION_ID);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_EMAIL);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_PASSWORD);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_ID);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_FIRST_NAME);
                            window.localStorage.removeItem(LOCAL_STORE_KEY.LOGGED_IN_USER_LAST_NAME);
                            
                            resolve('Local storage Destroyed');
                        } 
                        else 
                        {
                            //alert("a3");
                            reject('Session Failed.');
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
                        LOG_FACTORY.printString("_webRequestData "+JSON.stringify(_webRequestData)+" _webBaseUrl "+_webBaseUrl);
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
                                    LOG_FACTORY.printString("goSignIn response = "+JSON.stringify(response));
                                    //success
                                    if(response.success)
                                    {
                                        //store user credientials
                                        $scope._sessionUserCred = 
                                        {
                                            _loggedInSessionUserEmail: _sessionUserCred.userEmail,
                                            _loggedInSessionUserPassword : _sessionUserCred._userPassword
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

                //goForceLogoutServerUser
                function goForceLogoutServerUser($scope) 
                {
                    return $q(function(resolve, reject) 
                    {
                        var _storedSessionUserCredientils = _getStoredSessionUserCredientils();
                        
                        var _sessionDetails = 
                        {
                            userId: _storedSessionUserCredientils._loggedInSessionUserId
                        };

                        if(CONNECTION_MONITOR_FACTORY.isOnline())
                        {
                            goLogoutServerUser ($scope, _sessionDetails);
                            resolve();
                        }
                        else
                        {
                            reject();
                            APP_ALERT_FACTORY.noInternetAlert();
                        }
                    })
                    
                }

                //goLogoutServerUser
                function goLogoutServerUser($scope, _sessionDetails) 
                {

                    return $q(function(resolve, reject) 
                    {
                        var _webRequestMethod = 'POST';
                        var _webRequestData = _sessionDetails;
                        var _webBaseUrl = API_URL.HOST_URL+API_URL.USER_LOGOUT;
                        LOG_FACTORY.printString("_webRequestData "+JSON.stringify(_webRequestData)+" _webBaseUrl "+_webBaseUrl);
                        WEB_API_FACTORY
                            .fireWebRequest(_webRequestMethod, _webBaseUrl, _webRequestData)
                            .then
                            (
                                //$ionicLoading.hide();
                                function(response)
                                {
                                    LOG_FACTORY.printString("response "+JSON.stringify(response));
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
                    else
                    {
                        APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE, response.error.message);
                    }
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

                //_getStoredSessionUserCredientils
                _getStoredSessionUserCredientils = function () {
                    //alert("tes");
                    var _sessionUserCred = 
                    {
                        _loggedInSessionUserEmail: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_EMAIL),
                        _loggedInSessionUserPassword : window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_PASSWORD),
                        _loggedInSessionId: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_SESSION_ID),
                        _loggedInSessionUserId: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_ID),
                        _loggedInSessionUserFirstName: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_FIRST_NAME),
                        _loggedInSessionUserLastName: window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_USER_LAST_NAME),
                    }; 

                    LOG_FACTORY.printString("_sessionUserCred "+JSON.stringify(_sessionUserCred));
                    return _sessionUserCred;
                };

                //_getDefaultProjectId
                _getDefaultProjectId = function () {
                    return window.localStorage.getItem(LOCAL_STORE_KEY.DEFAULT_PROJECT);
                };

                //_storeDefaultProjectId
                _storeDefaultProjectId = function (_defaulProjectId) {
                    storeDefaultProjectId(_defaulProjectId);
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
                
                _service.storeSessionUserCredientils =  _storeSessionUserCredientils;
                _service.getStoredSessionUserCredientils = _getStoredSessionUserCredientils;
                _service.goSignIn = _goSignIn;
                _service.isSessionUserPresent = _isSessionUserPresent;
                _service.goLogoutServerUser = _goLogoutServerUser;

                _service.goPullDataFromNetworkService = _goPullDataFromNetworkService;
                _service.goCRUDService = _goCRUDService;
                _service.getUserProfile = _getUserProfile;

                return _service;
            }
        ]
    );

angular
    .module
    (
        'starter.factory', 
        [
            'ionic', 'starter.constants'
        ]
    )
    .factory
    (
        'CONNECTION_MONITOR_FACTORY', 
        [
            function
            (
                $rootScope, $cordovaNetwork
            )
            {
                var  factory, _isOnline, _isInternetOnline, _startWatchingNetworkStatus;
                factory = {};
                _isOnline = null;
                _isInternetOnline = true;
                _startWatchingNetworkStatus = null;

                //_signIn
                _isOnline = function() 
                {
                    return _isInternetOnline;
                };
                
                //_startWatchingNetworkStatus
                _startWatchingNetworkStatus = function()
                {
                    if(ionic.Platform.isWebView())
                    {
                        $rootScope
                            .$on
                            (
                                '$cordovaNetwork:online', 
                                function(event, networkState)
                                {
                                    
                                    _isInternetOnline = true;
                                }
                            );
                        $rootScope
                            .$on
                            (
                                '$cordovaNetwork:offline', 
                                function(event, networkState)
                                {
                                    _isInternetOnline = false;
                                }
                            );
                    }
                    else
                    {
                        window
                            .addEventListener
                            (
                                "online", 
                                function(e) 
                                {
                                    _isInternetOnline = true;
                                }, 
                                false
                            );  
                        window
                            .addEventListener
                            (
                                "offline", 
                                function(e) 
                                {
                                    _isInternetOnline = false;
                                }, 
                                false
                            );  
                    }
                    
                };

                //factory
                factory.isOnline = _isOnline;
                factory.startWatchingNetworkStatus = _startWatchingNetworkStatus;

                return factory;
            }
        ]
    )
    .factory
    (
        'WEB_API_FACTORY', 
        [
            '$rootScope', '$http', '$q', '$cordovaNetwork', 'LOCAL_STORE_KEY',
            function
            (
                $rootScope, $http, $q, $timeoutm, LOCAL_STORE_KEY
            )
            {
                var  factory, _fireWebRequest;
                factory = {};
                deferred = null;
                _fireWebRequest = null;

                //_signIn
                _fireWebRequest = function(method, url, data) 
                {
                    var  deferred = $q.defer();
                    
                    //get token
                    var _loggedInSessionId = window.localStorage.getItem(LOCAL_STORE_KEY.LOGGED_IN_SESSION_ID);
                    var _authHeader = null;
                    if(_loggedInSessionId != null)
                    {
                        _authHeader = { 'Auth': _loggedInSessionId};
                    }
                    else
                    {
                        _authHeader = { 'Auth': "NONE"};

                    }

                    console.log("_authHeader "+JSON.stringify(_authHeader));
                    console.log("data "+JSON.stringify(data));
                    console.log("url "+JSON.stringify(url));

                    $http({
                          method    : method,
                          url       : url,
                          data      : data,
                          timeout   : 100000,
                          headers   : _authHeader,
                        })

                        .success
                        (
                            
                            function(data) 
                            {
                                deferred.resolve (data);  
                                console.log(data);
                            }
                        )
                        .error
                        (
                            function(err) 
                            {
                                console.log(err);
                                deferred.reject(err);
                            }
                        );
                    return deferred.promise;
                };

                //factory
                factory.fireWebRequest = _fireWebRequest;
                return factory;
            }
        ]
    )
    .factory
    (
        'DATE_TIME_FACTORY', 
        [
            '$rootScope', '$q',
            function
            (
                $rootScope, $q
            )
            {
                var  factory, _secondToHHMMSS;
                factory = {};
                deferred = null;
                _secondToHHMMSS = null;

                //_secondToHHMMSS
                _secondToHHMMSS = function(_second) 
                {
                    var hours   = Math.floor(_second / 3600);
                    var minutes = Math.floor((_second - (hours * 3600)) / 60);
                    var seconds = _second - (hours * 3600) - (minutes * 60);
                
                    if (hours   < 10) {hours   = "0"+hours;}
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    return hours+':'+minutes+':'+seconds;
                };

                //factory
                factory.secondToHHMMSS = _secondToHHMMSS;
                return factory;
            }
        ]
    )
    .factory
    (
        'APP_ALERT_FACTORY', 
        [
            '$ionicPopup', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON',
            function
            (
                $ionicPopup, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON
            )
            {
                var  factory, _noInternetAlert, _somethingWentWrongAlert, _genericAlert, _somethingWentWrongOnSessionAlert;
                factory = {};
                _noInternetAlert = null;
                _somethingWentWrongAlert = null;
                _genericAlert = null;

                //_noInternetAlert
                _noInternetAlert = function() 
                {

                    $ionicPopup
                        .alert
                        (
                            {
                                title: ALERT_TITLE.ALERT_TITLE_NO_INTERNET,
                                template: ALERT_TEXT.ALERT_TEXT_NO_INTERNET,
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
                };

                //_somethingWentWrongAlert
                _somethingWentWrongAlert = function()
                {
                    $ionicPopup
                        .alert
                        (
                            {
                                title: ALERT_TITLE.ALERT_TITLE_OOPS,
                                template: ALERT_TEXT.ALERT_TEXT_WENT_WRONG,
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
                };

                //__somethingWentWrongOnSessionAlert
                _somethingWentWrongOnSessionAlert = function()
                {
                    $ionicPopup
                        .alert
                        (
                            {
                                title: ALERT_TITLE.ALERT_TITLE_OOPS,
                                template: ALERT_TEXT.ALERT_TEXT_SESSION_WRONG,
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
                };

                //_genericAlert
                _genericAlert = function(_messageTitle, _messageBody)
                {
                    $ionicPopup
                        .alert
                        (
                            {
                                title: _messageTitle,
                                template: _messageBody,
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
                
                //\deferred = null;

                //factory
                factory.noInternetAlert = _noInternetAlert;
                factory.somethingWentWrongAlert = _somethingWentWrongAlert;
                factory.genericAlert = _genericAlert;
                factory.somethingWentWrongOnSessionAlert = _somethingWentWrongOnSessionAlert;
                
                return factory;
            }
        ]
    );
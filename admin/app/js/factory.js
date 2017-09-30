
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
        'FILE_DOWNLOAD', 
        [
            function
            (
                $rootScope
            )
            {
                return {
                    downloadExcelFormat: function(_filename, _element)
                    {
                        var blob = new Blob([document.getElementById(_element).innerHTML], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        saveAs(blob, _filename+".xls");
                    }
                }
                
            }
        ]
    )
    .factory
    (
        'SHARE_DATA_FACTORY', 
        [
            function
            (
                $rootScope
            )
            {
                return {
                    store: function (key, value) {
                        window.localStorage.setItem(key, value);
                    },
                    get: function (key) {
                        return window.localStorage.getItem(key);
                    }
                };
            }
        ]
    )
    .factory
    (
        'LOG_FACTORY', //
        [
            function
            (
                $rootScope
            )
            {
                var  factory, _printString;
                factory = {};
                deferred = null;
                _fireWebRequest = null;

                //_printString
                _printString = function(data) 
                {
                    console.log(data);
                };

                //factory
                factory.printString = _printString;
                return factory;
            }
        ]
    )
    .factory
    (
        'CONNECTION_MONITOR_FACTORY', 
        [
            'LOG_FACTORY',
            function
            (
                $rootScope, $cordovaNetwork, LOG_FACTORY
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
                                    LOG_FACTORY.printString("Internet Status "+_isInternetOnline);
                                }
                            );
                        $rootScope
                            .$on
                            (
                                '$cordovaNetwork:offline', 
                                function(event, networkState)
                                {
                                    _isInternetOnline = false;
                                    LOG_FACTORY.printString("Internet Status "+_isInternetOnline);
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
                                    LOG_FACTORY.printString("Internet Status "+_isInternetOnline);
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
                                    LOG_FACTORY.printString("Internet Status "+_isInternetOnline);
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
            '$rootScope', '$http', '$q', '$cordovaNetwork', 'LOCAL_STORE_KEY', 'LOG_FACTORY',
            function
            (
                $rootScope, $http, $q, $timeoutm, LOCAL_STORE_KEY, LOG_FACTORY
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
                        _authHeader = { 'Auth': _loggedInSessionId, 'Content-Type': undefined};
                    }
                    else
                    {
                        _authHeader = { 'Auth': "NONE", 'Content-Type': undefined};

                    }

                    LOG_FACTORY.printString("_authHeader "+JSON.stringify(_authHeader));
                    LOG_FACTORY.printString("data "+JSON.stringify(data));
                    LOG_FACTORY.printString("url "+JSON.stringify(url));
                    

                    $http({
                          method    : method,
                          url       : url,
                          data      : data,
                          timeout   : 200000,
                          headers   : _authHeader,
                          //transformRequest: angular.identity
                        })

                        .success
                        (
                            
                            function(data) 
                            {
                                LOG_FACTORY.printString("response data "+JSON.stringify(data));
                                deferred.resolve (data);  
                            }
                        )
                        .error
                        (
                            function(err) 
                            {
                                LOG_FACTORY.printString("response err "+err);
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
        'DATE_FACTORY', 
        [
            '$rootScope', '$q', 'LOG_FACTORY',
            function
            (
                $rootScope, $q, LOG_FACTORY
            )
            {
                var  factory, 
                _getCurrentMonth = null, 
                _getCurrentMonthName = null,
                _getdifferenceBetweenDates  = null, 
                _getDates  = null, 
                _getToday = null, 
                _projectedDateFormToday = null, 
                _convertDateToFormatInYYYYMMDD = null, 
                _getCurrentYear = null,
                _getWeekDayForDate = null,
                _getMonthsInYear = null,
                _daysInWeek = null,
                _getMonthName = null;
                _secondToHHMMSS = null;
               
                factory = {};
                deferred = null;
                
                _secondToHHMMSS = function(_second) 
                {
                    var hours   = Math.floor(_second / 3600);
                    var minutes = Math.floor((_second - (hours * 3600)) / 60);
                    var seconds = _second - (hours * 3600) - (minutes * 60);
                
                    if (hours   < 10) {hours   = "0"+hours;}
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    return hours+':'+minutes+':'+seconds;
                }

                _getCurrentYear = function()
                {
                    return new Date().getFullYear();
                }

                //_getCurrentMonth
                _getCurrentMonth = function()
                {
                    var _date = new Date();
                    return  ("0" + (_date.getMonth() + 1).toString()).substr(-2);
                };

                _getCurrentMonthName = function()
                {
                    var _months = _getMonthsInYear();
                    var _date = new Date();
                    return  _months[_date.getMonth()];
                };

                _getMonthName = function(_index)
                {
                    var _months = _getMonthsInYear();
                    return  _months[_index];
                };

                //getdifferenceBetweenDates
                _getdifferenceBetweenDates = function(date1, date2)
                {
                    // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
                    date1 = date1.split('-');
                    date2 = date2.split('-');

                    // Now we convert the array to a Date object, which has several helpful methods
                    date1 = new Date(date1[0], date1[1], date1[2]);
                    date2 = new Date(date2[0], date2[1], date2[2]);

                    // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
                    date1_unixtime = parseInt(date1.getTime() / 1000);
                    date2_unixtime = parseInt(date2.getTime() / 1000);

                    // This is the calculated difference in seconds
                    var timeDifference = date2_unixtime - date1_unixtime;

                    // in Hours
                    var timeDifferenceInHours = timeDifference / 60 / 60;

                    // and finaly, in days :)
                    var timeDifferenceInDays = timeDifferenceInHours  / 24;

                    return timeDifferenceInDays;
                };

                //_getDates
                _getDates = function (start, end) {
                    start = new Date(start),
                    end = new Date(end);
                    var datesArray = [];
                    var startDate = new Date(start);
                    while (startDate <= end) {
                        datesArray.push(new Date(startDate));
                        startDate.setDate(startDate.getDate() + 1);
                    }
                    return datesArray;
                };

                _getToday = function()
                {
                    var date = new Date();
                    var numberOfDaysToAdd = 6;
                    date.setDate(date.getDate() + numberOfDaysToAdd); 
                    var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
                    return datestring;
                }

                _projectedDateFormToday = function(numberOfDaysToAdd)
                {
                    var date = new Date();
                    date.setDate(date.getDate() + numberOfDaysToAdd); 
                    var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
                    return datestring;
                }

                _convertDateToFormatInYYYYMMDD = function(_date)
                {
                    var d = new Date(_date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    return [year, month, day].join('-');
                }

                _getWeekDayForDate = function (_date) 
                {
                    var d = new Date(_date);
                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";

                    var n = weekday[d.getDay()];
                    return n;
                }

                //_getMonthsInYear
                _getMonthsInYear = function () 
                {
                    var _monthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    return _monthsInYear;
                }

                //_daysInWeek
                _daysInWeek = function()
                {
                    var _daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    return _daysInWeek;
                }
                

                //factory
                factory.getCurrentMonth = _getCurrentMonth;
                factory.getCurrentMonthName = _getCurrentMonthName;
                factory.getdifferenceBetweenDates = _getdifferenceBetweenDates;
                factory.getDates = _getDates;
                factory.getToday = _getToday;
                factory.convertDateToFormatInYYYYMMDD = _convertDateToFormatInYYYYMMDD;
                factory.getCurrentYear = _getCurrentYear;
                factory.projectedDateFormToday = _projectedDateFormToday;
                factory.getWeekDayForDate = _getWeekDayForDate;
                factory.getMonthsInYear = _getMonthsInYear;
                factory.daysInWeek = _daysInWeek;
                factory.getMonthName = _getMonthName;
                factory.secondToHHMMSS = _secondToHHMMSS;
                return factory;
            }
        ]
    )
    .factory
    (
        'APP_ALERT_FACTORY', 
        [
            '$ionicPopup', 'ALERT_TITLE', 'ALERT_TEXT', 'ALERT_BUTTON', 'LOG_FACTORY',
            function
            (
                $ionicPopup, ALERT_TITLE, ALERT_TEXT, ALERT_BUTTON, LOG_FACTORY
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
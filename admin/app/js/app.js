// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular
    .module
    (
        'starter', 
        ['ionic', 'starter.controllers', 'ngMessages', 'ngCordova', 'starter.factory', 'chart.js', 'ngCanvasGauge', 'ui.sortable']
    )

    .run
    (
        function
        (
            $ionicPlatform, $rootScope, $state, $timeout, CONNECTION_MONITOR_FACTORY, SERVICE, APP_ALERT_FACTORY, ALERT_TITLE, ALERT_TEXT
        ) 
        {

            //ionicPlatform ready
            $ionicPlatform
                .ready
                (
                    function() 
                    {
                        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                        // for form inputs)
                        if (window.cordova && window.cordova.plugins.Keyboard) {
                            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                            cordova.plugins.Keyboard.disableScroll(true);

                        }
                        if (window.StatusBar) {
                            // org.apache.cordova.statusbar required
                            StatusBar.styleDefault();
                        }

                        //startWatchingNetworkStatus
                        CONNECTION_MONITOR_FACTORY.startWatchingNetworkStatus();
                    }
                    
                );

            $rootScope.openAccess = false;

            //stateChangeStart
            $rootScope
                .$on
                (
                    "$stateChangeStart", 
                    function
                    (
                        event, toState, toParams, fromState, fromParams
                    ) 
                    {
                        //alert("URL : " + toState.url);
                        $rootScope.openAccess = toState.openPermission;

                        if ($rootScope.openAccess) 
                        {
                            //alert("You can navigate without login");
                        }
                        else
                        {
                            var _isSessionUserPresent = SERVICE.isSessionUserPresent();
                            
                            if(_isSessionUserPresent)
                            {
                                //$state.go('app.dashboard', {}, {reload: true});
                            }
                            else
                            {
                                APP_ALERT_FACTORY.genericAlert(ALERT_TITLE.ALERT_TITLE_SIGNED_IN, ALERT_TEXT.ALERT_TEXT_RESTRICTED_ACCESS);
                                event.preventDefault();
                                $state.go("sign-in");
                            }
                        }
                    }
                );

            //stateChangeSuccess
            $rootScope
                .$on
                (
                    "$stateChangeSuccess", 
                    function
                    (
                        event, toState, toParams, fromState, fromParams
                    ) 
                    {
                        
                        //alert("URL : " + toState.url);
                    }
                );

            $rootScope
                .$on
                (
                    "scope.stored", 
                    function
                    (
                        event, data
                    ) 
                    {
                        
                        console.log("scope.stored", data);
                    }
                );
        }
    )

    .config
    (
        function
        (
            $stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider
        ) 
        {
            $ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');
            $httpProvider.defaults.timeout = 1;

            $stateProvider

                //sign-in
                .state
                (
                    'front', 
                    {
                        url: '/front',
                        templateUrl: 'templates/front.html',
                        controller: 'FrontCtrl',
                        openPermission : true
                    }
                )

                //sign-in
                .state
                (
                    'sign-in', 
                    {
                        url: '/sign-in',
                        templateUrl: 'templates/sign-in.html',
                        controller: 'SignInCtrl',
                        openPermission : true
                    }
                )

                //signUp
                .state
                (
                    'sign-up', 
                    {
                        url: '/sign-up',
                        templateUrl: 'templates/sign-up.html',
                        controller: 'SignUpCtrl',
                        openPermission : true
                    }
                )

                //rsecurity-check-in
                .state
                (
                    'security-check-in', 
                    {
                        url: '/security-check-in',
                        templateUrl: 'templates/security-check-in.html',
                        controller: 'SecurityCheckInCtrl',
                        openPermission : true
                    }
                )

                //update-password
                .state
                (
                    'update-password', 
                    {
                        url: '/update-password',
                        templateUrl: 'templates/update-password.html',
                        controller: 'UpdatePasswordCtrl',
                        openPermission : true
                    }
                )

                //app
                .state
                (
                    'app', 
                    {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl',
                        openPermission : false
                    }
                )

                //app.profile
                .state
                (
                    'app.profile', 
                    {
                        url: '/profile',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/profile.html',
                                controller: 'ProfileCtrl'
                            }
                        },
                        openPermission : false
                    }
                )

                

                //app.system-events-landing
                .state
                (
                    'app.system-events-landing', 
                    {
                        url: '/system-events-landing',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/system-events-landing.html',
                                controller: 'SystemEventsLandingCtrl'
                            }
                        },
                        openPermission : false,
                        adminPage : true
                    }
                )

                //app.event-photos
                .state
                (
                    'app.event-photos', 
                    {
                        url: 'event/:eventId/photos',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/event-photos.html',
                                controller: 'EventPhotosCtrl'
                            }
                        },
                        openPermission : false,
                        adminPage : true
                    }
                )

                //app.tracking-hours
                .state
                (
                    'app.tracking-hours', 
                    {
                        url: 'tracking/hours',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/tracking-hours.html',
                                controller: 'TrackingHoursCtrl'
                            }
                        },
                        openPermission : false,
                        adminPage : true
                    }
                )

                //app.registeded-users
                .state
                (
                    'app.registeded-users', 
                    {
                        url: 'registeded/users',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/registeded-users.html',
                                controller: 'RegistededUsersCtrl'
                            }
                        },
                        openPermission : false,
                        adminPage : true
                    }
                )
                
                //app.about
                .state
                (
                    'app.about', 
                    {
                        url: '/about',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/about.html',
                                controller: 'AboutCtrl'
                            }
                        },
                        openPermission : false
                    }
                )

                //app.volunteers-speak
                .state
                (
                    'app.volunteers-speak', 
                    {
                        url: '/volunteers-speak',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/volunteers-speak.html',
                                controller: 'VolunteersSpeakCtrl'
                            }
                        },
                        openPermission : false
                    }
                )

                //app.corporate-details
                .state
                (
                    'app.corporate-details', 
                    {
                        url: '/corporate-details',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/corporate-details.html',
                                controller: 'CorporateDetailsCtrl'
                            }
                        },
                        openPermission : false
                    }
                )
                
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider
                .otherwise
                (
                    '/front'//'/front'
                );
        }
    );
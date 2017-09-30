// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
    .module
    (
        'starter', 
        ['ionic', 'starter.controllers', 'ngMessages', 'ngCordova', 'starter.factory']
    )

    .run
    (
        ['$ionicPlatform', '$rootScope', '$state', '$timeout', 'CONNECTION_MONITOR_FACTORY', 'SERVICE', 'APP_ALERT_FACTORY', 'ALERT_TITLE', 'ALERT_TEXT', '$cordovaPushV5', function
        (
            $ionicPlatform, $rootScope, $state, $timeout, CONNECTION_MONITOR_FACTORY, SERVICE, APP_ALERT_FACTORY, ALERT_TITLE, ALERT_TEXT, $cordovaPushV5
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

            
        }]
    )

    .config
    (
        ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider', '$cordovaAppRateProvider', function
        (
            $stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $cordovaAppRateProvider
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

                //user-account-activation
                .state
                (
                    'user-account-activation', 
                    {
                        url: '/user-account-activation',
                        templateUrl: 'templates/user-account-activation.html',
                        controller: 'UserAccountActivationCtrl',
                        openPermission : true
                    }
                )

                //reset-password-code
                .state
                (
                    'reset-password-code', 
                    {
                        url: '/reset-password-code',
                        templateUrl: 'templates/reset-password-code.html',
                        controller: 'ResetPasswordCodeCtrl',
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

                //app.volunteer-speak
                .state
                (
                    'app.volunteer-speak', 
                    {
                        url: '/volunteer-speak',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/volunteer-speak.html',
                                controller: 'VolunteerSpeakCtrl'
                            }
                        },
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

                //app.profile
                .state
                (
                    'app.edit-profile', 
                    {
                        url: '/edit-profile',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/edit-profile.html',
                                controller: 'EditProfileCtrl'
                            }
                        },
                        openPermission : false
                    }
                )

                //my-events-landing
                .state
                (
                    'app.my-events-landing', 
                    {
                        url: '/my-events-landing',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/my-events-landing.html',
                                controller: 'MyEventsLandingCtrl'
                            }
                        },
                        openPermission : false
                    }
                )

                //events-details
                .state
                (
                    'app.event-details', 
                    {
                        url: '/event/:eventId/details',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/event-details.html',
                                controller: 'EventDetailsCtrl'
                            }
                        },
                        openPermission : false
                    }
                )

                //system-events-landing
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
                        openPermission : false
                    }
                )

                //app.my-achievements
                .state
                (
                    'app.my-achievements', 
                    {
                        url: '/my-achievements',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/my-achievements.html',
                                controller: 'MyAchievementsCtrl'
                            }
                        },
                        openPermission : false
                    }
                )

                //app.capture-corporate-details
                .state
                (
                    'app.capture-corporate-details', 
                    {
                        url: '/capture-corporate-details',
                        views: {
                            'menuContent': 
                            {
                                templateUrl: 'templates/capture-corporate-details.html',
                                controller: 'CaptureCorporateDetailsCtrl'
                            }
                        },
                        openPermission : false
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

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider
                .otherwise
                (
                    '/front'
                );
        }]
    );
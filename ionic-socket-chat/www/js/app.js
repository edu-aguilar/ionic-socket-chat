// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('controllers', []);

angular.module('ionicSocketChat', ['ionic', 'controllers', 'btford.socket-io'])
       .run(runApp)
       .config(ionicConfig);


function runApp($ionicPlatform) {
    $ionicPlatform.ready(onPlatformReady);

    function onPlatformReady() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
    }
}

function ionicConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'MenuController as vm'
        })
        .state('app.login', {
            url: "/login",
            views: {
                'viewContent': {
                    templateUrl: "templates/login.html",
                    controller: 'LoginController as vm'
                }
            }
        })
        .state('app.chat', {
            url: "/chat/:userName",
            views: {
                'viewContent': {
                    templateUrl: "templates/chat.html",
                    controller: 'ChatController as vm'
                }
            }
        });
    $urlRouterProvider.otherwise('/app/login');
}

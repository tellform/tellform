# angular-raven [![Build Status](https://travis-ci.org/gdi2290/angular-raven.png?branch=master)](https://travis-ci.org/gdi2290/angular-raven)
A Raven.js / Sentry wrapper for Angular.js

#How do I add this to my project?

You can download angular-raven by:

* (prefered) Using bower and running `bower install angular-raven --save`
* Using npm and running `npm install angular-raven --save`
* Downloading it manually by clicking [here to download development unminified version](https://raw.github.com/gdi2290/angular-raven/master/angular-raven.js)


````html
<body ng-app="YOUR_APP" ng-controller="MainCtrl">
  <a href="#error" ng-click="logError()">Log Error</a>
</body>
<script src="http://cdnjs.cloudflare.com/ajax/libs/raven.js/1.0.8/raven.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.js"></script>
<script>
  Raven.config('YOUR_PUBLIC_DSN', {
      // Raven settings
    })
    .setUser({
      "id": "SERVER_RENDERED_ID",
      "email": "SERVER_RENDERED_EMAIL"
    })
    .install()
</script>
<script src="app/bower_components/angular-raven/angular-raven.js"></script>

<script>
  angular.module('YOUR_APP', [
    'ngRaven',
    'controllers'
  ])
  .config(function($ravenProvider) {
    // There is a development flag to log errors rather than sending it to Sentry
    $ravenProvider.development(true);
  });

  angular.module('controllers', [])
    .controller('MainCtrl', function($scope, $raven) {
      $scope.logError = function() {
        $raven.captureMessage('Error');
      };
    });
</script>

````

Initializing Raven.js outside of Angular allows Raven to track errors when Angular wasn't able to bootstrap correctly.


The community has compiled a list of common ignore rules for common things, like Facebook, Chrome extensions, etc.
```javascript
Raven.config('YOUR_PUBLIC_DSN', {
  logger: 'javascript',
  ignoreErrors: [
    // Random plugins/extensions
    'top.GLOBALS',
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error. html
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    'Can\'t find variable: ZiteReader',
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    'conduitPage'
  ],
  ignoreUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
  ]
}).install();

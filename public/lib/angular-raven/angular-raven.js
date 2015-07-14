(function(global, angular, undefined) {
  'use strict';

  var _development = null;

  function $RavenProvider() {

    this.development = function(config) {
      _development = config || _development;
      return this;
    };

    this.$get = ['$window', '$log', function($window, $log) {
      var service = {
        VERSION: ($window.Raven) ? $window.Raven.VERSION : 'development',
        TraceKit: ($window.Raven) ? $window.Raven.TraceKit : 'development',
        captureException: function captureException(exception, cause) {
          if (!_development) {
            $window.Raven.captureException(exception, cause);
          } else {
            $log.error('Raven: Exception ', exception, cause);
          }
        },
        captureMessage: function captureMessage(message, data) {
          if (!_development) {
            $window.Raven.captureMessage(message, data);
          } else {
            $log.error('Raven: Message ', message, data);
          }
        },
        setUser: function setUser(user) {
          if (_development) {
            $log.info('Raven: User ', user);
          } else {
            if ($window.Raven.setUser) {
              $window.Raven.setUser(user);
            } else if ($window.Raven.setUserContext) {
              $window.Raven.setUserContext(user);
            }
          }
        },
        setUserContext: function setUserContext(user) {
          if (_development) {
            $log.info('Raven: User ', user);
          } else {
            if ($window.Raven.setUserContext) {
              $window.Raven.setUserContext(user);
            } else if ($window.Raven.setUser) {
              $window.Raven.setUser(user);
            }
          }
        },
        lastException: function lastException() {
          if (_development) {
            $log.error('Raven: Last Exception');
          } else {
            $window.Raven.lastException();
          }
        },
        context: function context(options, func, args) {
          var RavenService = this;

          if (angular.isFunction(options)) {
            args = func || [];
            func = options;
            options = undefined;
          }

          return RavenService.wrap(options, func).apply(RavenService, args);
        },
        wrap: function wrap(options, func) {
          var RavenService = this;

          if (angular.isUndefined(func) && !angular.isFunction(options)) {
            return options;
          }

          if (angular.isFunction(options)) {
            func = options;
            options = undefined;
          }

          if (!angular.isFunction(func)) {
            return func;
          }

          if (func.__raven__) {
            return func;
          }

          function wrapped() {
            var args = [], i = arguments.length;
            while(i--) args[i] = RavenService.wrap(options, arguments[i]);
            try {
              return func.apply(this, args);
            } catch(e) {
              RavenService.captureException(e, options);
            }
          }

          for (var property in func) {
            if (func.hasOwnProperty(property)) {
              wrapped[property] = func[property];
            }
          }
          wrapped.__raven__ = true;
          return wrapped;
        }

      };

      return service;
    }]; // end $get
  } // end provider

  function $ExceptionHandlerDecorator($delegate, Raven) {
    function $ExceptionHandler(exception, cause) {
      if (exception instanceof Error) {
        Raven.captureException(exception, cause);
      } else {
        Raven.captureMessage(exception, {
          exception: exception,
          cause: cause
        });
      }
      $delegate(exception, cause);
    }
    return $ExceptionHandler;
  }


  angular.module('ngRaven', [])
  .provider('$raven', $RavenProvider)
  .provider('Raven',  $RavenProvider)
  .config(['$provide', function($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', '$raven', $ExceptionHandlerDecorator]);
  }]);


  angular.module('angular-raven', ['ngRaven']);

}(this, angular));

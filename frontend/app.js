// app.js

var app = angular.module('myApp', ['ngRoute']);

// Sayfalama için özel filtre
app.filter('startFrom', function() {
  return function(input, start) {
    if (!input || !input.length) { return; }
    start = +start; // string'i int'e çevir
    return input.slice(start);
  };
});

// Routing ayarları
app.config(function($routeProvider, $httpProvider) {
  // Interceptor ekle
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController',
      // Bu rotaya erişmek için giriş yapılmış olmalı
      resolve: {
        auth: function(authService, $location) {
          if (!authService.isLoggedIn()) {
            $location.path('/login');
          }
        }
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
});

// Auth Interceptor (Dairesel Bağımlılığı Kırmak İçin $injector Kullanıldı)
app.factory('AuthInterceptor', function($q, $injector) {
  return {
    request: function(config) {
      var authService = $injector.get('authService');
      var token = authService.getToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        var authService = $injector.get('authService');
        authService.logOut();
        window.location = '#!/login';
      }
      return $q.reject(response);
    }
  };
});

// Uygulama çalıştırma
app.run(function($rootScope, $location, authService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next.$$route && next.$$route.resolve && next.$$route.resolve.auth) {
      if (!authService.isLoggedIn()) {
        $location.path('/login');
      }
    }
  });
});

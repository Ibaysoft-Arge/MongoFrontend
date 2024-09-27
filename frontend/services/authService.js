// services/authService.js

app.factory('authService', function($http, $window) {
    var auth = {};
  
    // Kullanıcı token'ını kaydetme
    auth.saveToken = function(token) {
      $window.localStorage['token'] = token;
    };
  
    // Kullanıcı token'ını alma
    auth.getToken = function() {
      return $window.localStorage['token'];
    };
  
    // Kullanıcının giriş yapıp yapmadığını kontrol etme
    auth.isLoggedIn = function() {
      var token = auth.getToken();
  
      if (token) {
        // Token'ın süresinin dolup dolmadığını kontrol edin
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };
  
    // Kullanıcı giriş yapma (API isteği)
    auth.login = function(user) {
      return $http.post('http://localhost:5000/api/auth/login', user);
    };
  
    // Kullanıcı kayıt olma (API isteği)
    auth.register = function(user) {
      return $http.post('http://localhost:5000/api/users', user);
    };
  
    // Kullanıcı token'ını saklama
    auth.logIn = function(token) {
      auth.saveToken(token);
    };
  
    // Kullanıcı çıkış yapma
    auth.logOut = function() {
      $window.localStorage.removeItem('token');
    };
  
    // Kullanıcı bilgilerini alma (sunucudan)
    auth.getUserFromServer = function() {
      return $http.get('http://localhost:5000/api/auth/user', {
        headers: {
          'Authorization': auth.getToken()
        }
      });
    };
  
    return auth;
  });
  
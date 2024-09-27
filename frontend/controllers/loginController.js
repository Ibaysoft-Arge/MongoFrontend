// controllers/loginController.js

app.controller('loginController', function($scope, $location, authService) {
  $scope.user = {};
  $scope.errorMessage = '';

  $scope.login = function() {
    authService.login($scope.user).then(function(response) {
      // Giriş başarılı, token'ı sakla ve dashboard'a yönlendir
      authService.logIn(response.data.token);
      $location.path('/dashboard');
    }).catch(function(error) {
      console.error('Giriş yaparken hata:', error);
      $scope.errorMessage = 'Geçersiz email veya parola.';
    });
  };
});

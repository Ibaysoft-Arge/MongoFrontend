// services/customerService.js

app.factory('customerService', function($http) {
  var service = {};

  // Müşterileri getirme
  service.getCustomers = function() {
    return $http.get('http://localhost:5000/api/customers');
  };

  service.populateCustomers = function() {
    return $http.post('http://localhost:5000/api/customers/populate');
  };
  // Müşteri ekleme
  service.addCustomer = function(customer) {
    return $http.post('http://localhost:5000/api/customers', customer);
  };

  // Müşteri güncelleme
  service.updateCustomer = function(id, customer) {
    return $http.put('http://localhost:5000/api/customers/' + id, customer);
  };

  // Müşteri silme
  service.deleteCustomer = function(id) {
    return $http.delete('http://localhost:5000/api/customers/' + id);
  };

  return service;
});

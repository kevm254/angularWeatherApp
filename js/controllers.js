////////////////////////////////////////////////////////////////
// CONTROLLERS
////////////////////////////////////////////////////////////////
myApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.day = cityService.day;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
    
    $scope.$watch('day', function() {
        cityService.day = $scope.day;
    })
    
}]);

myApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;
    $scope.day = cityService.day || $routeParams.days || 2;
    $scope.days = $routeParams.days;
    
    
    // MAKE API CALLS
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ appid: '2de143494c0b295cca9337e1e96b00e0', q: $scope.city, cnt: $scope.day  });
    
    
    // UTILITY FUNCTIONS
    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    
    $scope.convertToDate = function(dt) {
        
        return new Date(dt * 1000);
    }
    
    console.log($scope.weatherResult);
}]);

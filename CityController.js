/// <reference path="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.js" />
/// <reference path="~/Scripts/NG/NGTools.js" />
(function () {

    angular.module('myApp').controller('CityCtrl', ['$scope', '$rest', function ($scope, $rest) {

        $rest.RegisterService({ name: "GetCities", url: "CityService.svc/GetCities" });
        $rest.RegisterService({ name: "GetTowns", url: "CityService.svc/GetTowns" });
        $rest.RegisterService({ name: "GetDistricts", url: "CityService.svc/GetDistricts" });

        $scope.Cities = [];
        $scope.Towns = [];
        $scope.Districts = [];

        $scope.selCity = {};
        $scope.selTown = {};
        $scope.selDistrict = {};

        $scope.init = function () {
            //$scope.GetListUser();
            //$scope.onTaskSelect();
            $scope.GetCityList();

        };

        
            
           /* $scope.$watch('country', function (newVal) {
                if (newVal) $scope.cities = ['Los Angeles', 'San Francisco'];
            });
            $scope.$watch('city', function (newVal) {
                if (newVal) $scope.suburbs = ['SOMA', 'Richmond', 'Sunset'];
            });*/
        
        $scope.GetCityList = function() {
            var onSuccess = function (response, status) {
                //$scope.LiftList = eval(response.Data);
                $scope.Cities = (response.Data);
                
            };
            var data = { item: null };;
            var request = $rest.GetService("GetCities", data);
            NGTools.CallNgServiceWithRequest(request, onSuccess, "GetCities");
        }

        $scope.GetTowns = function (o) {
            var onSuccess = function (response, status) {
                //$scope.LiftList = eval(response.Data);
                $scope.Towns = (response.Data);
                
            };
            var cId = $scope.selCity;
            var data = { item: JSON.stringify(o) };
            var request = $rest.GetService("GetTowns", data);
            NGTools.CallNgServiceWithRequest(request, onSuccess, "GetTowns");
        }

        $scope.GetDistricts = function () {
            var onSuccess = function (response, status) {
                //$scope.LiftList = eval(response.Data);
                $scope.Districts = (response.Data);
                
            };
            var data = { item: JSON.stringify($scope.selTown) };
            var request = $rest.GetService("GetDistricts", data);
            NGTools.CallNgServiceWithRequest(request, onSuccess, "GetDistricts");
        }



    }]);

})();



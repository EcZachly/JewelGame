"use strict"; 
var app = angular.module('Game', ["GameController", "ngRoute"])

 app.config(["$routeProvider", "$locationProvider",
   function($routeProvider, $locationProvider) {
      $routeProvider.when('/game', {
            templateUrl: "/app/game/template.html",
            controller: "GameController"
        });
      
       $locationProvider.html5Mode(true)
}]);
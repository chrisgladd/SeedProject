'use strict';


// Declare app level module which depends on filters, and services
angular.module('SeedDraw', ['SeedDraw.filters', 'SeedDraw.services', 'SeedDraw.directives']).
  config(function($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);
	
    $routeProvider.when('/', {templateUrl: 'partials/splash.html', controller: SplashCtrl});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl});
	$routeProvider.when('/menu', {templateUrl: 'partials/menu.html', controller: MenuCtrl});
	$routeProvider.when('/draw', {templateUrl: 'partials/draw.html', controller: DrawCtrl});
	$routeProvider.when('/branch', {templateUrl: 'partials/branch.html', controller: BranchCtrl});
	$routeProvider.when('/replay', {templateUrl: 'partials/replay.html', controller: ReplayCtrl});
	$routeProvider.when('/history', {templateUrl: 'partials/history.html', controller: HistCtrl});
	$routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: SetCtrl});
    $routeProvider.otherwise({redirectTo: '/login'});
  });

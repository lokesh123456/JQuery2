var myApp1=angular.module('myApp');
myApp1.controller('addController',function($scope,$http,dataService)
{
	
$scope.savePlayer=function(){
	dataService.savePlayer($scope.newPlayer).then(function(response) {

		$scope.newPlayer=response.data;
 	//alert("Successfully posted");
 	$scope.player.push($scope.newPlayer);
 	
 	$scope.newPlayer={};
	});
}
});





var myApp=angular.module('myApp',[]);

myApp.controller('myController',function($http,$scope,dataService) {

	
	$scope.player=[];
	var page=0;
	    var end=10;
	    $scope.prev=false;
    $scope.next=false;
    //load all the student details
    $scope.btnclk = function() {
        if (page == 0) {
            $scope.prev=false;
        }
        //$scope.prev=true;
        $scope.next=true;
        $http.get('http://localhost:8080/player?_page=' + page + '&_limit=' + end)
            .then(function success(response) {
                $scope.player = response.data;
            }, function error(response) {
                alert("No details found");
            });
    };
    $scope.nextval = function() {
        if (page > 0) {
            $scope.prev=true;
        }
        page = page + 1;
        $http.get('http://localhost:8080/player?_page=' + page + '&_limit=' + end)
            .then(function success(response) {
                $scope.player = response.data;
            }, function error(response) {
                alert("No details found");
            });
    };
    $scope.previous = function() {
        page = page - 1;
        if (page <= 0) {
            $scope.prev=false;
        }
        $http.get('http://localhost:8080/player?_page=' + page + '&_limit=' + end)
            .then(function success(response) {
                $scope.player = response.data;
            }, function error(response) {
                alert("No details found");
            });
    };
//for editing a player
$scope.editPlayer={};
$scope.editUser=function(play)
{
  dataService.editUser(play).then(function(response) {
  	$scope.editPlayer=play;
  });
}
//for updating a player
$scope.updatePlayer=function(id,editPlayer){
	dataService.updatePlayer(id,editPlayer).then(function(response){
		$scope.play=response.data;
	})
}


//search for a player
$scope.searchPlayer=function(value){
	dataService.searchPlayer(value).then(function(response) {
	
	  if(value==undefined)
	 {
		//console.log("hi");
		alert("no recound found");
	 }
	else{
      $scope.player=response.data;
          if(response.data=='')
		      {
		      	alert("no recound");
		      }
          $scope.value="";
        } 
	});
}

//deleting a player
$scope.deleteUser=function(id){
	dataService.deleteUser(id).then(function(response) {
		var index=-1;
	         	var playArr=eval($scope.player);
	         	//console.log(playArr);
	         	//console.log('lokesh');
	         	for(var i=0;i<playArr.length;i++)
	         	{
	         		if(playArr[i].id===id){
	         			index=i;
	         			break;
	         		}
	         	}
	         	if(index===-1)
	         	{
	         		alert("something went wrong");
	         	}
	         	$scope.player.splice(index,1);

		alert("player"+id+"deleted");
	});
}



});





//custom directives	
myApp.directive('tableDescription',function() {
		return {
			restrict:'E',
			templateUrl:'table-description.html'

		};

	});

myApp.directive('addPlayer',function() {
		return {
			restrict:'E',
			templateUrl:'add-player.html'

		};

	});

myApp.directive('editPlayer',function() {
		return {
			restrict:'E',
			templateUrl:'edit-player.html'

		};

	});
myApp.directive('searchPlayer',function() {
		return {
			restrict:'E',
			templateUrl:'search-player.html'

		};

	});
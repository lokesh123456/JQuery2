myApp.factory('dataService',['$http',function($http) {
	var obj={};
	obj.deleteUser=function(id) {
		return $http.delete('http://localhost:8080/player/'+id);
	}
	obj.savePlayer=function(newPlayer){
		return $http.post("http://localhost:8080/player",newPlayer);
	}
	obj.searchPlayer=function(value){
		return $http.get('http://localhost:8080/player?id='+value);
	}
	obj.editUser=function(play){
		return $http.get("http://localhost:8080/player",play);
	}
    obj.updatePlayer=function(id,editPlayer){
    	return $http.put("http://localhost:8080/player/"+id,editPlayer);
    }
   

	return obj;
}]);
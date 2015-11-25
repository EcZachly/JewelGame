var cardSingleController = angular.module("GameController", []);

cardSingleController.controller("GameController", ["$scope", "$http", "$routeParams", 
    function($scope, $http, $routeParams){

    	var options = ["X", "O", "V", "T"]
    	$scope.arr = []
    	$scope.clicked = false
    	$scope.init = function(x, y){
    		for(var i = 0; i < x; i++){
    			var row = []
    			for(var j = 0; j < y; j++){
    				var obj = {}
    				obj.row = i
    				obj.col = j
    				obj.class = "Unclicked"
    				obj.value = options[Math.ceil(3*Math.random()) - 1]
    				row.push(obj)
    			}
    			$scope.arr.push(row)
    		}
    		console.log($scope.arr)
    	}

    	$scope.switch = function(col, s){
    		console.log(col)

    		if($scope.first == undefined){
    			$scope.first = col
    			$scope.first.class = "Clicked"
    		}
    		else{
    			console.log($scope.first)
    			console.log(col)
  
    			var obj = {}
    			obj["value"] = $scope.first.value
    			obj["row"] = $scope.first.row
    			obj["col"] = $scope.first.col
    	
    			col.class = "Unclicked"
    			obj.class = "Unclicked"
    			var clCol = {}
    			clCol["value"] = col.value
    			clCol["row"] = col.row
    			clCol["col"] = col.col
    		
    			$scope.arr[obj.row][obj.col].value = clCol.value
    			$scope.arr[col.row][col.col].value = obj.value
    	
    			$scope.first = undefined
   				$scope.clear(1)
   				$scope.checkFor4(clCol.row)
   				$scope.checkFor4(obj.row)
    		

    		}
    
    
    	}

    	$scope.clear = function(a){
    		for(var i = 0; i < $scope.arr.length; i++){
    			for(var j = 0; j < $scope.arr[i].length; j++){
    				$scope.arr[i][j].class = "Unclicked"
    			}
    		}
    	}
    	$scope.checkFor4 = function(row){
    		var prev = $scope.arr[row][j]
    		var curr = ""
    		var count = 0
    		var arr = []
    		
    		for(var j = 0; j < $scope.arr[row].length - 1; j++){
    			curr = $scope.arr[row][j+1]
				prev = $scope.arr[row][j]
				
    			if(prev.value === curr.value){
    				arr.push(curr)
    				if(count == 0){
    					arr.push(prev)
    				}
    				count++
    			}
    			else{
    				arr = []

    				arr.push(curr)
    				count = 1
    			}
    			
    				if(arr.length == 4){
    					console.log(arr)
    				arr.forEach(function(v){
    					console.log(v)
    					// $scope.arr[parseInt(v.row)][parseInt(v.col)].class = "linedUp"
    					var c = v.row
    					console.log(c)
    					while(c >= 0){
    					if(c > 0)
    					$scope.arr[parseInt(c)][parseInt(v.col)].value = $scope.arr[parseInt(c) - 1][parseInt(v.col)].value
    					// $scope.arr[v.row - c + 1][v.col].class = "linedUp"
    					if(c == 0){
    						$scope.arr[parseInt(c)][parseInt(v.col)].value =  options[Math.ceil(3*Math.random()) - 1]
    					}
    					c--	
    					}

    				})
    			}
    			
    		}
    	}
    	$scope.init(10,10)



}]);
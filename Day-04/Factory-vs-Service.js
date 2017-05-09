spinner
	- up()
	- down()

//Factory
function getSpinner(){
	var counter = 0;

	function up(){
		return ++counter;
	}

	function down(){
		return --counter;
	}

	return {
		up : up,
		down : down
	};
}


//Factory
function getSpinner(){
	var counter = 0;

	return {
		up : function (){
			return ++counter;
		},
		down : function (){
			return --counter;
		}
	}

}
var spinner = getSpinner();


//Service
function Spinner(){
	var counter = 0;

	function up(){
		return ++counter;
	}

	function down(){
		return --counter;
	}

	this.up = up;
	this.down = down
	//[this] is returned by default
}
var spinner = new Spinner()
















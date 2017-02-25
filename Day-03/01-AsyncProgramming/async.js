var pgm = (function(){
	function addSync(x,y){
		console.log('		[Service] processing ', x , ' and ', y);
		var result = x + y;
		console.log('		[Service] returning result');
		return result;
	}


	function addSyncClient(x,y){
		console.log('[Consumer] triggering addSync');
		var result = addSync(x,y);
		console.log('[Consumer] result = ', result);
	}

	function addAsync(x,y, onResult){
		console.log('		[Service] processing ', x , ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('		[Service] returning result');
			if (typeof onResult === 'function')
				onResult(result);
		}, 3000);
	}


	function addAsyncClient(x,y){
		console.log('[Consumer] triggering addAsync');
		addAsync(x,y, function(result){
			console.log('[Consumer] result = ', result);	
		});
		
	}

	var addAsyncEvents = (function(){
		var listeners = [];
		function subscribe(subscriptionFn){
			listeners.push(subscriptionFn);
		}
		function add(x,y){
			console.log('		[Service] processing ', x , ' and ', y);
			setTimeout(function(){
				var result = x + y;
				console.log('		[Service] returning result');
				listeners.forEach(function(listenerFn){
					if (typeof listenerFn === 'function')
						listenerFn(result);
				})
			}, 3000);
		}
		return {
			subscribe : subscribe,
			add : add
		}
	})();



	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents
	}
})();














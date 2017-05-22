var localDB = new PouchDB('cafe')
var remoteDB = new PouchDB('http://138.68.178.97:5984/cafe');
localDB.info().then(function (info) {
	console.log(info);
});

localDB.sync(remoteDB, {
	live: true,
	retry: true
}).on('change', function (change) {
	console.log("yo, something changed!");
}).on('paused', function (info) {
	console.log("replication was paused, usually because of a lost connection");
}).on('active', function (info) {
	console.log("replication was resumed");
}).on('error', function (err) {
	console.log("totally unhandled error (shouldn't happen)");
});

function writeToDB(entry){
	localDB.put(entry);
}

function populateInventoryPage(finalArr){
	localDB.allDocs({
  		include_docs: true,
  		startkey: 'inventory-cafe',
    	endkey: 'inventory-cafe\uffff'
	}).then(function (result) {
		inven = result['rows'];
		inven.forEach(function(inv){
			console.log(inv.doc);
			finalArr.push(inv.doc);
		});

	}).catch(function (err) {
		console.log(err);
	});
}
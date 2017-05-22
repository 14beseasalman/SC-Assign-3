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
	console.log("WOOT");
	console.log(localDB.put(entry));
}

function setEmployees(cafe1,cafe2,cafe3){
	
	localDB.allDocs({
  		include_docs: true,
  		startkey: 'emp-cafe-1',
    	endkey: 'emp-cafe-1\uffff'
	}).then(function (result) {
		ppl = result['rows'];
		ppl.forEach(function(emp){
			cafe1.push(emp.doc);
		});
		document.getElementById('firstTab').click(); // Works!

	}).catch(function (err) {
		console.log(err);
	});

	localDB.allDocs({
  		include_docs: true,
  		startkey: 'emp-cafe-2',
    	endkey: 'emp-cafe-2\uffff'
	}).then(function (result) {
		ppl = result['rows'];
		ppl.forEach(function(emp){
			cafe2.push(emp.doc);
		});
	}).catch(function (err) {
		console.log(err);
	});
	localDB.allDocs({
  		include_docs: true,
  		startkey: 'emp-cafe-3',
    	endkey: 'emp-cafe-3\uffff'
	}).then(function (result) {
		ppl = result['rows'];
		ppl.forEach(function(emp){
			cafe3.push(emp.doc);
		});
	}).catch(function (err) {
		console.log(err);
	});
	
}
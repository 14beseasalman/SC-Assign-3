String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

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



function populateSales(){
	localDB.allDocs({
		include_docs: true,
		startkey: 'order-cafe-',
		endkey: 'order-cafe-\uffff'
	}).then(function (result) {
		sales = result['rows'];
		
		shop1_total = 0;
		shop2_total = 0;
		shop3_total = 0;
		sales.forEach(function(sale){
			if(sale.doc._id.contains("order-cafe-1")){
				shop1_total += parseInt(sale.doc.amount);
			}

			else if(sale.doc._id.contains("order-cafe-2")){
				shop2_total += parseInt(sale.doc.amount);
			}

			else if(sale.doc._id.contains("order-cafe-3")){
				shop3_total += parseInt(sale.doc.amount);
			}
			
		});

		var ctx = $("#chart");
		console.log(ctx);
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ["Shop 1", "Shop 2", "Shop 3"],
				datasets: [{
					label: "Revenue",
					data: [shop1_total, shop2_total, shop3_total]
				}]
			}
		});

		$("#total").text($("#total").text()+(shop1_total+shop2_total+shop3_total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

	}).catch(function (err) {
		console.log(err);
	});
}
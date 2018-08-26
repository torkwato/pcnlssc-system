
var _$_e7da=["AIzaSyDDzkNABTruZtEznHKShzc9iXPJonQmgoU","voting-fcca7.firebaseapp.com","https://voting-fcca7.firebaseio.com","voting-fcca7","voting-fcca7.appspot.com","369369085108","initializeApp"];var config={apiKey:_$_e7da[0],authDomain:_$_e7da[1],databaseURL:_$_e7da[2],projectId:_$_e7da[3],storageBucket:_$_e7da[4],messagingSenderId:_$_e7da[5]};firebase[_$_e7da[6]](config)


var x = 0;
var y = 0;
var z = 0;
var votable = $('#voters-table').DataTable({
			    aoColumnDefs: [
			      { bVisible: false, aTargets: [0] }
			    ],
			    'paging': true
  			});

///display registered voters
$(document).ready( function () {

			 	var snapkey;
    		var userRef = firebase.database().ref().child("voters/");
    		userRef.orderByChild("statvote").equalTo("notvoted").on("child_added", function (snapshot) {
        var childData = snapshot.val();
        snapkey = snapshot.key;
        if (childData.statvote==="notvoted") {
        	x=x+1;
					z = x+y;
        	$span = $('#txt').find('span')
					$('#txt').text(x);
					$('#txt').append($span);
					$span1 = $('#txt0').find('span')
					$('#txt0').text(z);
					$('#txt0').append($span1);
			}

    });
		userRef.orderByChild("statvote").equalTo("voted").on("child_added", function (snapshot) {
		var childData = snapshot.val();
		if (childData.statvote==="voted") {
			y=y+1;
			z = x+y;
			$span = $('#txt1').find('span')
			$('#txt1').text(y);
			$('#txt1').append($span);
			console.log(z)
			$span1 = $('#txt0').find('span')
			$('#txt0').text(z);
			$('#txt0').append($span1);

	}

});

		//
		// 	var refDisplay = firebase.database().ref().child("count");
   	// 	refDisplay.on("child_added", function (snapshot) {
    //     var childKey = snapshot.key;
    //     var childData = snapshot.val();
    //     console.log(childKey)
    //     console.log(childData)
    //     if (!snapshot.exists()) {
    //     	$("#totalvoters").append('<h2><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> 0</h2><h4>Total Voters</h4>');
    //     }else{
    //     	$("#totalvoters").append('<h2><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> ' +childData.tvotes+'</h2><h4>Total Voters</h4>');
    //     }
    // });
   		// var refV = firebase.database().ref().child("count");
			//     refV.on("value", function (snapshot) {
			//     		childKey = snapshot.key;
			//     		childData =  snapshot.val();
			//       	console.log(snapshot.val())
			//         if (!snapshot.val()) {
			//         	$("#totalvoters").append('<h2><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> 0</h2><h4>Total Voters</h4>');
			//         }
			//     });




	var ref = firebase.database().ref().child("voters");

	ref.on("child_added", function (snapshot) {
	var childKey = snapshot.key;
	var childData = snapshot.val();
	var dataSet = [childKey,childData.fname, childData.lname, childData.course, childData.statvote];


	votable.rows.add([dataSet]).draw();
});

$('#voters-table tbody').on('click', 'tr', function () {
        var dataCan = votable.row( this ).data();
        $.confirm({
					    title: 'Action!',
					    content: 'Edit or Remove '
					    +dataCan[1]+" "+dataCan[2],
					    buttons: {
					        Remove: function () {
					        	$.confirm({
											    title: 'Confirm!',
											    content: 'Continue?',
											    buttons: {
											        confirm: function () {

											            toastr.success('Deleted successfully!', dataCan[1]+" "+dataCan[2])
											            var ref = firebase.database().ref().child("voters/"+dataCan[0]);
																	var ref1 = firebase.database().ref().child("students/"+dataCan[0]);

																			ref.once('value', function(snapshot) {
																		  snapshot.forEach(function(childSnapshot) {
																		     snapshot.ref.remove();
																		     	refreshTableCan();
																					// displayVotersOverview(dataCan[4]);
																		  });
																		});

																			ref1.on("value", function (snapshot) {
																				snappy = snapshot.val();
																				var x = "notused"
																				var postData = {
																						course: snappy.course,
																						id: snappy.id,
																						fname: snappy.fname,
																						lname: snappy.lname,
																						password: snappy.password,
																						status: x
																				}
																				snapshot.ref.update(postData);
																			});
																	},
											        cancel: function () {
											            toastr.warning('Cancelled')
											        }
											    }
											});



					        },
					        cancel: function () {
					        }
					    }
					});
    })






});



function refreshTableCan(){

	votable.clear();
	var ref = firebase.database().ref().child("voters");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var dataSet = [childKey,childData.fname,childData.lname,childData.course,childData.statvote];

	  votable.rows.add([dataSet]).draw();

  });
});

//
//
// var refV = firebase.database().ref().child("count");
// 			    refV.on("child_added", function (snapshot) {
// 			    		childKey = snapshot.key;
// 			    		childData =  snapshot.val();
// 			      	console.log(snapshot.val())
// 			        if (!snapshot.val()) {
// 			        	$("#totalvoters").append('<h2><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> 0</h2><h4>Total Voters</h4>');
// 			        }
// 			        if (!snapshot.val()) {
// 				        	newVotercount1()
// 				        }else{
//
// 				        	addCount(childKey, childData.tvotes)
//
// 				        }
// 			    });

}


//
// function newVotercount1(){
// 	alert('ok')
// }
// function addCount(params,params1){
// 	var catcher=0;
// 	var a =parseInt(params1);
// 	catcher =a-1;
//
// 	var postCount={
// 		tvotes:catcher
// 	}
// console.log(catcher)
// console.log(params1)
//
//     var updates = {};
//     updates['/count/' + params] = postCount;
//     return firebase.database().ref().update(updates);
// }


// function displayVotersOverview(params){
// 	if (params==="voted") {
// 		y=y-1;
// 		z=z-1;
// 		$span = $('#txt1').find('span')
// 		$('#txt1').text(y);
// 		$('#txt1').append($span);
// 		$span1 = $('#txt0').find('span')
// 		$('#txt0').text(z);
// 		$('#txt0').append($span1);
// 	}else {
// 		z=z-1;
// 		x=x-1;
// 		$span1 = $('#txt0').find('span')
// 		$('#txt').text(x);
// 		$('#txt').append($span1);
// 		$span1 = $('#txt0').find('span')
// 		$('#txt0').text(z);
// 		$('#txt0').append($span1);
// 	}
//
//
// }

// window.onload = checkOnline;
var _$_e7da=["AIzaSyDDzkNABTruZtEznHKShzc9iXPJonQmgoU","voting-fcca7.firebaseapp.com","https://voting-fcca7.firebaseio.com","voting-fcca7","voting-fcca7.appspot.com","369369085108","initializeApp"];var config={apiKey:_$_e7da[0],authDomain:_$_e7da[1],databaseURL:_$_e7da[2],projectId:_$_e7da[3],storageBucket:_$_e7da[4],messagingSenderId:_$_e7da[5]};firebase[_$_e7da[6]](config)

 var db = firebase.firestore();
$( "#tftime" ).datepicker();
var submitConfig = false;
var globalparameter;
var votable = $('#voters-table').DataTable({
			    aoColumnDefs: [
			      { bVisible: false, aTargets: [0] }
			    ],
  			});
var coursetable = $('#course-table').DataTable({
			    aoColumnDefs: [
			      { bVisible: false, aTargets: [0] }
			    ]
  			});
var table = $('#user-table').DataTable({
			    aoColumnDefs: [
			      { bVisible: false, aTargets: [0] }
			    ]
  			});
var postable = $('#position-table').DataTable({
			    aoColumnDefs: [
			      { bVisible: false, aTargets: [0] }
			    ]
  			});
var cantable = $('#candidates-table').DataTable({
			    aoColumnDefs: [
			      { bVisible: false, aTargets: [0] }
			    ]
  			});

var partytable = $('#partylist-table').DataTable( {
  aoColumnDefs: [
    { bVisible: false, aTargets: [0] }
  ]
});

$('#btn-login').on('click', function (e) {
	e.preventDefault();
	$.preloader.start({
              modal:true,
              position:'center',
                src : 'img/sprites1.png',
              });
              setTimeout(function(){
                  $.preloader.stop();
              }, 5000);


});


function getUser(catcher){
	var name = catcher.data().name;
	var username = $('#username').val();
	var password = $('#password').val();
	if (catcher.data().username === username && catcher.data().password === password) {
		$.confirm({
      theme: 'supervan',
	    title: 'Success!',
	    content: 'Authentication Success',
	    type: 'green',
	    typeAnimated: true,
	    buttons: {
	        tryAgain: {
	            text: 'Ok',
	            btnClass: 'btn-green',
	            action: function(){
	             			var userRef = db.collection("state").doc("recent");
							return userRef.set({
		    						onlineState: true,
		    						name: name
							})
							.then(function() {
		    				console.log("Document successfully updated!");
		    				var delay = 2000;
		    				setTimeout(function(){ window.location = "index.html"; }, delay);
							})
							.catch(function(error) {
		    				// The document probably doesn't exist.
		    				console.error("Error updating document: ", error);
							});
		            }
	        },

	    }
		});
	} else {
		$.confirm({
      theme: 'supervan',
	    title: 'Error!',
	    content: 'Authentication Failed',
	    type: 'red',
	    typeAnimated: true,
	    buttons: {
	        tryAgain: {
	            text: 'Try again :)',
	            btnClass: 'btn-red',
	            action: function(){
	            	var userRef = db.collection("state").doc("recent");
					return userRef.set({
    						onlineState: false,
    						name: "Guest"
					})
					.then(function() {
    				console.log("Document successfully updated!");
					})
					.catch(function(error) {
    				// The document probably doesn't exist.
    				console.error("Error updating document: ", error);
					});
	            }
	        },

	    }
		});
	}
}

///////////--------DATATABLES AUTO UPDATE(child_added only)
$(document).ready( function () {

				// var refV = firebase.database().ref().child("count");
			  //   refV.on("value", function (snapshot) {
			  //   		childKey = snapshot.key;
			  //   		childData =  snapshot.val();
			  //     	console.log(snapshot.val())
			  //       if (!snapshot.val()) {
			  //       	newVotercount()
			  //       }
			  //   });



				var refVote = firebase.database().ref().child("voters");
	    	var ref = firebase.database().ref().child("students");
	    	var refCourse = firebase.database().ref().child("course");
	    	var refPartylist = firebase.database().ref().child("partylist");
	    	var refPosition = firebase.database().ref().child("position");
	    	var refCandidates = firebase.database().ref().child("candidates");

    		ref.on("child_added", function (snapshot) {
        var childKey = snapshot.key;
    		var childData = snapshot.val();
    		var dataSet = [childKey,childData.id, childData.fname, childData.lname, childData.course, childData.status];
	    	table.rows.add([dataSet]).draw();
   	 	});

    		refCourse.on("child_added", function (snapshot) {
        var childKey = snapshot.key;
    		var childData = snapshot.val();
    		var dataSet = [childKey,childData.course];
	    	coursetable.rows.add([dataSet]).draw();
	    	$("#course").append($('<option/>').attr("value", childData.course).text(childData.course));
   	 	});

    		refPartylist.on("child_added", function (snapshot) {
        var childKey = snapshot.key;
    		var childData = snapshot.val();
    		var dataSet = [childKey,childData.partylist,childData.description];
	    	partytable.rows.add([dataSet]).draw();
	    	$("#par").append($('<option/>').attr("value", childData.partylist).text(childData.partylist));
	    	$("#parist").append($('<option/>').attr("value", childData.partylist).text(childData.partylist));
   	 	});

    		refPosition.on("child_added", function (snapshot) {
        var childKey = snapshot.key;
    		var childData = snapshot.val();
    		var dataSet = [childKey,childData.position];
	    	postable.rows.add([dataSet]).draw();
	    	$("#pos").append($('<option/>').attr("value", childData.position).text(childData.position));
	    	$("#potion").append($('<option/>').attr("value", childData.position).text(childData.position));
   	 	});
    		refCandidates.on("child_added", function (snapshot) {
        toastr.remove()
        var childKey = snapshot.key;
    		var childData = snapshot.val();
    		var dataSet = [childKey,"<img style='height:30px; width:30px' src="+childData.url+">",childData.fname,childData.lname,childData.position,childData.partylist,childData.vote];
	    	cantable.rows.add([dataSet]).draw();
	    	// $("#pos").append($('<option/>').attr("value", childData.position).text(childData.position));
   	 	});



			refVote.on("child_added", function (snapshot) {
			var childKey = snapshot.key;
			var childData = snapshot.val();
			var dataSet = [childKey,childData.fname, childData.lname, childData.course, childData.statvote];
			votable.rows.add([dataSet]).draw();
			var data = votable.rows().data();

		});

});



///////////--------TABLE ROW CLICK EVENT
$(document).ready(function() {


if (submitConfig==false) {
	toastr.options={
		"positionClass": "toast-bottom-right",
		"timeOut": "0"
	}
	toastr.success('Add Mode')
}
	var v =  $('#lname').val();
	var u = $('#fname').val();
	var x = $('#id').val();
	var y = $('#add-course').val();
	var z = $('#add-partylist').val();
	var w = $('#add-position').val();
	if (v=="" || u=="") {
    	$('#upload').prop('disabled', true);
    }
	if (x=="") {
    	$('#submit').prop('disabled', true);
    }
  if (y=="") {
    	$('#btn-addCourse').prop('disabled', true);
    }
   if (z=="") {
    	$('#btn-partylist').prop('disabled', true);
   }
   if (w=="") {
    	$('#btn-position').prop('disabled', true);
   }
    var table = $('#user-table').DataTable();
    $('#user-table tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        // console.log(data[0],data[1],data[2],data[3]);
        $.confirm({
              theme: 'supervan',
					    title: 'Action!',
					    content: 'Edit or Remove data record of '
					    +data[2]+" "+ data[3],
					    buttons: {
					        Remove: function () {
					        	$.confirm({
                          theme: 'supervan',
											    title: 'Confirm!',
											    content: 'Continue?',
											    buttons: {
											        confirm: function () {
											            toastr.success('Record deleted successfully!', data[2]+" "+data[3])
											            var ref = firebase.database().ref().child("students/"+data[0]);
                                  var ref1 = firebase.database().ref().child("voters/"+data[0]);

																			ref.once('value', function(snapshot) {
																		  snapshot.forEach(function(childSnapshot) {
																		     snapshot.ref.remove();
																		     	refreshTable();
																		  });
																		});
                                      ref1.once('value', function(snapshot) {
                                      snapshot.forEach(function(childSnapshot) {
                                         snapshot.ref.remove();
                                    });
                                  });

																	},
											        cancel: function () {
											            toastr.warning('Cancelled')
											        }
											    }
											});



					        },
					        Edit: function () {
					        	submitConfig = true;
					        		$('#submit').prop('disabled', false);
											$('#id').val(data[1]);
											$('#fname').val(data[2].toLowerCase());
											$('#lname').val(data[3].toLowerCase());

											$('#status').val(data[5].toLowerCase());
											globalparameter = data;
											toastr.clear();
											toastr.options={
												"positionClass": "toast-bottom-right",
												"timeOut": "0"
											}
											toastr.warning('Edit Mode')
					        },
					        cancel: function () {
					        }
					    }
					});
    })


    $('#id').keyup('click', function () {
				var id = $('#id').val();
		    if (id=="") {
		    	$('#submit').prop('disabled', true);
		    }else{
		    	$('#submit').prop('disabled', false);
		    }
		});

    $('#add-course').keyup('click', function () {
				var c = $('#add-course').val();
		    if (c=="") {
		    	$('#btn-addCourse').prop('disabled', true);
		    }else{
		    	$('#btn-addCourse').prop('disabled', false);
		    }
		});
		$('#add-partylist').keyup('click', function () {
				var c = $('#add-partylist').val();
		    if (c=="") {
		    	$('#btn-partylist').prop('disabled', true);
		    }else{
		    	$('#btn-partylist').prop('disabled', false);
		    }
		});
    $('#add-position').keyup('click', function () {
				var c = $('#add-position').val();
		    if (c=="") {
		    	$('#btn-position').prop('disabled', true);
		    }else{
		    	$('#btn-position').prop('disabled', false);
		    }
		});

		$('#fname').keyup('click', function () {
				var c = $('#fname').val();
		    if (c=="") {
		    	$('#upload').prop('disabled', true);
		    }else{
		    	$('#upload').prop('disabled', false);
		    }
		});

		$('#lname').keyup('click', function () {
				var c = $('#lname').val();
		    if (c=="") {
		    	$('#upload').prop('disabled', true);
		    }else{
		    	$('#upload').prop('disabled', false);
		    }
		});

    	$('#course-table tbody').on('click', 'tr', function () {
        var dataC = coursetable.row( this ).data();
        $.confirm({
              theme: 'supervan',
					    title: 'Action!',
					    content: 'Edit or Remove '
					    +dataC[1],
					    buttons: {
					        Remove: function () {
					        	$.confirm({
                          theme: 'supervan',
											    title: 'Confirm!',
											    content: 'Continue?',
											    buttons: {
											        confirm: function () {
											            toastr.success('Deleted successfully!', dataC[1]+" course.")
											            var ref = firebase.database().ref().child("course/"+dataC[0]);
																			ref.once('value', function(snapshot) {
																		  snapshot.forEach(function(childSnapshot) {
																		     snapshot.ref.remove();
																		     	refreshTableC();
																		  });
																		});

																	},
											        cancel: function () {
											            toastr.warning('Cancelled')
											        }
											    }
											});



					        },
					        Edit: function () {
					        		submitConfig = true;
					        		$('#btn-addCourse').prop('disabled', false);
											$('#add-course').val(dataC[1]);
											globalparameter=dataC;
											toastr.clear();
											toastr.options={
												"positionClass": "toast-bottom-right",
												"timeOut": "0"
											}
											toastr.warning('Edit Mode')

					        },
					        cancel: function () {
					        }
					    }
					});
    })



    	$('#partylist-table tbody').on('click', 'tr', function () {
        var dataP = partytable.row( this ).data();
        $.confirm({
					    title: 'Action!',
					    content: 'Edit or Remove '
					    +dataP[1],
					    buttons: {
					        Remove: function () {
					        	$.confirm({
                          theme: 'supervan',
											    title: 'Confirm!',
											    content: 'Continue?',
											    buttons: {
											        confirm: function () {
											            toastr.success('Deleted successfully!', dataP[1]+" course.")
											            var ref = firebase.database().ref().child("partylist/"+dataP[0]);
																			ref.once('value', function(snapshot) {
																		  snapshot.forEach(function(childSnapshot) {
																		     snapshot.ref.remove();
																		     	refreshTableP();
																		  });
																		});

																	},
											        cancel: function () {
											            toastr.warning('Cancelled')
											        }
											    }
											});



					        },
					        Edit: function () {
					        		submitConfig = true;
					        		$('#btn-addCourse').prop('disabled', false);
											$('#add-partylist').val(dataP[1]);
											$('#description').val(dataP[2]);
											globalparameter=dataP;
											toastr.clear();
											toastr.options={
												"positionClass": "toast-bottom-right",
												"timeOut": "0"
											}
											toastr.warning('Edit Mode')

					        },
					        cancel: function () {
					        }
					    }
					});
    })


    	$('#position-table tbody').on('click', 'tr', function () {
        var dataPos = postable.row( this ).data();
        $.confirm({
              theme: 'supervan',
					    title: 'Action!',
					    content: 'Edit or Remove '
					    +dataPos[1],
					    buttons: {
					        Remove: function () {
					        	$.confirm({
                          theme: 'supervan',
											    title: 'Confirm!',
											    content: 'Continue?',
											    buttons: {
											        confirm: function () {
											            toastr.success('Deleted successfully!', dataPos[1]+" course.")
											            var ref = firebase.database().ref().child("position/"+dataPos[0]);
																			ref.once('value', function(snapshot) {
																		  snapshot.forEach(function(childSnapshot) {
																		     snapshot.ref.remove();
																		     	refreshTablePos();
																		  });
																		});

																	},
											        cancel: function () {
											            toastr.warning('Cancelled')
											        }
											    }
											});



					        },
					        Edit: function () {
					        		submitConfig = true;
					        		$('#btn-position').prop('disabled', false);
											$('#add-position').val(dataPos[1]);
											globalparameter=dataPos;
											toastr.clear();
											toastr.options={
												"positionClass": "toast-bottom-right",
												"timeOut": "0"
											}
											toastr.warning('Edit Mode')

					        },
					        cancel: function () {
					        }
					    }
					});
    })


$('#candidates-table tbody').on('click', 'tr', function () {
        var dataCan = cantable.row( this ).data();
        $.confirm({
              theme: 'supervan',
					    title: 'Action!',
					    content: 'Edit or Remove '
					    +dataCan[1]+" "+dataCan[2],
					    buttons: {
					        Remove: function () {
					        	$.confirm({
                          theme: 'supervan',
											    title: 'Confirm!',
											    content: 'Continue?',
											    buttons: {
											        confirm: function () {
											            toastr.success('Deleted successfully!', dataCan[1]+" "+dataCan[2])
											            var ref = firebase.database().ref().child("candidates/"+dataCan[0]);
																			ref.once('value', function(snapshot) {
																		  snapshot.forEach(function(childSnapshot) {
																		     snapshot.ref.remove();
																		     	refreshTableCan();
																		  });
																		});

																	},
											        cancel: function () {
											            toastr.warning('Cancelled')
											        }
											    }
											});



					        },
					        Edit: function () {
					        		submitConfig = true;
					        		$('#upload').prop('disabled', false);
											$('#fn').val(dataCan[2]);
											$('#ln').val(dataCan[3]);
											$('#potion').val(dataCan[4]);
											$('#parist').val(dataCan[5]);
											globalparameter=dataCan;
											toastr.clear();
											toastr.options={
												"positionClass": "toast-bottom-right",
												"timeOut": "0"
											}
											toastr.warning('Edit Mode')
											$('#new').append(globalparameter[1]);
											$('#modal1').modal({
											    show: 'true'
											});
					        },
					        cancel: function () {
					        }
					    }
					});
    })








});
///////////////------END TABLE ROW EVENTS





///////////////-------------PROMPT BEFORE LEAVE
// $(document).ready( function () {
//
// var areYouReallySure = false;
// function areYouSure() {
//     if(allowPrompt){
//         if (!areYouReallySure && true) {
//             areYouReallySure = true;
//             var confMessage = "***************************************\n\n W A I T !!! \n\nBefore leaving our site, follow CodexWorld for getting regular updates on Programming and Web Development.\n\n\nCLICK THE *CANCEL* BUTTON RIGHT NOW\n\n***************************************";
//             return confMessage;
//         }
//     }else{
//         allowPrompt = true;
//     }
// }
//
// var allowPrompt = true;
// window.onbeforeunload = areYouSure;
// });
//
//

/////////------ADD STUDENT------////////
$('#submit').on('click', function () {
  var a = 0;
  var aa = 0;
	var id = $('#id').val();
	var fname = $('#fname').val().toLowerCase();
	var lname = $('#lname').val();
	var course = $('#course').val();
	var status = $('#status').val();
  var password = "hasnopassword";
	fname = fname.toLowerCase();
		lname = lname.toLowerCase();
	course = course.toLowerCase();
	status = status.toLowerCase();

	postData = {
		id: id,
		fname: fname,
		lname: lname,
		course: course,
		status: status,
    password: password
	}
var ref = firebase.database().ref().child("students");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    if (childData.id===id && submitConfig == false) {
    	toastr.warning('Oooooopppps. Id already existed!')
    	a=a+1;
    }

  });
});



	 if (a==0 && submitConfig==false) {
    	getStudentLists(postData);
    }
    if (submitConfig==true) {
    	editStudent();
    }
});
//////////-----END ADD STUDENT






/////////------ADD COURSE------////////
$('#btn-addCourse').on('click', function () {
  var a = 0;
	var course = $('#add-course').val();
	course = course.toLowerCase();
	postData = {
		course: course
	}

var ref = firebase.database().ref().child("course");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    if (childData.course===course && submitConfig===false) {
    	toastr.warning('Oooooopppps. Course already existed!')
    	a=a+1;
    }

  });
});

	 if (a==0 && submitConfig == false) {
    	getCourseLists(postData);
    }
    if (submitConfig==true) {
    	editCourse();
    }
});
///////////////------END DISPLAY COURSE


/////////------ADD PARTYLIST------////////
$('#btn-partylist').on('click', function () {
  var a = 0;
	var partylist = $('#add-partylist').val();
	var description = $('#description').val();
	partylist = partylist.toLowerCase();
	description = description.toLowerCase();
	postData = {
		partylist: partylist,
		description: description
	}

var ref = firebase.database().ref().child("partylist");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    if (childData.partylist===partylist  && submitConfig===false) {
    	toastr.warning('Oooooopppps. Party-list already added!')
    	a=a+1;
    }

  });
});

	 if (a==0 && submitConfig == false) {
    	getPartyLists(postData);
    }
    if (submitConfig==true) {
    	editPartylist();
    }
});
///////////////------END DISPLAY PARTYLIST


/////////------ADD POSITION------////////
$('#btn-position').on('click', function () {
  var a = 0;
	var position = $('#add-position').val().replace(/ /g, '');

	position = position.toLowerCase();
	postData = {
		position: position
	}

var ref = firebase.database().ref().child("position");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    if (childData.position===position  && submitConfig===false) {
    	toastr.warning('Oooooopppps. Position already added!')
    	a=a+1;
    }
  });
});

	 if (a==0 && submitConfig == false) {
    	getPosition(postData);
    }
    if (submitConfig==true) {
    	editPosition();
    }
});
///////////////------END DISPLAY POSITION

function getStudentLists(postData){
	if (submitConfig == false) {
						$.confirm({
            theme: 'supervan',
				    title: 'Confirm!',
				    content: 'Do you want to continue?',
				    buttons: {
				        confirm: function () {

				             var newPostKey = firebase.database().ref().child('students').push().key;
				             voters(postData, newPostKey);
											var updates = {};
											updates['/students/' + newPostKey] = postData;
											toastr.success('Submited Successfully!', 'Student Register')
											return firebase.database().ref().update(updates);
											$('#submit').prop('disabled', true);
											$('#id').val("");
											$('#fname').val("");
											$('#lname').val("");


				        },
				        cancel: function () {
				            toastr.error('Data unsaved.')

				        }
				    }
				});
	}

}


function voters(x,y){
	var statvote = "notvoted";
	var postData={
		fname: x.fname,
		lname: x.lname,
		course: x.course,
		statvote: statvote
	}
	if(x.status=="used"){
	var updates = {};
	updates['/voters/' + y] = postData;
	toastr.success('Voter added!')
	return firebase.database().ref().update(updates);


	}

}

function votersedit(x){
	var statvote = "notvoted";
	var postData={
		fname: x.fname,
		lname: x.lname,
		course: x.course,
    password: x.password,
		statvote: statvote
	}
	if(x.status=="used"){
	var updates = {};
	updates['/voters/' + globalparameter[0]] = postData;
	toastr.success('Voter added!')
	return firebase.database().ref().update(updates);


	}

}

	// function addVotersCount(){


	// 	var refV = firebase.database().ref().child("count");
 //    refV.on("child_added", function (snapshot) {

 //      	console.log(snapshot.va())
 //        if (!snapshot.exists()) {
 //        	newVotercount()
 //        }else{
 //        	addCount(childKey, childData.tvotes)
 //        }


 //    });

	// 	}

// function newVotercount(){
// 	var ctr =0;
// 	var postCount = {
// 		tvotes: ctr
// 	}
//
//     var newPostKey = firebase.database().ref().child('count').push().key;
//     var updates = {};
//     updates['/count/' + newPostKey] = postCount;
//     return firebase.database().ref().update(updates);
// }
// function newVotercount1(){
// 	alert('ok')
// }
// function addCount(params,params1){
// 	var catcher=0;
// 	var a =parseInt(params1);
// 	catcher =a+1;
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

function getCourseLists(postData){
	$.confirm({
    theme: 'supervan',
    title: 'Confirm!',
    content: 'Do you want to continue?',
    buttons: {
        confirm: function () {
             var newPostKey = firebase.database().ref().child('course').push().key;
							var updates = {};
							updates['/course/' + newPostKey] = postData;
							toastr.success('Added Successfully!', 'Course management')
							$('#add-course').val("");
							$('#btn-addCourse').prop('disabled', true);
							return firebase.database().ref().update(updates);

        },
        cancel: function () {
            toastr.error('Not Saved')
        }
    }
});

}


function getPartyLists(postData){
	$.confirm({
    theme: 'supervan',
    title: 'Confirm!',
    content: 'Do you want to continue?',
    buttons: {
        confirm: function () {
             var newPostKey = firebase.database().ref().child('partylist').push().key;
							var updates = {};
							updates['/partylist/' + newPostKey] = postData;
							toastr.success('Added Successfully!', 'Party-list management')
							$('#add-partylist').val("");
							$('#description').val("");
							$('#btn-partylist').prop('disabled', true);
							return firebase.database().ref().update(updates);

        },
        cancel: function () {
            toastr.error('Not Saved')
        }
    }
});

}



function getPosition(postData){
	console.log(postData)
	$.confirm({
    theme: 'supervan',
    title: 'Confirm!',
    content: 'Do you want to continue?',
    buttons: {
        confirm: function () {
             var newPostKey = firebase.database().ref().child('position').push().key;
							var updates = {};
							updates['/position/' + newPostKey] = postData;
							toastr.success('Added Successfully!', 'Position management')

							$('#add-position').val("");
							$('#btn-position').prop('disabled', true);
							return firebase.database().ref().update(updates);

        },
        cancel: function () {
            toastr.error('Not Saved')
        }
    }
});

}


function refreshTable(){
	table.clear();
	var ref = firebase.database().ref().child("students");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var dataSet = [childKey,childData.id, childData.fname, childData.lname, childData.course, childData.status];

	  table.rows.add([dataSet]).draw();

  });
});
}


function refreshTableC(){

	coursetable.clear();
	var ref = firebase.database().ref().child("course");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var dataSet = [childKey,childData.course];

	  coursetable.rows.add([dataSet]).draw();

  });
});
}

function refreshTableP(){

	partytable.clear();
	var ref = firebase.database().ref().child("partylist");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var dataSet = [childKey,childData.partylist,childData.description];

	  partytable.rows.add([dataSet]).draw();

  });
});
}


function refreshTablePos(){

	postable.clear();
	var ref = firebase.database().ref().child("position");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var dataSet = [childKey,childData.position];

	  postable.rows.add([dataSet]).draw();

  });
});
}



function refreshTableCan(){

	cantable.clear();
	var ref = firebase.database().ref().child("candidates");
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var dataSet = [childKey,"<img style='height:30px; width:30px' src="+childData.url+">",childData.fname,childData.lname,childData.position,childData.partylist,childData.vote];

	  cantable.rows.add([dataSet]).draw();

  });
});
}





function editStudent(params){


	$('#submit').prop('disabled', false);
	var c=0;
	var d=0;
	var id = $('#id').val();
	var fname = $('#fname').val();
	var lname = $('#lname').val();
	var course = $('#course').val();
	var status = $('#status').val();
	fname = fname.toLowerCase();
	lname = lname.toLowerCase();
	course = course.toLowerCase();
	status = status.toLowerCase();

								postData = {
									id: id,
									fname: fname,
									lname: lname,
									course: course,
									status: status
								}
								$.confirm({
                  theme: 'supervan',
							    title: 'Confirm!',
							    content: 'Do you want to continue?',
							    buttons: {
							        confirm: function () {

													var refEdit = firebase.database().ref().child("students");
													refEdit.once('value', function(snapshot) {
												  snapshot.forEach(function(childSnapshot) {
												    var childKey = childSnapshot.key;
												    var childData = childSnapshot.val();
												    if (childData.id===id ) {
												    	// toastr.warning('ID in used!')
												    	c=c+1;
                              passward=childData.password;

												    }

												  });
												});
                        var ref1 = firebase.database().ref().child("students/"+globalparameter[0]);
                            ref1.on("value", function (snapshot) {
                              snappy = snapshot.val();
                              var postData1 = {
                                  course: snappy.course,
                                  id: id,
                                  fname: fname,
                                  lname: lname,
                                  password: passward,
                                  status: status
                              }
                              snapshot.ref.update(postData1);
                              votersedit(postData1);
                            });
													if (globalparameter[1]==id && c<=1) {
														toastr.success('Updated Successfully!', 'Student update.')
														poota(postData);
                            console.log(passward)

														$('#submit').prop('disabled', true);
															$('#id').val("");
															$('#fname').val("");
															$('#lname').val("");


															submitConfig = false;
																refreshTable2();
													}else{
														toastr.warning('ID in used!')
													}




							        },
							        cancel: function () {
							        		toastr.options.progressBar = true;
										    	toastr.info('Cancelling update...')


							        }
							    }
							});

}


function editCourse(params){


	$('#btn-addCourse').prop('disabled', false);
	var c=0;

	var a = $('#add-course').val();
	a = lowercase(a);
								postData = {
									course: a
								}
								$.confirm({
                  theme: 'supervan',
							    title: 'Confirm!',
							    content: 'Do you want to continue?',
							    buttons: {
							        confirm: function () {

													var refEdit = firebase.database().ref().child("course");
													refEdit.once('value', function(snapshot) {
												  snapshot.forEach(function(childSnapshot) {
												    var childKey = childSnapshot.key;
												    var childData = childSnapshot.val();
												    if (childData.course===a ) {
												    	c=c+1;
												    	console.log(c)
												    }

												  });
												});

													if (globalparameter[1]!=a && c==0) {
														toastr.success('Updated Successfully!', 'Course update.')
														poota1(postData);
														$('#btn-addCourse').prop('disabled', true);

															$('#add-course').val("");

															submitConfig = false;
																refreshTable3();
													}else{
														toastr.warning('Either data remained unmodified or course already added!')
														console.log(globalparameter[1],submitConfig,c,a)
													}
                          if (postData.status === used) {

                          }




							        },
							        cancel: function () {
							        		toastr.options.progressBar = true;
										    	toastr.info('Cancelling update...')
							        }
							    }
							});

}



function editPartylist(params){


	$('#btn-partylist').prop('disabled', false);
	var c=0;

	var a = $('#add-partylist').val();
	var b = $('#description').val();
	a = lowercase(a);
	b = lowercase(b);
								postData = {
									course: a,
									description: b
								}
								$.confirm({
                  theme: 'supervan',
							    title: 'Confirm!',
							    content: 'Do you want to continue?',
							    buttons: {
							        confirm: function () {

													var refEdit = firebase.database().ref().child("partylist");
													refEdit.once('value', function(snapshot) {
												  snapshot.forEach(function(childSnapshot) {
												    var childKey = childSnapshot.key;
												    var childData = childSnapshot.val();
												    if (childData.partylist===a ) {
												    	c=c+1;
												    	console.log(c)
												    }

												  });
												});

													if (globalparameter[1]!=a && c==0) {
														toastr.success('Updated Successfully!', 'Party-list update.')
														poota2(postData);
														$('#btn-partylist').prop('disabled', true);

															$('#add-partylist').val("");

															submitConfig = false;
																refreshTable4();
													}else{
														toastr.warning('Either data remained unmodified or partylist already added! Not saved!')
														console.log(globalparameter[1],submitConfig,c,a)
													}




							        },
							        cancel: function () {
							        		toastr.options.progressBar = true;
										    	toastr.info('Cancelling update...')
							        }
							    }
							});

}






function editPosition(params){


	$('#btn-position').prop('disabled', false);
	var c=0;

	var a = $('#add-position').val();
	a = lowercase(a);
								postData = {
									position: a,
								}
								$.confirm({
                  theme: 'supervan',
							    title: 'Confirm!',
							    content: 'Do you want to continue?',
							    buttons: {
							        confirm: function () {

													var refEdit = firebase.database().ref().child("position");
													refEdit.once('value', function(snapshot) {
												  snapshot.forEach(function(childSnapshot) {
												    var childKey = childSnapshot.key;
												    var childData = childSnapshot.val();
												    if (childData.position===a ) {
												    	c=c+1;
												    	console.log(c)
												    }

												  });
												});

													if (globalparameter[1]!=a && c==0) {
														toastr.success('Updated Successfully!', 'Position update.')
														poota3(postData);
														$('#btn-position').prop('disabled', true);

															$('#add-position').val("");

															submitConfig = false;
																refreshTable5();
													}else{
														toastr.warning('Either data remained unmodified or position already added! Not saved!')
														console.log(globalparameter[1],submitConfig,c,a)
													}




							        },
							        cancel: function () {
							        		toastr.options.progressBar = true;
										    	toastr.info('Cancelling update...')
							        }
							    }
							});

}


function refreshTable2(){

					(function () {
						var table1 = $('#user-table').DataTable();
					table1.clear();
					var ref2 = firebase.database().ref().child("students");
					ref2.once('value', function(snapshot) {
				  snapshot.forEach(function(childSnapshot) {
				    var childKey3 = childSnapshot.key;
				    var childData3 = childSnapshot.val();
				    var dataSet1 = [childKey3,childData3.id, childData3.fname, childData3.lname, childData3.course,childData3.status];
					  table1.rows.add([dataSet1]).draw();
  });
});
}());
}

function refreshTable3(){


					coursetable.clear();
					var ref2 = firebase.database().ref().child("course");
					ref2.once('value', function(snapshot) {
				  snapshot.forEach(function(childSnapshot) {
				    var childKey3 = childSnapshot.key;
				    var childData3 = childSnapshot.val();
				    var dataSet1 = [childKey3,childData3.course];
					  coursetable.rows.add([dataSet1]).draw();
  });
});

}


function refreshTable4(){


					partytable.clear();
					var ref2 = firebase.database().ref().child("partylist");
					ref2.once('value', function(snapshot) {
				  snapshot.forEach(function(childSnapshot) {
				    var childKey3 = childSnapshot.key;
				    var childData3 = childSnapshot.val();
				    var dataSet1 = [childKey3,childData3.partylist,childData3.description];
					  partytable.rows.add([dataSet1]).draw();
  });
});

}

function refreshTable5(){
					postable.clear();
					var ref2 = firebase.database().ref().child("position");
					ref2.once('value', function(snapshot) {
				  snapshot.forEach(function(childSnapshot) {
				    var childKey3 = childSnapshot.key;
				    var childData3 = childSnapshot.val();
				    var dataSet1 = [childKey3,childData3.position];
					  postable.rows.add([dataSet1]).draw();
  });
});

}



function poota(postData){
		var updates = {};
		updates['/students/' + globalparameter[0]] = postData;
		return firebase.database().ref().update(updates);
}
function poota1(postData){
		var updates = {};
		updates['/course/' + globalparameter[0]] = postData;
		return firebase.database().ref().update(updates);
}
function poota2(postData){
		var updates = {};
		updates['/partylist/' + globalparameter[0]] = postData;
		return firebase.database().ref().update(updates);
}
function poota3(postData){
		var updates = {};
		updates['/position/'] = postData;
		return firebase.database().ref().update(updates);
}

function lowercase(params) {
return params = params.toLowerCase();
}
function uppercase(params) {
return params = params.toUpperCase()
}
function clear(){
	$('#btn-position').prop('disabled', true);
	$('#id').val("");
	$('#fname').val("");
	$('#lname').val("");
	$('#add-partylist').val("");
	$('#description').val("");
	$('#add-course').val("");
	$('#add-position').val("");
	submitConfig = false;
	toastr.clear();
	toastr.options={
		"positionClass": "toast-bottom-right",
		"timeOut": "0"
	}
	toastr.success('Add Mode')
}
function clear1(){
	$('#upload').prop('disabled', true);
	$('#pos').val("");
	$('#fname').val("");
	$('#lname').val("");
	$('#par').val("");

}

$('#clear').on('click', function () {
clear();
});

// $('#edit').on('click', function () {





// });





var selectedFile;
var sample;
$("#upfile").on("change", function(e){
selectedFile = e.target.files[0];

})


 function up(){
 			var a=0;
 			var fname = $("#fname").val();
 			var lname = $("#lname").val();
 			var pos = $("#pos").val();
 			var par = $("#par").val();
 			var vote = 0;
 			var url;
 			var storageRef = firebase.storage().ref();


 			if(submitConfig==false)
 			{
 							var filename = selectedFile.name;
 							var imgRef = storageRef
									.child('images/'+filename)
									.put(selectedFile);
									imgRef.on('state_changed', function(snapshot){
								  // Observe state change events such as progress, pause, and resume
								  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
								  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
								  console.log('Upload is ' + progress + '% done');
								  switch (snapshot.state) {
								    case firebase.storage.TaskState.PAUSED: // or 'paused'
								      console.log('Upload is paused');
								      break;
								    case firebase.storage.TaskState.RUNNING: // or 'running'
								      console.log('Upload is running');
								      break;
								  }
								}, function(error) {
								  // Handle unsuccessful uploads
								}, function() {
								 imgRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {

										var ref = firebase.database().ref().child("candidates");
										ref.once('value', function(snapshot) {
									  snapshot.forEach(function(childSnapshot) {
									    var childKey = childSnapshot.key;
									    var childData = childSnapshot.val();

									    if (childData.partylist===par  && childData.position === pos) {
									    	toastr.warning('Oooooopppps. Party-list '+ par +' already have '+pos)
									    	a=a+1;
									    	console.log(a);
									    }
									   	if (childData.fname===fname  && childData.lname === lname) {
									    	toastr.warning('Oooooopppps! '+ fname +' '+ lname +' already registered as '+childData.position+' to '+ childData.partylist)
									    	toastr.error('Not saved!')
									    	a=a+1;
									    	console.log(a);
									    }
									  });
									});
								  	url = downloadURL;
								  	postData = {
								  		url: url,
								  		position: pos,
								  		partylist: par,
								  		fname: fname,
								  		lname: lname,
								  		vote: vote,
								  		img:filename
								  	}
								    if (a==0 && submitConfig == false) {
								    		saveCandidate(postData);


								    		// saveVoterscount();
								    }
								  });
								});
				 			}


  }




 function saveCandidate(postData){

						var newPostKey = firebase.database().ref().child('candidates').push().key;
							var updates = {};
							updates['/candidates/' + newPostKey] = postData;
						toastr.success('Registered Successfully!', 'Candidate '+ postData.fname+' '+postData.lname)
						clear1();
						return firebase.database().ref().update(updates);
  }

  //  function saveVoterscount(){
  // 					var tvotes=1;

		// 				var newPostKey = firebase.database().ref().child().push().key;
		// 					var updates = {};
		// 					updates['/candidates/' + newPostKey] = postData;
		// 				toastr.success('Registered Successfully!', 'Candidate '+ postData.fname+' '+postData.lname)
		// 				clear1();
		// 				return firebase.database().ref().update(updates);
  // }




// function editCandidate(params){
// 	var a=0;
//  			var fn = $("#fn").val();
//  			var ln = $("#ln").val();
//  			var pos = $("#potion").val();
//  			var par = $("#parist").val();
//  			fn = fn.toLowerCase();
//  			ln = ln.toLowerCase();
//  			pos = pos.toLowerCase();
//  			par = par.toLowerCase();
//  			var vote = 0;
//  			var url;
//  			var storageRef = firebase.storage().ref();


//  			if(submitConfig==true)

//  			{
//  							alert("sad")
//  							var filename = sample.name;
//  							var imgRef = storageRef
// 									.child('images/'+filename)
// 									.put(sample);
// 									imgRef.on('state_changed', function(snapshot){
// 								  // Observe state change events such as progress, pause, and resume
// 								  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
// 								  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// 								  console.log('Upload is ' + progress + '% done');
// 								  switch (snapshot.state) {
// 								    case firebase.storage.TaskState.PAUSED: // or 'paused'
// 								      console.log('Upload is paused');
// 								      break;
// 								    case firebase.storage.TaskState.RUNNING: // or 'running'
// 								      console.log('Upload is running');
// 								      break;
// 								  }
// 								}, function(error) {
// 								  // Handle unsuccessful uploads
// 								}, function() {
// 								 imgRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {

// 										var ref = firebase.database().ref().child("candidates");
// 										ref.once('value', function(snapshot) {
// 									  snapshot.forEach(function(childSnapshot) {
// 									    var childKey = childSnapshot.key;
// 									    var childData = childSnapshot.val();

// 									    if (childData.partylist===par  || childData.partylist === globalparameter[5]) {

// 									    	a=a+1;
// 									    	console.log(a);
// 									    }
// 									   	if (childData.fname===fname  && childData.lname === lname) {
// 									    	toastr.warning('Oooooopppps! '+ fname +' '+ lname +' already registered as '+childData.position+' to '+ childData.partylist)
// 									    	toastr.error('Not saved!')
// 									    	a=a+1;
// 									    	console.log(a);
// 									    }
// 									  });
// 									});
// 								  	url = downloadURL;
// 								  	postData = {
// 								  		url: url,
// 								  		position: pos,
// 								  		partylist: par,
// 								  		fname: fn,
// 								  		lname: ln,
// 								  		vote: vote,
// 								  		img:filename
// 								  	}

// 								  	if (a>=2) {
// 								  		toastr.warning('Oooooopppps. Party-list '+ par +' already have '+pos)
// 								  }
// 								    if (a==0 && submitConfig == false) {
// 								    		saveCandidate(postData);
// 								    }

// 								  });
// 								});
// 				 			}

// }


// var status =false;

// $("#xd").change(function(e) {

//   readURL(this);
//   sample = e.target.files[0];
// });

// function readURL(input) {

//   if (input.files && input.files[0]) {
//     var reader = new FileReader();

//     reader.onload = function(e) {
//       $('#blah').attr('src', e.target.result);
//       status = true;

//     }

//     reader.readAsDataURL(input.files[0]);
//      }
// }


// $('#edit').on('click', function (e) {
// 		e.preventDefault();

// 					editCandidate()
// 					alert("sad")


// });

// function editCandi(){
// 	console.log(status)
// }

// $(document).on('hidden.bs.modal', function (e) {
//     $(e.target).removeData('bs.modal');
// });



// $(document.body).on('hidden.bs.modal', function () {
//     $('#modal1').removeData('bs.modal')
// });



$('#btn-time').on('click', function(e){
  e. preventDefault();
  var x = $("#tftime").val();

  $('#time').countdown(x, function(event) {
    $(this).html(event.strftime('%w weeks %d days %H:%M:%S'));
  });
  var exp = {
    time: x
  }


   var updates = {};
   updates['/limit/'] = exp;
   return firebase.database().ref().update(updates);

})

$('#btn-pen').on('click', function(e){
  e. preventDefault();
  var y = $("#penalty").val();

  var pen = {
    pen: y
  }

   var updates = {};
   updates['/penalty/'] = pen;
   return firebase.database().ref().update(updates);

})

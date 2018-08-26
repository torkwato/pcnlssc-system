
// var _$_e7da=["AIzaSyDDzkNABTruZtEznHKShzc9iXPJonQmgoU","voting-fcca7.firebaseapp.com","https://voting-fcca7.firebaseio.com","voting-fcca7","voting-fcca7.appspot.com","369369085108","initializeApp"];var config={apiKey:_$_e7da[0],authDomain:_$_e7da[1],databaseURL:_$_e7da[2],projectId:_$_e7da[3],storageBucket:_$_e7da[4],messagingSenderId:_$_e7da[5]};firebase[_$_e7da[6]](config)


$(document).ready( function () {




	    	var refCourse1 = firebase.database().ref().child("course");
    		refCourse1.once('value', function(snapshot) {
        var childKey = snapshot.key;
    		var childData = snapshot.val();
	    	if (snapshot.exists()) {
			    	console.log("good");
			    }else{
			    	toastr.options.progressBar = true;
			    	toastr.info('Rediricting automatically...')
				    	$.alert({
						    title: 'Alert!',
						    content: 'No added course yet. Add courses to the ! '+
						    "<a href='course.html'>Course page.</a>",
					});

       var delay = 5000; 
    setTimeout(function(){ window.location = "course.html"; }, delay);
}

   	 	});

});











$('#course-table tbody').on('click', 'tr', function () {
        var dataC = table.row( this ).data();
        $.confirm({
					    title: 'Action!',
					    content: 'Edit or Remove '
					    +dataC[1],
					    buttons: {
					        Remove: function () {
					        	$.confirm({
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
					      //   	submitConfig = true;
					      //   		$('#submit').prop('disabled', false);
											// $('#id').val(data[1]);
											// $('#fname').val(data[2]);
											// $('#lname').val(data[3]);
											// $('#course').val(data[4]);
											// globalparameter = data;

					        },
					        cancel: function () {
					        }
					    }
					});
    })